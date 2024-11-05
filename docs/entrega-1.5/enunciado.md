# Entrega 1.5 - Finalización del Proyecto

## Objetivos

El objetivo de esta entrega es terminar la implementación de funciones de la aplicación, de acuerdo con lo descrito en el enunciado general.

## Conjunto de Características a Desarrollar

En esta entrega el foco está en completar la funcionalidad de la aplicación agregando soporte para subir fotos, verlas en galerías, y buscar amistades.

9. [1.0] Los usuarios pueden subir fotografías a los eventos (ver modelo `EventPicture`). 
10. [2.0] Los usuarios pueden ver las fotos de un evento como una galería, con scrolling.
11. [1.5] Los usuarios pueden buscarse mutuamente en la aplicación usando _handle_, y agregarse como amigos (ver modelo `Friendship` y tabla en `schema.rb`), indicando el evento en donde se encontraron por primera vez opcionalmente.
12. [1.5] Los usuarios pueden etiquetarse en las fotos de un evento.

## Implementación de la Funcionalidad

**Requisito 9**

Se debe permitir al usuario subir una fotografía tomada con su dispositivo móvil a un evento. Para esto, la interfaz en la vista de un evento debe proveer un botón que facilite tomar una fotografía con la cámara y subirla.

**Requisito 10**

Se deben implementar componentes que permitan visualizar las fotos de un evento (`EventPicture`) en formato de galería con scrolling vertical. 

**Requisito 11**

Para indicar el evento al momento de agregar una amistad, se debe usar una búsqueda con sugerencias. Es decir, evitar desplegar una lista con todos los eventos. Permitir al usuario escribir el título del evento, y sugerirle alternativas. Para esto, usar el componente `Autocomplete`, ver https://mui.com/material-ui/react-autocomplete/.

**Requisito 12**

Usar también el componente `Autocomplete` para encontrar a un usuario para etiquetar usando su handle.

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

La fecha límite para la entrega 1.5 es domingo lunes 29/9 a las 23:59 hrs.