#!/bin/bash

# Exit on error
set -e

echo "Starting Laravel application..."

# Wait for database to be ready
echo "Waiting for database..."
until php artisan migrate --force 2>/dev/null; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready!"

# Run migrations
php artisan migrate --force

# Run database seeders
php artisan db:seed --force

# Clear and cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM in the background
php-fpm -D

# Start Nginx in the foreground
nginx -g 'daemon off;'