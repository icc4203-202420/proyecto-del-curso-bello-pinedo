# Entrega 1.3 - Implementación de Funcionalidad Básica

## Objetivos

El objetivo de esta entrega es implementar funciones de autenticación en la aplicación, junto con la evaluación de cervezas desde la interfaz web móvil. Para esto, se deberá continuar utilizando características de React como hooks, módulos con hooks desarrollados por terceros, y componentes de Material UI, 

## Conjunto de Características a Desarrollar

En esta entrega el foco está en implementar funcionalidad en la aplicación que permita al usuario autenticarse y luego buscar y evaluar cervezas. Las características específicas del enunciado general que se deben incorporar son las siguientes:

1. [1.5] Los usuarios (ver modelo `User` y tabla en `db/schema.rb`) pueden registrarse ingresando nombre, apellido, email, un _handle_ (similar a X o Instagram, p.ej.,@kingofbeers), y datos de dirección opcionales (ver modelo `Address` y tabla en `db/schema.rb`). Además, pueden ingresar a la aplicación usando sus credenciales, y cerrar sesión.
5. [1.0] Los usuarios pueden buscar una cerveza en la aplicación (`Beer`), y ver los detalles de la cerveza, incluyendo qué cervecería la produce (`Brewery`), y qué bares la sirven.
6. [2.0] Los usuarios pueden escribir evaluaciones (ver modelo `Review` y tabla en `schema.rb`) de las cervezas, con rating, y texto. Las evaluaciones de los usuarios no pueden tener menos de 15 palabras. Además, el rating de evaluación es un valor decimal que debe estar entre 1 y 5 inclusive. Estos dos componentes de la evaluación son obligatorios.
7. [1.5] Los usuarios pueden ver la evaluación global de una cerveza (rating promedio), junto con a su propia evaluación de la cerveza (si existe) y las evaluaciones de otros usuarios. 

## Implementación de la Funcionalidad

**Requisito 1**
La funcionalidad de registro usuario y acceso autenticado a la aplicación es provista por la aplicación de backend a través de su API. Considerar las siguientes rutas y sus controladores y acciones asociados:

```ruby
  get 'current_user', to: 'current_user#index'
  devise_for :users, path: '', path_names: {
    sign_in: 'api/v1/login',
    sign_out: 'api/v1/logout',
    registration: 'api/v1/signup'
  },
  controllers: {
    sessions: 'api/v1/sessions',
    registrations: 'api/v1/registrations'
  }
```

Se debe incorporar a la interfaz web móvil los componentes necesarios para el, registro, inicio y cierre de sesión. El formulario de registro debe validar el texto de los campos necesarios. Esto incluye validar en el frontend el formato de dirección de correo electrónico, y que campos obligatorios no estén vacíos. El formulario de login también tiene que tener validación. Si nombre de usuario y contraseñas son incorrectos, se debe mostrar una retroalimentación apropiada al usuario.

**Requisito 5**

Los grupos pueden modificar libremente `db/seeds.rb` en la aplicación de backend para agregar los bares, cervezas, marcas (_brands_) y cervecerías (_breweries_) que prefieran. 

**Requisito 6**

Se requiere que las evaluaciones se realicen mediante campos de formulario con validación. El ingreso del rating tiene que ser altamente usable en una interfaz móvil. Se recomienda usar el [componente de slider de MUI](https://mui.com/material-ui/react-slider/).

**Requisito 7**

La información sobre la evaluación de la cerveza que se pide en este requisito debe estar accesible _desde_ o _en_ el componente que lista los detalles de una cerveza. La evaluación del propio usuario debe aparecer por el comienzo de la lista de evaluaciones.

La carga de las evaluaciones debe realizarse en forma completamente asíncrona, usando hook `useReducer` (función reductora) para actualizar los estados de carga, error, y las evaluaciones. Para el estado de carga considerar un mensaje desplegado en la interfaz "cargando..." o el uso de una animación de tipo spinner. Estará permitido no usar `useReducer` con un máximo de 3/5 puntos en este ítem de evaluación.

Dado que el número de evaluaciones puede ser considerable, incorporar [paginación de elementos con MUI](https://mui.com/material-ui/react-pagination/).

## Sobre herramientas a utilizar

En esta entrega pueden aplicarse todos los conocimientos vistos en clases, en los laboratorios, y en la lectura del libro The Road to React. Esto incluye el uso de módulos con hooks desarrollados por terceros, como el de use-local-storage-state, y axios-hooks.

## Sobre el Backend

La aplicación de backend contiene controladores requeridos por la funcionalidad básica a implementar en esta entrega. Está permitido modificar los controladores e incorporar nuevas rutas si por cualquier razón (p.ej., falta de funcionalidad) se requiere.

Actualmente, en el script de seeds de la base de datos se utilizan fábricas de FactoryBot definidas en `backend/spec/factories`. Si bien es posible omitir el uso de fábricas y crear modelos directamente en la base de datos,o usar archivos con fixtures, el uso de fábricas permite crear objetos para fines de desarrollo o pruebas con mucha flexibilidad y en gran cuantía si fuera necesario.

* Libro de [FactoryBot](https://thoughtbot.github.io/factory_bot/intro.html)

## Evaluación

Cada requisito en cada una de las partes será evaluado en escala 1-5. Estos puntos se traducen a ponderadores:

* 1 -> 0.00: No entregado
* 2 -> 0.25: Esbozo de solucion
* 3 -> 0.50: Logro intermedio
* 4 -> 0.75: Alto logro con deficiencias o errores menores
* 5 -> 1.00: Implementación completa y correcta

Los ponderadores aplican al puntaje máximo del ítem. La nota en escala 1-7 se calcula como la suma de puntajes parciales ponderados más el punto base.

## Forma y fecha de entrega

El código con la implementación de la aplicación debe ser entregado en este repositorio. Para la evaluación, se debe realizar un pull request que incluya al ayudante de proyecto asignado.

La fecha límite para la entrega 1.3 es viernes 6/9 a las 23:59 hrs.