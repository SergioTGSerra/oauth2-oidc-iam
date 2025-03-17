# Use PHP with Apache as the base image
FROM php:8.3-apache

# Install Additional System Dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    libicu-dev \
    libexif-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite for URL rewriting
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip intl pcntl exif

# Configure Apache DocumentRoot to point to Laravel's public directory
# and update Apache configuration files
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy the application code
COPY . /var/www/html

# Set the working directory
WORKDIR /var/www/html

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install project dependencies
RUN composer install --ignore-platform-reqs

#Remove sqlite database if exists
RUN rm -f /var/www/html/database/database.sqlite

#Copy .env file
RUN cp /var/www/html/.env.example /var/www/html/.env && \
    sed -i 's|APP_URL=.*|APP_URL=http://ecommerce:8000|' /var/www/html/.env

RUN php artisan key:generate


# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database
RUN chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database
RUN touch /var/www/html/database/database.sqlite
RUN chmod 666 /var/www/html/database/database.sqlite

# Run migrations and seeders
RUN php artisan migrate --force
RUN php artisan db:seed
RUN php artisan storage:link