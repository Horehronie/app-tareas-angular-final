# Sistema de gestión de facturas
## Características de la app
- Permite el registro y autenticación de usuarios mediante e-mail y contraseña, como también mediante cuenta de Google.
- Permite almacenar facturas en imagen o formato pdf en Firebase Storage
- Almacena en Firestore Database las entradas del usuario, las cuales incluyen el titular de la factura, el monto de la misma y si está paga o no, junto con la url del archivo subido en el mismo formulario para su posterior visualización.
- Permite la modificación y eliminación de las facturas subidas. En el caso de la eliminación, el archivo también se elimina de Firestore Storage.
- Permite la visualización de todas las facturas subidas por el usuario, incluyendo los datos de la misma y el acceso al archivo si así lo desea.
- Las tareas son individuales para cada usuario. Un usuario no puede ver, modificar ni eliminar las tareas de otros.
## Estructura del proyecto
- [Estructura de archivos](https://github.com/Horehronie/app-tareas-angular-final/blob/main/docs/estructura.md)
## Tecnologias utilizadas
- Angular (Angular CLI, Standalone Components, Angular Material)
- Firebase (Authentication, Storage, Firestore Database)
- Ngx-sonner para Notificaciones y Toasts
- Git, GitHub y GitHub Pages
## Pruebas y uso de la app
La app está subida a [GitHub Pages](https://horehronie.github.io/app-tareas-angular-final/)) para pruebas. Se puede ingresar con credenciales de prueba, las cuales están cargadas con varias facturas para probar su visualización y edición:
- E-Mail de prueba: test@prueba.com
- Password: 123456
Todas las funciones están disponibles para su uso y testeo. El límite de carga de archivos es de 10 MB por archivo.
