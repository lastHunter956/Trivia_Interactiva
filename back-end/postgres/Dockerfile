# Usar la imagen oficial de PostgreSQL
FROM postgres:15-alpine

# Copiar el script de inicialización
COPY init.sh /docker-entrypoint-initdb.d/init.sh

# Dar permisos de ejecución al script
RUN chmod +x /docker-entrypoint-initdb.d/init.sh

# Exponer el puerto de PostgreSQL
EXPOSE 5432
