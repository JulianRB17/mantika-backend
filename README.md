# Mantika full api

## API creada para el proyecto final del bootcamp en web development Practicum de Yandex.

Para revisar el proyecto se debe correr primero el backend con npm run dev, también activar mongod y, finalmente, correr el frontend con npm start.

El frontend de esta API fue desarrollado usando la biblioteca de JavaScript: React, el backend usa Node.js con el framework Express además de MongoDB como base de datos no relacional.

El servidor se encuentra alojado en Google Cloud, éste ocupa NGINX para vincular los puertos y pm2 para mantenerse operando.

## Cómo usar

Para usar la web app se requiere una autorización.

- Sin autorización cualquier endpoint será redirigido a '/landing'. También en el header, en la barra de navegación se encontrarán links a los endpoints '/around-us', '/login' y '/register'.

- En '/register' hay un formulario con autorización para poder generar un nuevo usuario, al meter los datos con características correctas apuntadas por los mensajes de error, será autorizado. Todos los campos son requeridos.

- En '/login' habrá otro formulario, que con un email y contraseña autorizará el acceso.

- Tanto en '/login' como en '/register' el ingreso correcto almacenará un token en el local storage del navegador, éste tendrá una validez de 7 días.

- Junto al logotipo de Mantika, del lado izquierdo de la barra de navegación, habrá dos botones: EN y ES, el botón EN conectará a una API con una inteligencia artificial (ai-translate) que permitirá traducir los elementos de texto escritos en la página al idioma inglés. Esta información se almacenará por lo que la llamada a la API sólo se realizará una vez cada que la página se recarga, por esto las siguientes veces que el botón se toque se cargará rapidamente el nuevo lenguaje. El botón ES regresará al español.

- Después de ser autorizado, el usuario podrá acceder al endpoint '/home', página principal donde del lado izquierdo podemos ver una sidebar con nuestros datos, debajo se encontrará un botón para editar el usuario que nos lleva al endpoint '/users/:id', también habrá otro botón que permitirá ver en la zona central los proyectos creados específicamente por el usuario.

- En el endpoint '/users/:id' si el usuario que se está revisando es el mismo que está navegando se pueden editar los datos y eliminar al usuario con el botón del bote de basura en la esquina superior izquierda. Los únicos datos que no se pueden modificar son los números de proyectos creados y proyectos en los que el usuario colabora. Si el usuario es otro, únicamente se podrán revisar los datos sin la posibilidad de editar ninguno.

- Al ser autorizado, el header cambiará: se abrirá la posibilidad de cerrar sesión en el botón logout, por otro lado el botón home reseteará la zona central del home y, si el usuario se encuentra en algún otro endpoint, será redirigido a '/home'. El botón About us redirigirá al mismo enpoint. También aparecerá una barra de búsqueda, al colocar algún texto en ésta y mandarla se renderizarán en la zona central proyectos que incluyan esta palabra en el nombre, la descripción, la disciplina o la ciudad.

- En la zona central se renderizarán, de manera predeterminada los diferentes proyectos almacenados en la base de datos, estos están paginados, hasta 8 proyectos por página. Si sólo hay una página, no habrán números renderizados.

-Al final de cada página habrá un botón de + que dirigirá al endpoint '/proyect/create' donde habrá un formilario con validación que permitirá crear un nuevo proyecto. Todos los campos son requeridos.

- En cada uno de los proyectos se puede dar click en la imagen central para ir al endpoint '/proyect/:id', en éste se podrá revisar la información de cada proyecto, si el proyecto fue creado por el usuario éste podrá editarlo, la edición también tiene validación. Si el proyecto es propio, desde '/home' también habrá un botón para eliminar al proyecto y otro para editarlo. También se le puede dar click al nombre del usuario creador, para ir al endpoint '/users/:id'.

- En el endpoint '/proyect/:id' si el usuario no es dueño del proyecto, en lugar de editar, el botón dirá colaborar lo que permitirá sumar ese proyecto a la lista de proyectos en los que se está colaborando (aún no es visible) y se sumará el usuario a la lista de usuarios en que están colaborando en éste (tampoco es visible por el momento).

## Frontend endpoints

- `/landing` - Página inicial si el usuario no ha sido loggeado. Contiene botones a '/register' y a '/login'.

- `/about` - Página que tiene un texto acerca del proyecto de la app.

- `/register` - Registro de usuarios a través de un formulario.

- `/login` - Aquí se podrá autorizar un usuario a través de un email y contraseña válidos.

- `/home`, Página principal, sólo se puede acceder después de estar validado. Se pueden ver hasta 8 proyectos, si hay más aparecerá un componente de paginación que permite acceder a otras páginas.

- `/users/:id` Si el usuario es el autorizaso podrá editar sus datos o eliminar al usuario. Si no, sólo verá los datos del otro usuario.

- `/proyect/create` Formulario para la creación de un nuevo proyecto.

- `/proyect/:id` Si le usuario es dueño del proyecto, podrá editar sus datos. Si no podrá verlos y decidir colaborar con el proyecto.

### Running the frontend project

- `npm run start` — Para iniciar el servidor.

- `npm run build` — Para crear el build.

## Backend directories

- POST `/signup` - toma en el body de request un JSON con los campos que generarán un nuevo usuario: email, username, password, description, city, discipline y profilePic todos requeridos.

- POST `/login` - para la autorización se usa un email válido, éste busca a su par en la base de datos y luego compara las contraseñas. Si ambos campos son válidos, devuelve un token.

- GET `/proyects` - devuelve un array con todos los proyectos generados.

- POST `/proyects` - toma en el body de request un JSON con los campos proyectName, proyectPic, city, description y discipline, todos requeridos, para crear un nuevo proyecto. proyectPic debe ser una URL. Toma el id del usuario que la está generando para crear el campo owner.

- GET `/proyects/created` - regresa un array con todos los proyectos creados por el usuario.

- GET `/proyects/:id` - regresa la data de un proyecto específico.

- DELETE `/proyects/:id` - elimina un proyecto siempre y cuando el usuario que lo creó sea el mismo que lo está solicitando.

- PATCH `/proyects/:id`- edita un proyecto siempre que el usuario que solicite esta acción sea el que lo creó.

- PATCH `/proyects/colaborate/:id`- almacena en el proyecto el id del usuario que quiera colaborar en éste.

- GET `/users` - devuelve un array con todos los usuarios registrados.

- GET `/users/me` - devuelve la data del usuario que la está solicitando.

- GET `/users/:id` - devuelve la información de un usuario específico.

- PATCH `/users/:id`- edita un usuario siempre que el usuario que solicite esta acción sea el que lo creó.

- PATCH `/users/colaborate`- toma en el body el id de un proyecto y lo almacena en el usuario.

- PATCH `/users/create`- almacena en el usuario el id de un proyecto que éste crea.

- DELETE `/users/:id` - borra a un usuario siempre y cuando éste sea el que lo está solicitando.

### Running the backend project

El backend está corriendo constantemente gracias a pm2.
Si fuera necesario reiniciarlo se usa: pm2 restar app.

## Tech

Se usan las siguientes tecnologías:

```sh
- HTML - Marcado que da estructura a la página, está dentro del marcado jsx de React.
- CSS - Da estílo a React y a HTML.
- JavaScript - Lenguaje base de React y de todo el proyecto.
- React - Biblioteca de JavaScript para vincularse con el HTML.
- Node.js - Framework de JavaScript que permite la creación del backend.
- Express - Framework de Node.js.
- MongoDB - Base de datos no relacional.
- Mongoose - Vincula a MongoDB con Node.js.
- Git - Sistema de control.
- GoogleCloud - Espacio virtual donde se almacena el servidor.
- NGINX - Proxy inverso para gestionar los puertos del servidor.
- pm2 - Gestionador de procesos que mantiene la app en línea de forma perpetua.
- Ubuntu 20.04 - Sistema operativo en el que está alojado el servidor.
```
