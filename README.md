# Proyecto Trivia Interactiva
Este repositorio contiene el código fuente del proyecto Trivia Interactiva, una aplicación web diseñada para ofrecer una experiencia de preguntas y respuestas en tiempo real. El proyecto está dividido en dos carpetas principales: backend y frontend, cada una con su propio conjunto de instrucciones para su ejecución
## Estructura del Repositorio
El repositorio está organizado de la siguiente manera:
```bash
trivia-interactiva/
├── backend/            # Código fuente del backend
├── frontend/           # Código fuente del frontend
└── README.md           # Documentación del proyecto
```
## Estado Actual del Proyecto
El proyecto se encuentra en desarrollo y aún no está completado. A continuación, se detalla el progreso de cada parte:
### Backend
- Progreso: 100%
- Funcionalidades completadas:
  - Configuración inicial del proyecto con NestJS.
  - Creación de módulos para autenticación, preguntas, categorías, usuarios y puntuaciones.
  - Integración con PostgreSQL para la gestión de datos.
  - Implementación de autenticación JWT.
  - Documentación de la API con Swagger.
  - implementacion de websocket para score en vivo
### Implementación de WebSocket en el Proyecto Trivia Interactiva:
Esta funcionalidad es esencial para garantizar una experiencia de juego fluida, donde las respuestas de los jugadores se procesen y actualicen en tiempo real.
Aquí hay una descripción general de cómo funciona el proceso:

1. Conexión: El cliente y el servidor establecen una conexión WebSocket.
2. Escucha: El servidor escucha eventos específicos, como la recepción de datos del cliente.
3. Envío de datos: El cliente envía datos al servidor a través de la conexión WebSocket.
4. Respuesta: El servidor recibe los datos y envía una respuesta al cliente.
5. Actualización: El cliente recibe la respuesta y actualiza su estado según sea necesario.

En el contexto de una aplicación específica, como un juego, el proceso podría ser el siguiente:

1. El cliente (el jugador) envía una respuesta a una pregunta al servidor.
2. El servidor recibe la respuesta y verifica su corrección.
3. Si la respuesta es correcta, el servidor envía una respuesta al cliente con la información actualizada, como el puntaje.
4. El cliente recibe la respuesta y actualiza su estado, como el puntaje en la base de datos.

### Frontend
- Progreso: 50%
- Funcionalidades completadas:
  - Diseño y maquetación de la interfaz gráfica.
  - Creación de componentes reutilizables.
- Faltante:
  - Integración con el backend.
  - Lógica para consumir la API y mostrar datos dinámicos.
 
## Instrucciones de Ejecución
A continuación, se detallan los pasos para ejecutar tanto el backend como el frontend.
### Backend
1. Prerrequisitos:
  - Asegúrate de tener instalado Node.js, Docker y Docker Compose.
2. Ejecutar la aplicación:
  - Una vez que los contenedores estén en funcionamiento, el backend estará disponible en:
```bash
    http://localhost:5000/docs
```
  - Accede a la documentación de la API en:
```bash
http://localhost:5000/docs
```
### Frontend
1. Prerrequisitos:
  - Asegúrate de tener instalado Node.js.
2. visualización:
  - Una ves seguido los pasos que estan en el readme.md de la carpeta front-end se visualiza en: http://localhost:3000
## Notas Importantes
- Integración Backend-Frontend: Actualmente, el frontend no está conectado con el backend debido a la falta de implementación de la lógica de WebSocket en el backend y la integración de la API en el frontend.
- Desarrollo en progreso: El proyecto está en fase de desarrollo activo. Se espera completar las funcionalidades faltantes en futuras iteraciones.

## Contribuciones
- Si deseas contribuir al proyecto, por favor sigue estos pasos:
- Crea un fork del repositorio.
- Realiza tus cambios en una rama nueva.
- Envía un pull request describiendo los cambios realizados.

