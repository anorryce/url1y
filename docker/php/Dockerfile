# ./docker/php/Dockerfile
FROM php:7.4.1-fpm

RUN pecl install apcu

RUN apt-get update && \
apt-get install -y \
zlib1g-dev

RUN docker-php-ext-install pdo_mysql

RUN docker-php-ext-enable apcu

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --filename=composer \
    && php -r "unlink('composer-setup.php');" \
    && mv composer /usr/local/bin/composer

WORKDIR /usr/src/app

COPY backend /usr/src/app

EXPOSE 4100

RUN PATH=$PATH:/usr/src/apps/vendor/bin:bin

#RUN php bin/console doctrine:migrations:migrate