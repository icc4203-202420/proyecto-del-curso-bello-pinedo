# Entrega 2.2 - Seguridad, Notificaciones y Eventos

## Objetivos

El objetivo de esta entrega es implementar la funcionalidad de notificaciones y eventos en la aplicación móvil, además de mejorar la seguridad de la aplicación. Para esto, se debe utilizar notificaciones push, SecureStore y Raect Native.

## Conjunto de Características a Desarrollar

Se solicita implementar a continuación las siguientes características específicas del proyecto:

1. [1.0] Los usuarios pueden buscarse mútuamente a través de su _handle_, y agregarse como amigos. Opcionalmente, se puede indicar en qué evento se conocieron.
2. [1.5] Los usuarios pueden buscar y hacer _"check-in"_ a los eventos realizados por los bares. Cuando un usuario hace _"check-in"_, se le notifica todos sus amigos que este participará del evento en el que se ha inscrito.
3. [1.5] Los usuarios pueden subir fotos sobre el evento, añadir una lista de handles asociados a la foto, y dar alguna descripción. La vista del evento debe mostrar todas las fotos que se han compartido. Los handles etiquetados deben recibir una notificación.
4. [2.5] Cuando un evento ha terminado (es decir, ha pasado la fecha del evento), se debe mostrar un botón en la vista que diga "Resumen", este botón genera un video sobre el evento, el cual se notifica a todos los usuarios.
5. [0.5] La autentificación debe ser persistente, utilizando SecureStore para almacenar el token de autentificación. Y manteniendo al usuario logeado en caso de cerrar y abrir la aplicación.

## Implementación de la Funcionalidad

**Requisito 1**

Los usuarios se buscan entre sí a través de su _handle_, y se agregan como amigos, durante esta vista, se puede indicar en qué evento se conocieron. La búsqueda no debe funcionar por nombre u otro dato, sólo por el _handle_, y una vez que alguien es agregado como amigo, se le debe informar a través de una notificación push, para que esté al tanto. La notificación push no debe hacer más que abrir la aplicación en la vista inicial.

**Requisito 2**

Cuando un usuario hace _"check-in"_ a un evento, se le notifica a todos sus amigos que este participará del evento en el que se ha inscrito. La notificación push debe abrir la aplicación en la vista del evento cuando es presionada.

**Requisito 3**

Cuando se sube una foto, esta debe almacenarse en el sistema de archivos del backend, y en caso de colocar etiquetas válidas, estas deben gatillar una notificación push a sus respectivos dispositivos. La notificación push debe abrir la aplicación en la vista de la foto cuando es presionada, y esta debe mostrar la lista de handles etiquetados abajo, junto con la opción de añadir como amigo en caso de no haberlo hecho.

**Requisito 4**

El botón "Resumen" de un evento, es en el fondo la opción que tiene un usuario para generar un video sobre el evento. Cuando se presiona, el backend debe generar un Job, el cual se encargue de tomar todas las imágenes del evento y generar un _slideshow_, es decir, un video que vaya mostrando las imágenes una por una como si fuera una presentación. Cuando se termina el job, se debe enviar una notificación a todos los usuarios que participaron del evento, y al presionar la notificación, se debe abrir la aplicación en la vista del evento, donde ahora en vez de un botón de "Resumen", se mostrará el video generado. La interfaz debe indicar que el video se está generando y que el usuario será eventualmente notificado, sin detenerlo de hacer otras cosas en la aplicación (como ir a generar el resumen de otro evento).

**Requisito 5**

En un principio la autentificación no era persistente, es decir, si se cerraba la aplicación, se perdía la sesión. Ahora, se debe utilizar SecureStore para almacenar el token de autentificación, y mantener al usuario logeado en caso de cerrar y abrir la aplicación.

## Sobre herramientas a utilizar

Esta entrega depende mucho de notificaciones y trabajos asíncronos, el objetivo final es familiarizarse con sistemas basados en procedimientos que no bloquean la aplicación, o dicho de otra forma, sistemas que reaccionan a eventos.

En el caso del video, la idea no es programar todo un sistema de slideshows en Ruby, si no hacer uso de las herramientas que ya existen a vuestra disposición. Existen muchas APIs que ya hacen esto, pero también, es posible hacer uso de la herramienta `ffmpeg` para generar videos a partir de imágenes. Basta con modificar el entorno donde ejecutan el backend, luego, utilizando la documentación de `ffmpeg` para generar un video a partir de imágenes [https://trac.ffmpeg.org/wiki/Slideshow](https://trac.ffmpeg.org/wiki/Slideshow), pueden ejecutar un comando indicando todas las imágenes asociadas al evento, incluso, pueden colocarle música.

```bash
# Este comando toma todas las imágenes con extensión .jpg en el directorio actual
# y genera un video llamado out.mp4 con una tasa de fotogramas de 1 imagen cada 3 segundos.

ffmpeg -framerate 1/3 -pattern_type glob -i '*.jpg' -c:v libx264 out.mp4
```

La idea en el fondo es ejecutar el comando desde Ruby, existen diversas formas para esto

Para mostrar el video en la aplicación, este debe ser expuesto como un recurso estático, luego con [Expo Video](https://docs.expo.dev/versions/latest/sdk/video/), pueden colocar la url del archivo estático en su backend, y realizar streaming del mismo de forma completamente automática en la aplicación, todo gestionado por Expo.

## Evaluación

Cada requisito en cada una de las partes será evaluado en escala 1-5. Estos puntos se traducen a ponderadores:

- 1 -> 0.00: No entregado
- 2 -> 0.25: Esbozo de solución
- 3 -> 0.50: Logro intermedio
- 4 -> 0.75: Alto logro con deficiencias o errores menores
- 5 -> 1.00: Implementación completa y correcta

Los ponderadores aplican al puntaje máximo del ítem. La nota en escala 1-7 se calcula como la suma de puntajes parciales ponderados más el punto base.

## Forma y fecha de entrega

El código con la implementación de la aplicación debe ser entregado en este repositorio. Para la evaluación, se debe realizar un pull request que incluya al ayudante de proyecto asignado.

La fecha límite para la entrega 2.2 es martes 29/10 a las 23:59 hrs.

##

```
Por último, les invito a darle vueltas a la idea de como asociar un device_token a un usuario, ¿qué pasa si un usuario se autentifica desde otro dispositivo?, al deslogearse, ¿a qué dispositivo llegarán las nuevas notificaciones?, ¿cómo se maneja esto en la vida real?

No es el objetivo de esta entrega resolver este problema, es un escenario poco probable para el ambiente en que se desenvuelve nuestro proyecto, pero es un buen ejercicio para anteponerse a lo que podría ser un problema en el futuro.
```
