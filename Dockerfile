# Utiliza una imagen base de Node.js
FROM node:20.11.0

# Crea un directorio de trabajo
WORKDIR /src

# Copia los archivos de definición de paquete
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el proyecto TypeScript
# RUN npm run build

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
