# Url1y

An application to convert wordy URLs to much simiplier ones. Utilizing Symfony 5.1 as a backend REST API and Angular 10 as a frontend.

## Install with Docker-Compose

```
    $ git clone https://github.com/anorryce/url1y
    $ cd url1y
    $ docker-compose up --build
```
## Database Schema:

**long and short_url fields on the url table are VARCHAR(2048), not VARCHAR(255)

![Database Schema](/schema.png)


