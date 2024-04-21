FROM php:8.1.0-apache

# Enable Apache modules
RUN a2enmod rewrite

# Set the COMPOSER_ALLOW_SUPERUSER environment variable
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV NODE_VERSION=18.14.0

WORKDIR /var/www/html
COPY . .

RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install required packages
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    vim \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies with Composer
RUN composer install --prefer-dist --optimize-autoloader --no-interaction --ignore-platform-reqs

RUN a2enmod rewrite

# Install npm
RUN npm install
RUN npm run build

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && php artisan config:clear

EXPOSE 80