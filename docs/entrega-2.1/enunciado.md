# Entrega 2.1 - Prototipado de la Aplicación Móvil

## Objetivos

El objetivo de esta entrega es iniciar el prototipado de la aplicación móvil, implementando la funcionalidad de autenticación y la búsqueda de cervezas. Para esto, se deberá utilizar React Native, y componentes de React Native Elements para la UI.

## Conjunto de Características a Desarrollar

El objetivo es iniciar la implementación de la aplicación móvil, con la funcionalidad de autenticación y búsqueda de cervezas. Las características específicas del enunciado general que se deben incorporar son las siguientes:

1. [1.5] Los usuarios pueden registrarse manteniendo el modelo de datos del proyecto 1, así como también, autentificarse con sus credenciales. En esta primera instancia, no es necesario almacenar el token en el dispositivo móvil, es decir, si cierro y abro la aplicación, no hay problema con que se me solicite volver a ingresar.
2. [1.0] Los usuarios pueden buscar una cerveza en la aplicación (`Beer`), y ver los detalles de la cerveza, incluyendo qué cervecería la produce (`Brewery`), y qué bares la sirven.
3. [2.0] Los usuarios pueden escribir evaluaciones (ver modelo `Review` y tabla en `schema.rb`) de las cervezas, con rating, y texto. Las evaluaciones de los usuarios no pueden tener menos de 15 palabras. Además, el rating de evaluación es un valor decimal que debe estar entre 1 y 5 inclusive. Estos dos componentes de la evaluación son obligatorios.
4. [1.5] Los usuarios pueden ver la evaluación global de una cerveza (rating promedio), junto con a su propia evaluación de la cerveza (si existe) y las evaluaciones de otros usuarios.

## Implementación de la Funcionalidad

**Requisito 1**
La funcionalidad de registro usuario y acceso autenticado a la aplicación es provista por la aplicación de backend a través de su API. Se debe incorporar a la interfaz web móvil los componentes necesarios para el, registro, inicio y cierre de sesión. El formulario de registro debe validar el texto de los campos necesarios. Esto incluye validar en el frontend el formato de dirección de correo electrónico, y que campos obligatorios no estén vacíos. El formulario de login también tiene que tener validación. Si nombre de usuario y contraseñas son incorrectos, se debe mostrar una retroalimentación apropiada al usuario. Esta debe ser la priemra vista que se observa al abrir la aplicación.

**Requisito 2**

Se debe preferir el uso de FlatList para mostrar este tipo de elementos, con el fin de mantener un standar en como mostrar listas de cosas en React Native.

**Requisito 3**

Se requiere que las evaluaciones se realicen mediante campos de formulario con validación. Para esto, se sugiere utilizar el componente [Slider de React Native Elements](https://reactnativeelements.com/docs/components/slider)

**Requisito 4**

La información sobre la evaluación de la cerveza que se pide en este requisito debe estar accesible _desde_ o _en_ el componente que lista los detalles de una cerveza. La evaluación del propio usuario debe aparecer por el comienzo de la lista de evaluaciones.

La carga de las evaluaciones debe realizarse en forma completamente asíncrona, usando hook `useReducer` (función reductora) para actualizar los estados de carga, error, y las evaluaciones. Para el estado de carga considerar un mensaje desplegado en la interfaz "cargando..." o el uso de una animación de tipo spinner. Estará permitido no usar `useReducer` con un máximo de 3/5 puntos en este ítem de evaluación.

Dado que el número de evaluaciones puede ser considerable, incorporar una [FlatList](https://reactnative.dev/docs/flatlist), notar que estas disponibilizan las vistas hacia abajo, y con el fin de mejorar el rendimiento, se deben utilizar las propiedades de scroll para no cargar muchos elementos que no se están viendo (ver `initialNumToRender`).

## Sobre herramientas a utilizar

En esta entrega se deben poner en práctica los componentes principales disponibles en React Native, recordar que estos no son las etiquetas HTML a las que estamos acostumbrados, si no que son etiquetas de React Native que se traducen a componentes nativos de Android o iOS. A su vez, se sugiere utilizar [React Native Elements](https://reactnativeelements.com/) para la UI, y [Fetch](https://reactnative.dev/docs/network) para las llamadas HTTP al backend.

El backend es el que han estado desarrollando, el cual pueden seguir modificando para cumplir con los requisitos solicitados. Para inicializar el proyecto, pueden tomar de base el ejemplo de expo en [https://docs.expo.dev/], o bien, utilizar el proyecto vacío de `hybrid-frontend`, el cual cuenta con solo 1 vista y sin navegación.

La navegación debe ser basada en archivos, es decir, los archivos de la carpeta `app` deben dar cuenta de las rutas disponibles en la aplicación (ver (File-based routing)[https://docs.expo.dev/develop/file-based-routing/])

## Evaluación

Cada requisito en cada una de las partes será evaluado en escala 1-5. Estos puntos se traducen a ponderadores:

- 1 -> 0.00: No entregado
- 2 -> 0.25: Esbozo de solucion
- 3 -> 0.50: Logro intermedio
- 4 -> 0.75: Alto logro con deficiencias o errores menores
- 5 -> 1.00: Implementación completa y correcta

Los ponderadores aplican al puntaje máximo del ítem. La nota en escala 1-7 se calcula como la suma de puntajes parciales ponderados más el punto base.

## Forma y fecha de entrega

El código con la implementación de la aplicación debe ser entregado en este repositorio. Para la evaluación, se debe realizar un pull request que incluya al ayudante de proyecto asignado.

La fecha límite para la entrega 2.1 es viernes 16/109 a las 23:59 hrs.
