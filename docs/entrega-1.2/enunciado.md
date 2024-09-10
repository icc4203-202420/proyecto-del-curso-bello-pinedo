# Entrega 1.2 - Diseño e implementación de interfaz web móvil

## Objetivos

El objetivo de esta entrega es continuar documentando el diseño de la interfaz de usuario de la aplicación móvil y realizar una implementación inicial de la interfaz utilizando React con Material UI.

## Diseño de Interfaz de Usuario

Para los requisitos funcionales 7 a 12 del [enunciado general del proyecto](../../README.md) (verlos también aquí a continuación), se debe presentar un diseño de interfaz móvil de mediana fidelidad, es decir, mostrar todas las pantallas asemejándose a la interfaz real, pero sin implementar funcionalidad real, sino _sólo navegación básica mediante enlaces entre las distintas pantallas_.

Aparte de los requisitos funcionales ya mencionados, se debe considerar un diseño para la pantalla de inicio de la aplicación. Lo ideal es que la pantalla de inicio pueda ofrecer una funcionalidad básica de búsqueda al usuario sin aún registrarse en la aplicación. Pueden considerar el uso de mapas en esta pantalla, o un _feed_ con bares o eventos destacados.

Recordamos que el diseño de interfaz debe realizarse considerando que el toolkit de interfaz de usuario móvil preferido será Material UI de Google, versión 2, y la implementación a usar será la biblioteca MUI de componentes para React ([https://mui.com/material-ui/](https://mui.com/material-ui/)), versión 5, la cual se basa en Material UI versión 2. Es posible utilizar un módulo no oficial de Grayhat Studio compatible con MUI ([https://material-web-components-react.grayhat.studio/](https://material-web-components-react.grayhat.studio/)), el cual provee componentes similares a Material UI versión 3. Estará permitido utilizar esto en su implementación, pero bajo su propio riesgo.

Además, para el diseño de la interfaz, estará permitido usar Axure RP o Figma. En el caso de Axure, recomendamos la siguiente biblioteca de componentes de Material UI versión 2: [https://github.com/duzyn/material-axure-library](https://github.com/duzyn/material-axure-library).

Para Figma, se puede buscar el [Material 2 Design Kit](https://www.figma.com/community/file/778763161265841481).

Tanto para Axure como Figma, se puede obtener una licencia educacional que permite utilizar toda la funcionalidad relevante del software.

## Completar Diseño de la Interfaz de Usuario (50%)

Se debe completar el diseño de interfaz de usuario de la entrega anterior y ampliarlo para contener las pantallas de interfaz que cumplan con la siguiente funcionalidad (correspondiente a requisitos 7 a 12 del enunciado general):

1.1. Los usuarios pueden ver la evaluación global de una cerveza (rating promedio), junto con a su propia evaluación de la cerveza (si existe) y las evaluaciones de otros usuarios. 

1.2. Los usuarios pueden asistir (hacer "_check-in_") en un evento (ver modelo `Attendance` y tabla en `schema.rb`), y ver todos los usuarios que también han hecho _check-in_.

1.3. Los usuarios pueden subir fotografías a los eventos (ver modelo `EventPicture`). 

1.4. Los usuarios pueden ver las fotos de un evento como una galería, con scrolling.

1.5. Los usuarios pueden buscarse mutuamente en la aplicación usando _handle_, y agregarse como amigos (ver modelo `Friendship` y tabla en `schema.rb`), indicando el evento en donde se encontraron por primera vez opcionalmente.

1.6. Los usuarios pueden etiquetarse en las fotos de un evento.

## Implementación de la Interfaz de Usuario (50%)

En esta entrega se deben implementar la versión inicial de su aplicación de frontend, la cual debe incluir sus propios componentes de React y el uso la biblioteca MUI para todas las principales pantallas contempladas en su diseño de aplicación. Es importante que los componentes incorporen los elementos de formulario necesarios, pero sin aún implementar su funcionalidad. No es necesario aún integrar mapas en la aplicación.

Deben desarrollar su aplicaición de frontend incluyendo:

2.1. Componente principal `App` de la aplicación, junto con interfaz de inicio de la aplicación (home).

2.2. Componente(s) para la interfaz que lista cervezas (`index` de cervezas), incluyendo la búsqueda de cervezas. Es necesario llamar a endpoint `GET api/v1/beers` de la API para obtener las cervezas a listar.

2.3. Componente(s) para la interfaz que lista bares (`index` de bares), incluyendo la búsqueda de bares. Es necesario llamar a endpoint `GET api/v1/bars`.

2.4. Componente(s) para la interfaz que muestra los eventos en un bar (`index` de bares/eventos). Es necesario llamar a endpoint `GET api/v1/bar/:id/events`. Es posible que tengan que implementar la(s) ruta(s) necesaria en el backend para que recursos de eventos sean anidados a los bares. Asimismo, tendrían que completar `EventsController` que fue requisito en la entrega pasada. 

2.5. Componente(s) para la interfaz que permite buscar usuarios por su handle. Basta la interfaz para ingresar el string de búsqueda. No es encesario implementar llamadas a la API aún.

2.6. Navegación entre la interfaz de inicio (home) y las pantallas arriba listadas. Para esto, incorporar `BrowserRouter` a la aplicación.

Los laboratorios 2 y 3 sirven como base para su trabajo.

## Evaluación

Las partes de diseño e implementación ponderan 50% c/u en la nota de la entrega. En cada parte hay seis ítems. Cada ítem aporta un punto a la parte. A la suma de puntos de cada parte se suma el punto base para obtener una nota en escala 1-7. La nota de la entrega es el promedio de las dos partes.

Cada requisito en cada una de las partes será evaluado en escala 1-5. Estos puntos se traducen a ponderadores:

* 1 -> 0.00: No entregado
* 2 -> 0.25: Esbozo de solucion
* 3 -> 0.50: Logro intermedio
* 4 -> 0.75: Alto logro con deficiencias o errores menores
* 5 -> 1.00: Implementación completa y correcta

Los ponderadores aplican al puntaje máximo del ítem. La nota en escala 1-7 se calcula como la suma de puntajes parciales ponderados más el punto base.

## Forma y fecha de entrega

Con respecto al diseño de interfaz de usuario, se debe proveer el archivo fuente de Figma o de Axure RP para su evaluación. Además, es conveniente exportar el diseño completo a PDF con estas herramientas. Los archivos de diseño deben ser entregados en la misma carpeta en donde está este archivo, con nombre 'grupoxx.abc', en donde xx es el número del grupo asignado por lista (publicada en Canvas), y .abc es la extensión que corresponda a la herramienta usada (Figma o Axure). 

El código con la implementación de la interfaz de usuario debe ser entregado en este repositorio. Para la evaluación, se debe realizar un pull request que incluya al ayudante de proyecto asignado.

La fecha límite para la entrega 1.2 es viernes 30/8 a las 23:59 hrs.