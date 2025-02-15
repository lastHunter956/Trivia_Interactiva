#!/bin/bash

echo "🔄 Inicializando PostgreSQL con la base de datos: $DB_NAME"

# Esperar a que PostgreSQL esté listo
until pg_isready -U "$POSTGRES_USER"; do
  echo "⏳ Esperando que PostgreSQL esté listo..."
  sleep 2
done

# Crear la base de datos si no existe
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    SELECT 'CREATE DATABASE $DB_NAME'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec
EOSQL


echo "✅ Base de datos '$DB_NAME' creados correctamente."
