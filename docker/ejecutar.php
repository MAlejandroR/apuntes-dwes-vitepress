<?php
$allowedOrigins = [
    'http://localhost:5173',
    'https://php-runner.web.infenlaces.com',

];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Indicamos que todas las respuestas serán JSON.
header('Content-Type: application/json; charset=utf-8');
// =========================================================
// LIMPIEZA DE FICHEROS TEMPORALES HUÉRFANOS
// =========================================================

// Una ejecución normal elimina su fichero en el bloque finally.
// Esta limpieza elimina posibles restos producidos por una
// interrupción inesperada del contenedor web.

$tempDir = '/var/www/temp';
$maxFileAge = 60; // segundos

foreach (glob($tempDir . '/*.php') ?: [] as $tempFile) {

    $fileName = basename($tempFile);

    if (!preg_match('/^[a-f0-9]{16}\.php$/', $fileName)) {
        continue;
    }

    $mtime = filemtime($tempFile);

    if ($mtime !== false && time() - $mtime > $maxFileAge) {
        @unlink($tempFile);
    }
}
// Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Solo permitimos peticiones POST.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    header('Allow: POST');

    echo json_encode([
        'error' => 'Método HTTP no permitido'
    ]);

    exit;
}

// Solo aceptamos contenido JSON.
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (stripos($contentType, 'application/json') !== 0) {

    http_response_code(415);

    echo json_encode([
        'error' => 'Content-Type no permitido'
    ]);

    exit;
}




// =========================================================
// 1. RECIBIR EL CÓDIGO ENVIADO DESDE VUE
// =========================================================
// =========================================================
// 1. RECIBIR EL CÓDIGO ENVIADO DESDE VUE
// =========================================================

// Leemos el cuerpo completo de la petición.
$rawBody = file_get_contents('php://input');


// Limitamos el tamaño total del cuerpo de la petición.
// Permitimos algo de margen sobre los 32 KB máximos del código.
$maxRequestSize = 40 * 1024;

if (strlen($rawBody) > $maxRequestSize) {

    http_response_code(413);

    echo json_encode([
        'error' => 'Petición demasiado grande'
    ]);

    exit;
}


// Convertimos el JSON recibido en un array asociativo PHP.
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
if (!is_array($data) || array_is_list($data)) {

    http_response_code(400);

    echo json_encode([
        'error' => 'Formato JSON no válido'
    ]);

    exit;
}


// Obtenemos el código.
// Si no existe la propiedad "code", usamos una cadena vacía.
$code = $data['code'] ?? '';



// =========================================================
// 2. VALIDAR EL CÓDIGO RECIBIDO
// =========================================================

// Comprobamos que realmente hemos recibido una cadena.
if (!is_string($code)) {

    http_response_code(400);

    echo json_encode([
        'error' => 'Código no válido'
    ]);

    exit;
}


// No permitimos código vacío.
if (trim($code) === '') {

    http_response_code(400);

    echo json_encode([
        'error' => 'No se ha recibido código'
    ]);

    exit;
}


// Limitamos también el tamaño del código recibido.
//
// Por ejemplo: máximo 32 KB.
$maxCodeSize = 32 * 1024;

if (strlen($code) > $maxCodeSize) {

    http_response_code(413);

    echo json_encode([
        'error' => 'El código supera el tamaño máximo permitido'
    ]);

    exit;
}


// =========================================================
// 3. GENERAR EL FICHERO TEMPORAL
// =========================================================

// Generamos 8 bytes aleatorios.
//
// bin2hex() convierte esos 8 bytes en
// 16 caracteres hexadecimales.
$fileName = bin2hex(random_bytes(8)) . '.php';

// Ruta del fichero dentro del volumen compartido.
$file = '/var/www/temp/' . $fileName;


// =========================================================
// 4. GUARDAR EL CÓDIGO
// =========================================================

// Guardamos el código recibido en el fichero temporal.
$bytesWritten = file_put_contents(
    $file,
    $code
);

// Comprobamos que el fichero se ha podido crear.
if ($bytesWritten === false) {

    http_response_code(500);

    echo json_encode([
        'error' => 'No se pudo crear el fichero temporal'
    ]);

    exit;
}


// =========================================================
// 5. PREPARAR LA PETICIÓN AL SANDBOX
// =========================================================

// El sandbox no necesita recibir el código.
//
// Solo recibe el nombre del fichero que debe ejecutar.
$payload = json_encode([
    'file' => $fileName
]);


// Configuramos la petición HTTP interna.
$options = [
    'http' => [

        // Utilizamos POST.
        'method' => 'POST',

        // Indicamos que enviamos JSON.
        'header' => "Content-Type: application/json\r\n",

        // Cuerpo de la petición.
        'content' => $payload,

        // Evitamos esperar indefinidamente si
        // el sandbox no responde.
        'timeout' => 8,

        // Queremos poder leer también las respuestas
        // HTTP de error (400, 404, 500...).
        'ignore_errors' => true
    ]
];


// Creamos el contexto HTTP con las opciones anteriores.
$context = stream_context_create($options);


// =========================================================
// 6. LLAMAR AL SANDBOX
// =========================================================

try {

    $response = @file_get_contents(
        'http://sandbox:8080',
        false,
        $context
    );

    if ($response === false) {
        throw new RuntimeException(
            'No se pudo contactar con el sandbox'
        );
    }

    echo $response;

} catch (Throwable $e) {

    http_response_code(502);

    echo json_encode([
        'error' => 'No se pudo contactar con el sandbox'
    ]);

} finally {

    if (is_file($file)) {
        unlink($file);
    }
}