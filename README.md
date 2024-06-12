# Club App Microservice

Este proyecto es un microservicio para la gestión de clubes, desarrollado con Node.js y Express, utilizando Sequelize como ORM y MySQL como base de datos. A continuación, se detallan los pasos necesarios para configurar y ejecutar el microservicio.

## Requisitos Previos

1. **Instalar Node.js**
   - Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo e instalarlo desde [Node.js](https://nodejs.org/).

2. **Instalar MySQL**
   - Asegúrate de tener MySQL instalado en tu máquina. Puedes descargarlo e instalarlo desde [MySQL Download](https://dev.mysql.com/downloads/).

3. **Configurar MySQL**
   - Configura un usuario en MySQL. Este usuario debe tener los permisos necesarios para crear y gestionar bases de datos.

## Instrucciones de Configuración

1. **Clonar el repositorio**
   - Clona este repositorio en tu máquina local usando el siguiente comando:
     ```bash
     git clone https://github.com/tu-usuario/player-app-microservice.git
     cd player-app-microservice
     ```

2. **Configurar las variables de entorno**
   - En la raíz del proyecto, encontrarás un archivo llamado `example.env`. Este archivo contiene las claves de las variables de entorno que necesitas configurar.
   - Copia el contenido de `example.env` y pégalo en un nuevo archivo llamado `.env`.
   - Rellena los valores necesarios en el archivo `.env` con tus configuraciones específicas.

3. **Instalar dependencias**
   - Instala las dependencias del proyecto ejecutando:
     ```bash
     npm install
     ```

4. **Ejecutar el microservicio**
   - Inicia el microservicio con el siguiente comando:
     ```bash
     npm run dev
     ```

   - El microservicio debería estar corriendo en `http://localhost:3000` (o en el puerto que hayas configurado).


