# Alliance-api
## 

Alliance-api es una api el cual permite calcular mediante la formula de sustitucion las coordenadas de un punto, tomando como referencia las coordenas de 3 otros puntos y sus distancias respectivas al punto que se desea encontrar. Asi mismo, la api nos permite crear nuevos salites y decifrar el mensaje que se transmite desde una nave hasta los satelites.

https://www.youtube.com/watch?v=Cy0qvm3Gx-0&ab_channel=Vitual

Bien, para correr el proyecto basta con instalar inicialmente las dependencias del proyecto de la siguiente manera:

## Installation

Alliance-api require [Node.js](https://nodejs.org/) v10+ para correr.
Por defecto, el proyecto tiene configurado el puerto 4000 para pruebas locales.

```localhost:4000/api/```

Instala las dependencias y corre el servidor

```sh
cd alliance-api
npm install
node index
```

Asi mismo el proyecto utiliza librerias de terceros, como ser:

- Express
- Mongoose
- JWT
- bcrypt


## Features

- Calculo de coordenadas de un punto deseado.
- Creacion de nuevos usuarios a la plataforma.
- Inicio de sesión.
- Consulta de coordenadas con funcion de recalculo.
- Proteccion de endpoints mediante JWT.


Es un proyecto demo, con el fin de realizar un ejercicio con tecnologías de Javascript en el lado del backend.
