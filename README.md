[![Build Status](https://travis-ci.org/PiotrBerebecki/hapi-handlebars-articles.svg?branch=master)](https://travis-ci.org/PiotrBerebecki/hapi-handlebars-articles)
[![codecov](https://codecov.io/gh/PiotrBerebecki/hapi-handlebars-articles/branch/master/graph/badge.svg)](https://codecov.io/gh/PiotrBerebecki/hapi-handlebars-articles)


## Installation Instructions
- Clone this repository
- Run `npm install`
- Create a `config.env` and `config-test.env` file
- etc ... (To Be Completed once finished)


## Create heroku app in Europe

```sh
heroku create app-name-here --region eu
```

## Schema Diagrams

### user
Column | Type | Modifiers
--- | --- | ---
id | integer | not null default
username | character varying(100) | not null
password | character varying(100) | not null
avatar_url | character varying(100) | not null

### article
Column | Type | Modifiers
--- | --- | ---
id | integer | not null default
user_id | integer | not null
title | character varying(100) | not null
body_text | character varying(2000) | not null
image_url | character varying(100) | not null

## Learnings

### Setup PostgreSQL database on Heroku

1. create heroku app and push it to Heroku

1. create database on heroku or using herok cli
```
heroku addons:create heroku-postgresql:hobby-dev
```
https://elements.heroku.com/addons/heroku-postgresql


https://devcenter.heroku.com/articles/heroku-postgresql#create-a-new-database

1. try accessing database from command line using psql
```
psql databaseUrlhere
```
https://devcenter.heroku.com/articles/heroku-postgresql#pg-psql

```sql
CREATE TABLE movies (
  id       SERIAL PRIMARY KEY,
  title    VARCHAR(100) NOT NULL
);

INSERT INTO movies(title) VALUES
  ('Matrix'),
  ('Terminator')
RETURNING ID;
```

1. Set up back end to connect to Heroku database
https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js

### Setting up local postgreSQL database

- Setting up a test database:
1. Open Postgres elephant app
1. run ```psql``` in the terminal
1. create a test database: ```CREATE DATABASE testDatabaseName;```
1. run ```\c testDatabaseName```
1. run ```\i ./database_build/db_build.sql``` or the path to your sql filter
1. Create a config-test.env and add the test DATABASE_URL to this file (don't forget to add this file to .gitignore)
1. set environmental variable to test, under scripts in package.json add the following: ```"pretest": "NODE_ENV=testing node database_build/db_build.js",
"test": "tape tests/tests.js | tap-spec",```
1. Setup config-test.env file:
```
DATABASE_URL=postgres://piotr:@localhost:5432/app_test

1. Add the following to db_connect.js:

```sh
const environment = require('env2');

if (process.env.NODE_ENV === 'testing') {
  environment('config-test.env');
} else {
  environment('config.env');
}
```


### psql commands
```
# list tables / relations
\d
```


### Setting up travis with a local postgreSQL database

* Instruct travis to set up local database on its servers

```
before_script:
  - "psql -c 'create database app_test;' -U postgres"
  - "psql -U postgres -d app_test -a -f database-build/db-build.sql"
```

* Go to repo settings on travis and add environmental variable
```
DATABASE_URL=postgres://postgres@localhost:5432/app_test
```

### Setting up travis with bcrypt

- Normally you would just type ```npm install bcrypt```. However, people on Linux (especially Ubuntu and Debian) might get an error because bcrypt needs to be compiled and the compiler and the relative utilities are missing. To fix this on a linux machine, type ```sudo apt-get install build-essential```. Only after that type ```npm install bcrypt```. Now it should work.

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
  postgres: "9.4"
after_success:
  - ./node_modules/.bin/codecov -e TRAVIS_NODE_VERSION -f coverage/coverage.json
  ```

### Wireframes tool
[moqup.com](https://app.moqups.com/edit/page/ad64222d5)
