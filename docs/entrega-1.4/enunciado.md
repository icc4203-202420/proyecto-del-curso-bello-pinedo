# Entrega 1.4 - Implementación de Funciones Avanzadas

## Objetivos

El objetivo de esta entrega es implementar algunas funciones más avanzadas en la aplicación, incluyendo búsquedas con georeferenciación usando la API de Google Maps, y la Geolocation API del navegador web.

## Conjunto de Características a Desarrollar

En esta entrega el foco está en implementar funcionalidad en la aplicación enfocada en búsquedas de bares, revisión de eventos en bares, y confirmar la asistencia a un evento.

2. [1.0] Los usuarios pueden buscar bares en la aplicación por nombre.
3. [2.0] Los usuarios pueden buscar bares por ubicación (país, ciudad, calle y número), usando un mapa.
4. [1.5] Los usuarios pueden ver la lista de eventos (ver modelo `Event` en `schema.rb`) que se celebran en un Bar (modelo `Bar` y tabla en `schema.rb`).
8. [1.5] Los usuarios pueden asistir (hacer "_check-in_") en un evento (ver modelo `Attendance` y tabla en `schema.rb`), y ver todos los usuarios que también han hecho _check-in_.

## Implementación de la Funcionalidad

**Requisito 2**

Es importante que la búsqueda no haga distinción de mayúsculas y minúsculas. En los resultados de búsqueda deben aparecer bares que coincidan por nombre. Es importante que las entradas de resultados contengan la información de la ubicación del bar (p.ej, líneas 1 y 2 de la dirección, la ciudad y el país). De lo contrario, la búsqueda es menos útil, pudiendo existir en el mundo muchos bares con un mismo nombre.

**Requisito 3**

Se recomienda fuertemente usar `yarn add @react-google-maps/api` para implementar esta funcionalidad en el frontend. Se debe registrar la ubicación GPS actual detectada por el navegador web, y centrar allí el mapa desplegado. Con este estado inicial, se debe permitir la búsqueda de un bar por su nombre, y que aparezca el marcador desplegado en el mapa si hay coincidencias.

Se deben agregar algunos bares al archivo de seeds en ubicaciones, por ejemplo, en Las Condes, Providencia, etc., tal que puedan ser buscados y al ser encontrados, aparezcan los marcadores coincidentes en el mapa. 

**Requisito 4**

Es importante que aparezcan los eventos con suficiente información que los describa (nombre, fecha y hora, etc.). Además, el requisito 8 podría ser invocado directamente desde el listado de eventos. Cuando el usuario confirma su asistencia a un evento, la interfaz - en vez de mostrar al usuario un botón o elemento similar para confirmar asistencia - debe desplegar algún mensaje que informe al usuario "Has confirmado tu asistencia".

**Requisito 8**

Es importante que desde la vista de un evento se puedan listar las personas que asistirán. Quiénes sean amigos del usuario deben aparecer listados al comienzo y aparecer identificados como amigos. Deben aparecer con su nombre y/o _handle_ en el sistema. 

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

La fecha límite para la entrega 1.4 es lunes 16/9 a las 23:59 hrs.