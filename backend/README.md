# Url1y

An application to convert wordy URLs to much simiplier ones. Utilizing Symfony 5.1 as a backend REST API and Angular 10 as a frontend.

## Install with Composer

```
    $ composer create-project anorryce/url1y myProject
```

## Generate the SSH keys

```
	$ mkdir config/jwt
	$ openssl genrsa -out config/jwt/private.pem -aes256 4096
	$ openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```

## Generate Token Authentication with Curl

```
	$ curl -H 'content-type: application/json' -v -X  POST http://127.0.0.1:8000/api/token -H 'Authorization:Basic username:password'
```

## User Registration with Curl

```
 	$ curl -H 'content-type: application/json' -v -X POST -d '{"name": "Austin", "surname": "Norryce", "email": "xxxx@xxxx.com", "username":"tintin", "password": "admin"}' http://127.0.0.1:8000/api/register
```

## User Forgot Password with Curl

```
	$ curl -H 'content-type: application/json' -v POST -d '{"email": "tony_admin@symfony.com"}' http://127.0.0.1:8000/api/forgot
```

## User Change Password with Curl

```
	$ curl -H 'content-type: application/json' -v POST -d '{"email": "tony_admin@symfony.com", "password":"admin"}' http://127.0.0.1:8000/api/change
```

## Getting phpunit

```
    $ php bin/phpunit or ./bin/phpunit
```

