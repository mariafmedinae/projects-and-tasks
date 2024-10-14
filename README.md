# ProjectsTasks

Prueba técnica para desarollador Angular

## Descargar e instalar la aplicación

Con el comando `git clone https://github.com/mariafmedinae/projects-and-tasks.git` se puede descargar este proyecto. Después se ejecuta el comando `npm install` para instalar las dependencias. Una vez finalizado este proceso se puede abrir la aplicación en el navegador con `ng s -o`.

## Manejo de errores
En la ruta de carpetas del proyecto `scr/app/services` hay un archivo llamado `errors.service.ts` en el cual hay condicionales para simular casos de error al hacer algunas acciones dentro de la aplición.

-Al eliminar un proyecto o una tarea: Sale error si se tratan de eliminar los items con id igual a 3.

-Al crear un proyecto o una tarea: Si los campos Nombre del proyecto o Tarea se digita un @ va a salir error