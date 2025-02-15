# Usa una imagen base oficial de Node.js
FROM node:22-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./


RUN rm -rf node_modules package-lock.json
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos
COPY . .





# Expone el puerto para NestJS
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]
