# Url1y

An application to convert wordy URLs to much simiplier ones. Utilizing Symfony 5.1 as a backend REST API and Angular 10 as a frontend.

## Install with Docker-Compose

```
    $ git clone https://github.com/anorryce/url1y
    $ cd url1y
    $ docker-compose up --build
```
Once all containers are up, run the following command in the php container:
```
    $ RUN php bin/console doctrine:migrations:migrate
```
This will start the doctrine migration script to migrate the mysql database with the tables need for the backend.

## Database Schema:

**long and short_url fields on the url table are VARCHAR(2048), not VARCHAR(255)

![Database Schema](/schema.png)


