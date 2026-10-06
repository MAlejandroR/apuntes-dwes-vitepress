---
title: Empezando con PHP
---

# Empezando con PHP

<Objetivos title="Empezando con PHP">

- Entender un **programa** como un conjunto de instrucciones que trabajan con valores.
- Diferenciar **léxico**, **sintaxis** y **semántica**.
- Identificar los principales tipos de **instrucciones** de un programa.
- Entender cómo se separan las instrucciones en PHP.
- Conocer los principales **tipos de valores** con los que trabaja PHP.
- Ver nuestros primeros ejemplos de código PHP.

</Objetivos>


## Programa: conjunto de instrucciones

Vamos a empezar con una idea sencilla que nos servirá durante todo el curso:

::: definicion Programa | fa-solid fa-code

Un **programa** es un conjunto de **instrucciones** que trabajan con **valores**.

:::

Por tanto, cuando estudiemos PHP tendremos que aprender fundamentalmente dos cosas:

1. Qué **instrucciones** podemos escribir y cómo escribirlas.
2. Qué **valores** podemos utilizar y qué operaciones podemos realizar con ellos.

Por ejemplo:

<PhpRunner
filename="ejemplo.php"
description="Nuestro primer ejemplo de instrucciones y valores"
>

```php
<?php

$edad = 25;
$nombre = "Manuel";

echo "Hola $nombre";
```

</PhpRunner>

No necesitamos entender todavía todos los detalles del código.

Simplemente podemos observar que aparecen **valores**:

```text
25
"Manuel"
"Hola $nombre"
```

y aparecen **instrucciones** que hacen algo con esos valores.

Todo esto lo iremos estudiando paso a paso.


## Planteando un lenguaje de programación

Cuando aprendemos un lenguaje de programación debemos conocer las reglas que permiten escribir programas y el significado de aquello que escribimos.

Podemos distinguir inicialmente tres conceptos:

<CardPane>

<Card header="Léxico" color="#2563eb">

Las **palabras y símbolos** que forman parte del lenguaje.

PHP dispone de palabras reservadas como `if`, `else`, `while`, `function` o `class`.

</Card>

<Card header="Sintaxis" color="#16a34a">

Las **reglas de construcción** del lenguaje.

Indican cómo debemos combinar correctamente los diferentes elementos.

</Card>

<Card header="Semántica" color="#d97706">

El **significado** de las instrucciones y expresiones.

Nos indica qué hace realmente el código que hemos escrito.

</Card>

</CardPane>


## Léxico

El **léxico** está formado por los elementos que podemos utilizar para construir nuestros programas.

Entre ellos encontramos las **palabras reservadas** del lenguaje.

Por ejemplo:

```text
if
else
while
for
function
class
return
```

Estas palabras tienen un significado especial para PHP y forman parte del propio lenguaje.

::: info Documentación oficial

Puedes consultar las palabras reservadas de PHP en:

[Palabras reservadas de PHP](https://www.php.net/manual/es/reserved.keywords.php)

:::


## Sintaxis

La **sintaxis** establece las reglas que debemos seguir para construir correctamente las instrucciones de un programa.

Por ejemplo:

<PhpRunner
filename="edad.php"
description="Ejemplo de una estructura condicional"
>

```php
<?php

$edad = 16;

if ($edad >= 18) {
    echo "Eres mayor de edad";
} else {
    echo "No eres mayor de edad";
}
```

</PhpRunner>

Esta estructura nos resultará familiar cuando conozcamos otros lenguajes:

```text
if (condición) {
    instrucciones
} else {
    instrucciones
}
```

La **idea** es común a muchos lenguajes, pero cada lenguaje establece su propia sintaxis.

En PHP, por ejemplo:

- las variables comienzan por `$`;
- `echo` permite generar una salida;
- las instrucciones normalmente terminan con `;`;
- los bloques de instrucciones pueden delimitarse mediante `{` y `}`.

::: tip Una idea importante

Aprender programación no consiste únicamente en memorizar la sintaxis de PHP.

Muchos conceptos que estudiaremos —variables, condiciones, bucles, funciones, objetos...— existen también en otros lenguajes de programación.

:::


## Semántica

La **semántica** se ocupa del **significado**.

Un programa puede estar correctamente escrito desde el punto de vista sintáctico y, sin embargo, no hacer lo que nosotros pretendíamos.

Por ejemplo:

```php
$precio = 100;
$descuento = 20;

$total = $precio + $descuento;
```

El código es sintácticamente correcto.

Pero si nuestra intención era aplicar un descuento al precio, probablemente la operación no expresa lo que queríamos hacer.

::: info Algunas características de PHP

A medida que avancemos veremos algunas características importantes del lenguaje:

- PHP utiliza **tipado dinámico**.
- Las **expresiones** tienen una gran importancia en el lenguaje.
- PHP está especialmente orientado al desarrollo de aplicaciones web del lado del servidor.

No es necesario comprender todavía estas características. Las iremos viendo mediante ejemplos.

:::


## Instrucciones en un lenguaje de programación

Un programa está formado por **instrucciones**.

Aunque cada lenguaje tiene su propia sintaxis, existen construcciones que encontraremos continuamente al programar.

Entre ellas:

1. **Inicio y fin de bloques** de instrucciones.
2. Instrucciones para **obtener o mostrar información**.
3. **Declaraciones** de variables, constantes, funciones, clases...
4. **Asignaciones** de valores.
5. **Invocaciones** a funciones o métodos.
6. **Estructuras de control** para tomar decisiones o repetir instrucciones.
7. Gestión de **errores y excepciones**.

Veamos algunos ejemplos, sin preocuparnos todavía por aprender su sintaxis.


### Asignación

```php
$edad = 25;
```

Estamos asignando el valor `25` a una variable llamada `$edad`.


### Generar una salida

```php
echo "Hola";
```

PHP genera como salida el texto:

```text
Hola
```


### Invocar una función

```php
strlen("Hola");
```

Estamos llamando a una función.


### Estructura de control

```php
if ($edad >= 18) {
    echo "Mayor de edad";
}
```

Estamos indicando que una instrucción solamente debe ejecutarse cuando se cumple una determinada condición.

::: tip No memorices esto todavía

El objetivo ahora es simplemente comprobar que un programa está formado por **diferentes tipos de instrucciones**.

Estudiaremos cada una de ellas en los siguientes temas.

:::


## Separando instrucciones

Hay una regla sintáctica que debemos conocer desde el principio.

::: definicion El punto y coma `;` | fa-solid fa-code

En PHP las instrucciones normalmente se separan utilizando un **punto y coma (`;`)**.

:::

Por ejemplo:

<PhpRunner
filename="instrucciones.php"
description="Varias instrucciones separadas mediante punto y coma"
>

```php
<?php

$edad = 25;
$nombre = "Manuel";

echo "Qué bonito es PHP";
```

</PhpRunner>

Tenemos tres instrucciones:

```php
$edad = 25;

$nombre = "Manuel";

echo "Qué bonito es PHP";
```

Cada una termina con:

```text
;
```


## ¿Siempre hay que escribir `;`?

Existe una excepción que conviene conocer.

Cuando una instrucción es la última antes de cerrar un bloque PHP mediante `?>`, PHP permite omitir el punto y coma.

Por ejemplo:

<PhpRunner
filename="php_html.php"
description="Combinamos HTML y PHP"
>

```php
<h2>Mi primera página</h2>

<?php echo "<p>Hola desde PHP</p>" ?>

<p>Esto vuelve a ser HTML</p>

<?php echo "<strong>Otra instrucción PHP</strong>" ?>
```

</PhpRunner>

Este ejemplo es especialmente interesante con nuestro `PhpRunner`.

Pulsa **Ejecutar** y compara las dos vistas:

- **Texto** muestra exactamente el contenido generado.
- **HTML** permite ver cómo interpreta ese contenido el navegador.

También podríamos escribir los puntos y coma:

```php
<?php echo "<p>Hola desde PHP</p>"; ?>

<p>Esto es HTML</p>

<?php echo "<strong>Otra instrucción PHP</strong>"; ?>
```

Ambas formas son válidas.

::: warning Recomendación

Aunque PHP permite omitir el `;` en ese caso concreto, mientras estamos aprendiendo conviene acostumbrarse a escribirlo.

Además, cuando un archivo contiene únicamente código PHP, habitualmente **no escribiremos la etiqueta de cierre `?>`**.

:::


## Las instrucciones trabajan con valores

Volvamos ahora a nuestra idea inicial:

> Un programa está formado por **instrucciones que trabajan con valores**.

Por ejemplo:

```php
10 + 5
```

trabaja con valores numéricos.

```php
"Hola " . "Manuel"
```

trabaja con cadenas de caracteres.

```php
true && false
```

trabaja con valores booleanos.

Sobre esos valores realizaremos diferentes **operaciones**.

Pero los valores no son todos iguales.

Cada valor tiene un **tipo**.


## Tipos de valores en PHP

En una primera aproximación, nos encontraremos con los siguientes tipos de valores:

| Tipo | Nombre PHP | Ejemplos |
|---|---|---|
| Enteros | `int` | `5`, `-20`, `1000` |
| Reales | `float` | `5.5`, `3.1416`, `54e3` |
| Cadenas | `string` | `"Hola"`, `'PHP'` |
| Booleanos | `bool` | `true`, `false` |
| Nulo | `null` | `null` |
| Arrays | `array` | `[1, 2, 3]` |
| Objetos | `object` | `new Persona()` |
| Recursos | `resource` | determinados recursos externos |

::: info Primera aproximación

Esta tabla nos sirve como introducción.

Más adelante estudiaremos con detalle el **sistema de tipos de PHP** y aparecerán otros conceptos como `callable`, `iterable`, tipos unión, tipos literales o enumeraciones (`enum`).

:::


## Valores numéricos

Podemos escribir valores enteros:

```php
5
-25
1000
```

y valores de coma flotante:

```php
5.5
3.1416
```

PHP permite además diferentes representaciones numéricas.

<PhpRunner
filename="numeros.php"
description="Diferentes formas de representar valores numéricos"
>

```php
<?php

// Decimal
echo 25;
echo "\n";

// Número real
echo 5.5;
echo "\n";

// Binario
echo 0b1100101;
echo "\n";

// Hexadecimal
echo 0xFAF4;
echo "\n";

// Octal
echo 0733;
echo "\n";

// Notación científica
echo 54e3;
```

</PhpRunner>

Sobre estos valores podremos realizar operaciones:

```text
+    suma
-    resta
*    multiplicación
/    división
```

Los operadores los estudiaremos más adelante.


## Cadenas de caracteres

Una cadena (`string`) representa texto.

Podemos escribirla utilizando comillas dobles:

```php
"Esto es una cadena"
```

o comillas simples:

```php
'Esto es otra cadena'
```

Una operación muy habitual sobre cadenas es la **concatenación**.

En PHP utilizamos el operador `.`:

<PhpRunner
filename="cadenas.php"
description="Concatenamos varias cadenas"
>

```php
<?php

$nombre = "Manuel";

echo "Hola " . $nombre;
```

</PhpRunner>


## Booleanos

Un booleano (`bool`) representa dos posibles valores:

```php
true
false
```

Los utilizaremos continuamente al trabajar con condiciones.

Por ejemplo:

<PhpRunner
filename="booleanos.php"
description="Utilizamos un valor booleano en una condición"
>

```php
<?php

$mayorEdad = true;

if ($mayorEdad) {
    echo "Puede acceder";
}
```

</PhpRunner>

También trabajaremos con operadores lógicos:

```text
&&    AND
||    OR
!     NOT
```


## El valor `null`

`null` representa la **ausencia de valor**.

Por ejemplo:

<PhpRunner
filename="null.php"
description="Una variable cuyo valor es null"
>

```php
<?php

$telefono = null;

var_dump($telefono);
```

</PhpRunner>

Obtendremos:

```text
NULL
```

Más adelante veremos con detalle qué significa y cómo se utiliza.


## Arrays

Un `array` permite almacenar varios valores.

Por ejemplo:

<PhpRunner
filename="arrays.php"
description="Un array con varios módulos"
>

```php
<?php

$modulos = [
    "Servidor",
    "Cliente",
    "Despliegue",
    "Interfaces"
];

var_dump($modulos);
```

</PhpRunner>

Los arrays son fundamentales en PHP y les dedicaremos un apartado completo.


## Objetos

PHP también permite trabajar con **objetos**.

Un objeto es una instancia de una clase.

Por ejemplo, podríamos definir:

```php
class Persona
{
    private string $nombre;
    private string $apellido;
    private string $telefono;
}
```

y posteriormente crear un objeto:

```php
$persona = new Persona();
```

No necesitamos saber todavía cómo funciona.

Lo estudiaremos cuando lleguemos a **programación orientada a objetos**.


## Recursos

PHP dispone también del tipo especial `resource`.

Un recurso representa una referencia a determinados **recursos externos** utilizados por PHP.

Por ejemplo, algunas operaciones relacionadas con:

- archivos;
- streams;
- procesos;
- determinadas extensiones.

::: warning Recursos y objetos

En PHP moderno no debemos pensar que cualquier conexión externa es necesariamente un `resource`.

Muchas extensiones actuales representan estos elementos mediante **objetos**.

Por ejemplo, `new mysqli()` devuelve un objeto `mysqli`, no un `resource`.

:::


## Probemos diferentes valores

Aunque todavía no conozcamos todos estos tipos, podemos pedir a PHP que nos muestre información sobre ellos utilizando `var_dump()`:

<PhpRunner
filename="valores.php"
description="Observamos diferentes tipos de valores con var_dump()"
>

```php
<?php

var_dump(5);

var_dump(5.5);

var_dump("Hola PHP");

var_dump(true);

var_dump(null);

var_dump(["servidor", "cliente"]);
```

</PhpRunner>

Observa la salida.

PHP nos informa tanto del **tipo** como del **valor** de cada elemento.

No necesitamos memorizar ahora todos los detalles de `var_dump()`. La utilizaremos muchas veces durante el curso para observar qué está ocurriendo en nuestros programas.


## Recapitulando

Podemos resumir esta primera aproximación a PHP con la idea con la que empezamos:

::: definicion Programa | fa-solid fa-code

Un **programa** está formado por **instrucciones** que trabajan con **valores**.

:::

<CardPane>

<Card header="Instrucciones" color="#2563eb">

Indican **qué debe hacer** el programa.

Asignar valores, generar una salida, tomar decisiones, repetir acciones, llamar a funciones...

</Card>

<Card header="Valores" color="#16a34a">

Son los **datos** con los que trabajan las instrucciones.

Números, cadenas, booleanos, arrays, objetos...

</Card>

<Card header="Tipos" color="#d97706">

Cada valor pertenece a un determinado **tipo**.

El tipo nos ayuda a determinar qué representa ese valor y qué operaciones podemos realizar con él.

</Card>

</CardPane>

A partir de aquí iremos estudiando cada uno de estos elementos con más detalle.