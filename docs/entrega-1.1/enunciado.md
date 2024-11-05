# Entrega 1.1 - Diseño de interfaz web móvil y desarrollo inicial

## Objetivos

El objetivo de esta entrega es documentar el diseño de la interfaz de usuario de la aplicación móvil y realizar algunas tareas iniciales de desarrollo, como completar algunos endpoints de API necesarios de acuerdo a los requisitos funcionales a considerar.

## Diseño de Interfaz de Usuario

Para los requisitos funcionales 1 a 6 del [enunciado general del proyecto](../../README.md) (verlos también aquí a continuación), se debe presentar un diseño de interfaz móvil de mediana fidelidad, es decir, mostrar todas las pantallas asemejándose a la interfaz real, pero sin implementar funcionalidad real, sino _sólo navegación básica mediante enlaces entre las distintas pantallas_.

El diseño de interfaz debe realizarse considerando que el toolkit de interfaz de usuario móvil preferido será Material UI de Google, versión 2, y la implementación a usar será la biblioteca MUI de componentes para React ([https://mui.com/material-ui/](https://mui.com/material-ui/)), versión 5, la cual se basa en Material UI versión 2. Es posible utilizar un módulo no oficial de Grayhat Studio compatible con MUI ([https://material-web-components-react.grayhat.studio/](https://material-web-components-react.grayhat.studio/)), el cual provee componentes similares a Material UI versión 3. Estará permitido utilizar esto en su implementación, pero bajo su propio riesgo.

En el futuro cercano (último trimestre de 2024), se lanzará MUI 7 que estará basada en la versión 3 de Material UI. Lamentablemente, no alcanzaremos a incorporar esto en el curso en forma oficial.

Para el diseño de la interfaz, estará permitido usar Axure RP o Figma. En el caso de Axure, recomendamos la siguiente biblioteca de componentes de Material UI versión 2: [https://github.com/duzyn/material-axure-library](https://github.com/duzyn/material-axure-library).

Para Figma, se puede buscar el [Material 2 Design Kit](https://www.figma.com/community/file/778763161265841481).

Tanto para Axure como Figma, se puede obtener una licencia educacional que permite utilizar toda la funcionalidad relevante del software.

## Evaluación del Diseño

El diseño debe contener las pantallas de interfaz que cumplan con la siguiente funcionalidad:

1. [.5] Los usuarios (ver modelo `User` y tabla en `db/schema.rb`) pueden registrarse ingresando nombre, apellido, email, un _handle_ (similar a X o Instagram, p.ej.,@kingofbeers), y datos de dirección opcionales (ver modelo `Address` y tabla en `db/schema.rb`).
2. [.5] Los usuarios pueden buscar bares en la aplicación por nombre.
3. [.5] Los usuarios pueden buscar bares por ubicación (país, ciudad, calle y número), usando un mapa.
4. [.5] Los usuarios pueden ver la lista de eventos (ver modelo `Event` en `schema.rb`) que se celebran en un Bar (modelo `Bar` y tabla en `schema.rb`).
5. [1.0] Los usuario pueden buscar una cerveza en la aplicación (`Beer`), y ver los detalles de la cerveza, incluyendo qué cervecería la produce (`Brewery`), y qué bares la sirven.
6. [1.0] Los usuarios pueden escribir evaluaciones (ver modelo `Review` y tabla en `schema.rb`) de las cervezas, con rating y texto.

## Implementación de controladores en la API

En la API del backend, se pide agregar los siguientes controladores en esta entrega:

* [1 punto] `EventsController`: Se deben implementar los endpoints de `GET /api/v1/events/:id` (muestra evento), `POST /api/v1/events` (crea evento), `PATCH /api/v1/events` (actualiza evento), `DELETE /api/v1/events/:id` (elimina evento). Notar que los eventos permiten usar una imagen de flyer. Deben el procesamiento de la imagen, en forma similar a cómo opera `BeerController` y `BarsController`. Añadir también requisitos de autenticación para operaciones de creación, actualización y eliminación de eventos.
* [1 punto] `UsersController`: Se deben implementar los endpoints de `GET /api/v1/users/:id/friendships` (permite obtener información de todas las amistades del usuario con `user_id`), es decir, retorna una lista con todos los `user` que son amigos según el modelo `Frienship`. Además, se debe implementar `POST /api/v1/users/:id/friendships`, para agregar una nueva amistad (ver modelo `Friendship` y tabla en `db/schema.rb`). Añadir requisito de autenticación para todas estas operaciones.

## Evaluación

Cada requisito será evaluado en escala 1-5. Estos puntos se traducen a ponderadores:

* 1 -> 0.0: No entregado
* 2 -> 0.25: Esbozo de solucion
* 3 -> 0.5: Logro intermedio
* 4 -> 0.75: Alto logro con deficiencias o errores menores
* 5 -> 1.00: Implementación completa y correcta

Los ponderadores aplican al puntaje máximo del ítem. La nota en escala 1-7 se calcula como la suma de puntajes parciales ponderados más el punto base.

## Forma y fecha de entrega

Con respecto al diseño de interfaz de usuario, se debe proveer el archivo fuente de Figma o de Axure RP para su evaluación. Además, es conveniente exportar el diseño completo a PDF con estas herramientas. Los archivos de diseño deben ser entregados en la misma carpeta en donde está este archivo, con nombre 'grupoxx.abc', en donde xx es el número del grupo asignado por lista (publicada en Canvas), y .abc es la extensión que corresponda a la herramienta usada (Figma o Axure). 

El código con la implementación de los controladores debe ser entregado en este repositorio. Para la evaluación, se debe realizar un pull request que incluya al ayudante de proyecto asignado.

La fecha límite para la entrega 1.1 es viernes 23/8 a las 23:59 hrs.