<?php

// =========================================================
// FUNCIONES AUXILIARES
// =========================================================

/**
 * Cierra un pipe únicamente si sigue siendo
 * un recurso abierto válido.
 */
function closePipe($pipe): void
{
    if (is_resource($pipe)) {
        fclose($pipe);
    }
}


/**
 * Lee como máximo el número de bytes que todavía
 * tenemos disponibles.
 */
function readLimited($stream, int $remaining): string
{
    // Si hemos alcanzado el límite, no leemos más.
    if ($remaining <= 0) {
        return '';
    }

    // Leemos como máximo 8 KB cada vez,
    // sin superar el espacio disponible.
    return stream_get_contents(
        $stream,
        min(8192, $remaining)
    );
}


/**
 * Detiene el proceso.
 *
 * Primero intenta una terminación normal.
 * Si después de 100 ms continúa ejecutándose,
 * fuerza su terminación mediante SIGKILL (señal 9).
 *
 * Finalmente comprobamos que realmente
 * se haya detenido.
 */
function terminateProcess($process): void
{
    // Solicitamos la terminación normal del proceso.
    proc_terminate($process);

    // Esperamos 100 ms para darle tiempo a terminar.
    usleep(100_000);

    // Comprobamos si sigue ejecutándose.
    $status = proc_get_status($process);

    // Si continúa vivo, forzamos su terminación.
    if ($status['running']) {

        // Forzamos la terminación mediante SIGKILL.
        proc_terminate($process, 9);

        // Damos un pequeño margen al sistema operativo
        // para retirar el proceso.
        usleep(50_000);

        // Comprobamos de nuevo su estado.
        $status = proc_get_status($process);

        // Si incluso después de SIGKILL continúa activo,
        // consideramos que se ha producido una anomalía.
        if ($status['running']) {
            throw new RuntimeException(
                'No se pudo detener el proceso'
            );
        }
    }
}


// Indicamos que la respuesta de runner.php será JSON.
header('Content-Type: application/json');


// =========================================================
// 1. RECIBIR EL NOMBRE DEL FICHERO
// =========================================================

// Leemos el cuerpo completo de la petición.
$rawBody = file_get_contents('php://input');

// Intentamos convertir el JSON recibido
// en un array asociativo PHP.
try {

    $data = json_decode(
        $rawBody,
        true,
        512,
        JSON_THROW_ON_ERROR
    );

} catch (JsonException $e) {

    http_response_code(400);

    echo json_encode([
        'error' => 'JSON no válido'
    ]);

    exit;
}


// El JSON debe representar un objeto.
//
// Por ejemplo:
//
// {
//     "file": "a83f91b407e52c11.php"
// }
//
// No aceptamos arrays JSON, valores simples, null, etc.
if (!is_array($data) || array_is_list($data)) {

    http_response_code(400);

    echo json_encode([
        'error' => 'Formato JSON no válido'
    ]);

    exit;
}


// Obtenemos el nombre del fichero.
// Si no existe la propiedad "file",
// utilizamos una cadena vacía.
$fileName = $data['file'] ?? '';


// El nombre del fichero debe ser una cadena.
//
// Evitamos, por ejemplo:
//
// {
//     "file": ["algo.php"]
// }
if (!is_string($fileName)) {

    http_response_code(400);

    echo json_encode([
        'error' => 'Nombre de fichero no válido'
    ]);

    exit;
}


// =========================================================
// 2. VALIDAR EL NOMBRE DEL FICHERO
// =========================================================

// Solo aceptamos nombres formados por:
//
// 16 caracteres hexadecimales + ".php"
//
// Ejemplo:
//
// a83f91b407e52c11.php
//
// Esto impide enviar rutas manipuladas como:
//
// ../../etc/passwd
//
// También impide introducir caracteres que pudieran
// tener significado especial para una shell.
if (!preg_match('/^[a-f0-9]{16}\.php$/', $fileName)) {

    http_response_code(400);

    echo json_encode([
        'error' => 'Nombre de fichero no válido'
    ]);

    exit;
}


// =========================================================
// 3. COMPROBAR QUE EL FICHERO EXISTE
// =========================================================

// Construimos la ruta dentro del sandbox.
$file = '/sandbox/' . $fileName;

// Comprobamos que existe y que realmente es un fichero.
if (!is_file($file)) {

    http_response_code(404);

    echo json_encode([
        'error' => 'Fichero no encontrado'
    ]);

    exit;
}


// =========================================================
// 4. PREPARAR EL COMANDO PHP
// =========================================================

// Este array equivale a ejecutar:
//
// php -c /app/user-code.ini /sandbox/xxxx.php
//
// -c indica el fichero de configuración que debe utilizar
// el PHP que ejecutará el código del usuario.
//
// Utilizamos un array en lugar de construir una cadena
// con el comando completo.
$command = [
    'php',
    '-c',
    '/app/user-code.ini',
    $file
];


// =========================================================
// 5. CREAR EL PROCESO
// =========================================================

$pipes = [];


// Impedimos que el proceso que ejecuta el código
// del usuario cargue los ficheros adicionales de:
//
// /usr/local/etc/php/conf.d
//
// De esta forma utilizará únicamente la configuración
// específica definida en:
//
// /app/user-code.ini
$env = [
    'PHP_INI_SCAN_DIR' => '/app/empty-php-conf'
];


// Ejecutamos PHP creando los tres canales estándar:
//
// 0 -> stdin  (entrada)
// 1 -> stdout (salida normal)
// 2 -> stderr (errores)
$process = proc_open(

    $command,

    [
        0 => ['pipe', 'r'],
        1 => ['pipe', 'w'],
        2 => ['pipe', 'w']
    ],

    $pipes,

    // Directorio de trabajo del programa del alumno.
    '/sandbox',

    // Entorno mínimo que recibe el proceso.
    $env,

    [
        // Ejecutamos directamente el comando,
        // sin pasar por una shell.
        'bypass_shell' => true
    ]
);


// Comprobamos que el proceso se ha creado correctamente.
//
// Esta comprobación se realiza ANTES del try/finally.
//
// Así sabemos que cuando entremos en el try,
// $process representa realmente un proceso válido.
if (!is_resource($process)) {

    http_response_code(500);

    echo json_encode([
        'error' => 'No se pudo iniciar el proceso'
    ]);

    exit;
}


// =========================================================
// A PARTIR DE AQUÍ EXISTE UN PROCESO
// =========================================================
//
// Utilizamos try/finally para garantizar que,
// ocurra lo que ocurra durante la ejecución,
// los pipes se cierren y el proceso no quede
// ejecutándose accidentalmente.

try {

    // =========================================================
    // 6. PREPARAR LOS CANALES
    // =========================================================

    // El programa del usuario no necesita recibir datos
    // mediante stdin, por lo que cerramos ese canal.
    closePipe($pipes[0] ?? null);


    // Ponemos stdout y stderr en modo no bloqueante.
    //
    // De esta forma podemos ir leyendo su contenido sin
    // esperar obligatoriamente a que termine el programa.
    stream_set_blocking($pipes[1], false);
    stream_set_blocking($pipes[2], false);


    // =========================================================
    // 7. PREPARAR LOS LÍMITES DE EJECUCIÓN
    // =========================================================

    // Salida normal generada mediante echo, print, etc.
    $output = '';

    // Errores generados por PHP.
    $error = '';

    // Error generado por nuestro propio sistema de límites.
    //
    // Lo mantenemos separado de $error para distinguir
    // un error PHP de una ejecución detenida por el sandbox.
    $limitError = '';

    // Momento en el que comienza la ejecución.
    $start = microtime(true);

    // Tiempo máximo permitido: 3 segundos.
    $timeout = 3;

    // Salida máxima total: 64 KB.
    //
    // Este límite incluye conjuntamente stdout y stderr.
    $maxOutput = 64 * 1024;


    // =========================================================
    // 8. CONTROLAR LA EJECUCIÓN
    // =========================================================

    while (true) {

        // -----------------------------------------------------
        // Leer stdout
        // -----------------------------------------------------

        // Calculamos cuánto espacio queda disponible.
        $remaining = $maxOutput
            - strlen($output)
            - strlen($error);

        // Leemos stdout sin superar ese espacio.
        $output .= readLimited(
            $pipes[1],
            $remaining
        );


        // -----------------------------------------------------
        // Leer stderr
        // -----------------------------------------------------

        // Volvemos a calcular el espacio disponible porque
        // stdout puede haber aumentado.
        $remaining = $maxOutput
            - strlen($output)
            - strlen($error);

        // Leemos stderr sin superar el límite.
        $error .= readLimited(
            $pipes[2],
            $remaining
        );


        // -----------------------------------------------------
        // Comprobar límite de salida
        // -----------------------------------------------------

        if (strlen($output) + strlen($error) >= $maxOutput) {

            // Detenemos el proceso.
            terminateProcess($process);

            // Indicamos por qué lo hemos detenido.
            $limitError = 'Salida máxima permitida superada';

            break;
        }


        // -----------------------------------------------------
        // Comprobar si el programa ha terminado
        // -----------------------------------------------------

        $status = proc_get_status($process);

        if (!$status['running']) {
            break;
        }


        // -----------------------------------------------------
        // Comprobar límite de tiempo
        // -----------------------------------------------------

        if (microtime(true) - $start > $timeout) {

            // Detenemos el proceso.
            terminateProcess($process);

            // Indicamos por qué lo hemos detenido.
            $limitError = 'Tiempo máximo de ejecución superado';

            break;
        }


        // Esperamos 10 ms antes de volver a comprobar.
        //
        // Así evitamos que este propio bucle consuma
        // CPU innecesariamente.
        usleep(10_000);
    }


    // =========================================================
    // 9. RECOGER LA SALIDA PENDIENTE
    // =========================================================

    // Puede quedar información pendiente en los pipes
    // después de que el proceso haya terminado.
    //
    // Seguimos respetando el límite máximo de 64 KB.


    // Calculamos el espacio restante.
    $remaining = $maxOutput
        - strlen($output)
        - strlen($error);


    // Última lectura de stdout.
    $output .= readLimited(
        $pipes[1],
        $remaining
    );


    // Recalculamos el espacio restante.
    $remaining = $maxOutput
        - strlen($output)
        - strlen($error);


    // Última lectura de stderr.
    $error .= readLimited(
        $pipes[2],
        $remaining
    );

} finally {

    // =========================================================
    // 10. CERRAR LOS CANALES
    // =========================================================

    // Cerramos todos los pipes que pudieran
    // continuar abiertos.
    //
    // closePipe() comprueba previamente que
    // siguen siendo recursos válidos.
    closePipe($pipes[0] ?? null);
    closePipe($pipes[1] ?? null);
    closePipe($pipes[2] ?? null);


    // =========================================================
    // 11. GARANTIZAR QUE EL PROCESO HA TERMINADO
    // =========================================================

    // Si por una situación inesperada hemos llegado
    // hasta aquí mientras el programa del alumno
    // continúa ejecutándose, lo detenemos.
    $status = proc_get_status($process);

    if ($status['running']) {
        terminateProcess($process);
    }


    // =========================================================
    // 12. CERRAR EL PROCESO
    // =========================================================

    // Liberamos los recursos asociados al proceso.
    //
    // proc_close() devuelve además el código
    // de salida del proceso.
    $exitCode = proc_close($process);
}


// =========================================================
// 13. DEVOLVER EL RESULTADO
// =========================================================
    // =========================================================
    // OCULTAR INFORMACIÓN INTERNA DEL SANDBOX
    // =========================================================

    // El alumno necesita conocer el error y la línea,
    // pero no la ruta interna ni el nombre del fichero
    // temporal utilizado por el sandbox.
    //
    // Sustituimos:
    //
    // /sandbox/a83f91b407e52c11.php
    //
    // por:
    //
    // código PHP
    $output = str_replace($file, 'código PHP', $output);
    $error  = str_replace($file, 'código PHP', $error);


// Devolvemos toda la información a ejecutar.php.
echo json_encode(
    [
        'output' => $output,
        'error' => $error,
        'limitError' => $limitError,
        'exitCode' => $exitCode
    ],
    JSON_INVALID_UTF8_SUBSTITUTE
);