# Back-End Trivia Interactiva

## Instrucciones de Instalación

### Prerrequisitos

```bash
# Instalar dependencias globales
npm install -g @nestjs/cli
npm install -g pnpm
```

### Inicializar y Levantar la Aplicación

1. Crear una red de Docker: Ejecuta el siguiente comando para crear una red compartida:

```bash
 docker network create shared-network
```

2. Levantar la aplicación: En la raíz del proyecto, ejecuta el siguiente comando para construir y levantar los contenedores:

```bash
 docker-compose up --build
```

Nota: Si encuentras un error relacionado con la base de datos que no se crea, sigue estos pasos:

1. Acceder a la base de datos:

```bash
docker exec -it postgres_db psql -U admin
```
2. Crear la base de datos:
```bash
# Ya dentro de psql, crear la base de datos
CREATE DATABASE trivia_game;
```
3. Conectarse a la base de datos:
```bash
# Conectarse a la base de datos
\c trivia_game
```
4. Crear el esquema:
```bash
# Crear el esquema
CREATE SCHEMA trivia;
```
5. salir de la base de datos:
```bash
# Crear el esquema
exit
```
6. Reiniciar el contenedor:
```bash
docker restart nestjs-app
```

## Estructura del Proyecto y Decisiones Técnicas

```
back-end/
├── server/
│   ├── src/
│   │   ├── auth/         # Autenticación JWT
│   │   ├── questions/    # Módulo de preguntas
│   │   ├── categories/   # Módulo de categorías
│   │   ├── users/        # Módulo de usuarios
│   │   └── scores/       # Módulo de puntuaciones
│   └── test/            # Tests unitarios y e2e
└── postgres/
    └── init.sh          # Script inicialización DB
```

### Decisiones Técnicas

- NestJS: Framework elegido por su arquitectura robusta y modular
- PostgreSQL: Base de datos relacional para gestión de datos
- Docker: Contenedorización para desarrollo y despliegue consistente
- JWT: Autenticación basada en tokens
- TypeORM: ORM para manejo de base de datos
- Class-validator: Validación de DTOs
- Swagger: Documentación automática de API

## Endpoints de la API

### Documentación Swagger

Accede a la documentación completa en: `http://localhost:5000/docs#/`
Mantenimiento
Para reportar bugs o contribuir al proyecto, por favor crear un issue en el repositorio o enviar un pull request siguiendo las guías de contribución.

Para más detalles sobre la implementación, consultar la documentación de Swagger en el endpoint /api.
