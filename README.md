# Blog API Project

## Pre-requisited
DB Schema (db.sql)

Mysql Database install or Docker

To start mysql using docker

    docker compose up docker-compose.yml -d

    open http://localhost:8080
    login using root/root

    execute db.sql


## Install and build

    npm install
    npm run build

## Start locally

    npm start

## To run serverless offline
    
    npm install -g serverless
    sls offline start

## To create a package for deployment
This will create a zip file that will be ready to deployed

    sls package


## Test using http remote client
All endpoints are availble in blog.http
