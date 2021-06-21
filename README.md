# Description

Aplicación web desarrollada con react y firebase para la organización de productos por bodegas

# Getting Started with Kiqui

Este proyecto esta desarrollado con React.js por lo cual son validos los siguientes comandos para inicializar el proyecto de manera local

## Available Scripts

### `npm start`

Ejecuta la aplicación en el modo de desarrollo..\
Abre [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

La página se recargará si realiza modificaciones. \
También verá errores de pelusa en la consola.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`. \
Agrupa correctamente React en el modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de archivo incluyen los hash. \
¡Tu aplicación está lista para implementarse!

Consulte la sección sobre [implementación] (https://facebook.github.io/create-react-app/docs/deployment) para obtener más información.

## Dependecias

Firebase
### `npm install firebase`
SweetAlert 2
### `npm install sweetalert2`
React Router DOM
### `npm install react-router-dom`
Reactfire
### `npm i reactfire`


## Servidor y Base de Datos 

Se agregó una base de datos basada en la nube la cual busca trabajar en tiempo real. Se eligió esta base de datos puesto 
a que es bastante rápida y no necesita de un hosting para ser almacenada o utilizada al momento del deploy además 
De facilitar los procesos de consultas, almacenamiento y ediciones de la información de la base de datos.

En el archivo Firebase.js se agregó la configuración de la key o contraseña dada por firebase para su uso libre en la aplicación 
además de exportar a su vez "firestore" la cual es una base de datos sencilla de utilizar y de uso gratuito , la cual se usará 
en todo el proyecto buscando hacer más rápidas las consultas y acortar código innecesario al momento de realizar las mismas.

## Autenticación y Manejo de Consultas en la base de datos 

Se manejarón funciones ya creadas por firebase para autenticar y validar usuarios con contraseña y correo electronico, además de 
esto, se agregaron campos en firestore que se almacenan al momento de registrar un usuario y se "relaciona" con un id de usuario 
en las autenticaciones.

Las consultas a la base de datos así como eliminar, editar y almacenar datos se hizo con funciones ya creadas por firebase 
Utilizando async/await para obtener los datos que estas funciones retornaban, se validaron todas las consultas en caso tal 
de que fueran correctas o tuvieran algún tipo de fallo o error. Tambien se valido que las consultas llegarán con datos y no vacías.

## Sesiones de Usuario 

Se manejo funciones de autenticación de firebase para obtener las sesiones de los usuarios al momento de renderear los componentes 
esto hace que se tome una decisión al momento de renderear, en caso tal de que tenga sesión se cargarán unos componentes como estos 
mismos no se rendearán en caso tal de que no se tenga sesión.

## Props para las consultas 

Se utilizaron props para la mayoria de consultas a la hora de agregar, eliminar o editar datos, por lo mismo cada uno de los props 
que se manejan en los componentes funcionales son obligatorios o son extremadamente necesarios, por lo mismo no funcionará el 
componente en caso tal de que no se pasen los props correctos.

## Interfaces y Bootstrap 

Para todas las interfaces de la aplicación se manejo bootstrap, pero se editó algunas partes del código original de bootstrap 
para hacerlo más completo a la idea del proyecto, tambien se agregarón algunas clases extras en el archivo de index.css que se usan 
en la mayoria de componentes de la aplicación. Se manejaron iconos que tambien dependen de bootstrap aunque las imagenes son sacadas de 
[https://www.pexels.com/](https://www.pexels.com/https://www.pexels.com/)  con licencia de uso libre.

## Deploy y Demo

Se hizo un deploy a heroku plataforma para en donde se subió la aplicacion en la nube además de agregar el código a git hub, la aplicación desplego sin errores y se puede ver su demo en el siguiente enlace.
[https://boiling-sierra-67699.herokuapp.com/](https://boiling-sierra-67699.herokuapp.com/https://boiling-sierra-67699.herokuapp.com/)
