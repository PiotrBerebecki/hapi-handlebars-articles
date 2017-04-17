[![Build Status](https://travis-ci.org/PiotrBerebecki/hapi-handlebars-articles.svg?branch=master)](https://travis-ci.org/PiotrBerebecki/hapi-handlebars-articles)
[![codecov](https://codecov.io/gh/PiotrBerebecki/hapi-handlebars-articles/branch/master/graph/badge.svg)](https://codecov.io/gh/PiotrBerebecki/hapi-handlebars-articles)


## Installation Instructions
- Clone this repository
- Run `npm install`
- Create a `config.env` and `config-test.env` file

`config.env` and heroku:
```
DATABASE_URL={url of heroku postgres database}
COOKIE_PASSWORD={ random cookie password minimum 32 characters}
```

`config-test.env`
```
DATABASE_URL=postgres://{username here e.g.mike}:@localhost:5432/hapi_handlebars_articles_test
COOKIE_PASSWORD={ random cookie password minimum 32 characters}
```

`travis` (make sure that the name of the database (at the end) matches the name of the database created in `.travis.yml` file)
```
DATABASE_URL=postgres://postgres@localhost:5432/hapi_handlebars_articles_test
COOKIE_PASSWORD={ random cookie password minimum 32 characters}
```

- Tests in this app involve database so you need to create a local postgres database and run it using for example the Postgres elephant app, the process is explained below.


## Learnings

### PostgresSQL - connection idling

You can specify how long a client is allowed to remain idle before being closed:

```javascript
idleTimeoutMillis: 1000
```

### Heroku env variables

```
DATABASE_URL={url of heroku postgres database}
COOKIE_PASSWORD={ random cookie password minimum 32 characters}
```

### Travis setup

make sure that the name of the database (at the end) matches the name of the database created in `.travis.yml` file - see below for further info.
```
DATABASE_URL=postgres://postgres@localhost:5432/hapi_handlebars_articles_test
COOKIE_PASSWORD={ random cookie password minimum 32 characters}
```

### Setup PostgreSQL database on Heroku

1. create heroku app and push it to Heroku
```
heroku create app-name-here --region eu
git push heroku master
```

1. create database in heroku dashboard or use heroku cli
```
heroku addons:create heroku-postgresql:hobby-dev
```
https://elements.heroku.com/addons/heroku-postgresql

https://devcenter.heroku.com/articles/heroku-postgresql#create-a-new-database

1. try accessing database from command line using psql
```
psql databaseUrlhere (can be found in app settings on heroku)
```
https://devcenter.heroku.com/articles/heroku-postgresql#pg-psql

1. Set up back end to connect to Heroku database (this is done in the `db_connect.js` file in this project)
https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js

### Setting up local postgreSQL database for testing

- Setting up a test database:
1. Open Postgres elephant app
1. run `psql` in the terminal
1. create a test database: `CREATE DATABASE hapi_handlebars_articles_test;`
1. connect to database `\c hapi_handlebars_articles_test`
1. run build script `\i ./database_build/db_build.sql`
1. Create a config-test.env and add the test DATABASE_URL to this file (don't forget to add this file to .gitignore)
1. set environmental variable to test, under scripts in package.json add the following:

Note: postgres elephant app needs to be running to run the tests, but you don't need to be connected to database using the psql module.

```
"pretest": "NODE_ENV=test node database-build/db-build.js",
"test": "NODE_ENV=test tape test/index.test.js | tap-spec",
```

1. Setup config-test.env file:
```
DATABASE_URL=postgres://piotr:@localhost:5432/hapi_handlebars_articles_test

1. Add the following to db_connect.js:

```javascript
const environment = require('env2');

if (process.env.NODE_ENV === 'test') {
  environment('config-test.env');
} else {
  environment('config.env');
}
```



### Setting up travis with its own local postgreSQL database for testing

* Instruct travis to set up local database on its servers

```
before_script:
  - "psql -c 'create database hapi_handlebars_articles_test;' -U postgres"
  - "psql -U postgres -d hapi_handlebars_articles_test -a -f database-build/db-build.sql"
```

* Go to repo settings on travis and add environmental variable
```
DATABASE_URL=postgres://postgres@localhost:5432/hapi_handlebars_articles_test
```

### Setting up travis with bcrypt

- Normally you would just type `npm install bcrypt`. However, people on Linux (especially Ubuntu and Debian) might get an error because bcrypt needs to be compiled and the compiler and the relative utilities are missing. To fix this on a linux machine, type `sudo apt-get install build-essential`. Only after that type `npm install bcrypt`. Now it should work.

Travis is also a linux machine and requires a C++ compiler for using bcrypt, so make sure to include this in your travis.yml file.

```
language: node_js
node_js:
  - '6.9.5'
script:
  -  "npm run coverage"
env:
  - CXX=g++-4.8
addons:
  apt:
    sources:
    - ubuntu-toolchain-r-test
    packages:
    - gcc-4.8
    - g++-4.8
  # postgres: "9.4"

after_success:
  - ./node_modules/.bin/codecov -e TRAVIS_NODE_VERSION -f coverage/coverage.json
```


### psql commands
```
# list tables / relations
\d
```


### Instqalling pgAdmin on Mac
https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx
https://www.youtube.com/watch?v=MNQRi9N0Tn4


