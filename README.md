# Ardalo Digital Platform Footer Service
![Build Status](https://github.com/ardalo/footer-service/workflows/Build/badge.svg)
[![Code Coverage](https://sonarcloud.io/api/project_badges/measure?project=ardalo_footer-service&metric=coverage)](https://sonarcloud.io/dashboard?id=ardalo_footer-service)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ardalo_footer-service&metric=ncloc)](https://sonarcloud.io/dashboard?id=ardalo_footer-service)

Provides the footer for all public pages of the Ardalo Digital Platform.

## Tech Info
__NodeJS Service based on NestJS and Typescript__
* NodeJS
* NestJS with fastify
* Typescript
* npm
* Jest
* Prometheus Metrics
* Static Code Analysis via SonarCloud
* Docker
* CI/CD: GitHub Actions

## Quick Start
* Install dependencies
  ```console
  $ npm install
  ```
* Start application
  ```console
  $ npm run start
  ```
* Run all tests
  ```console
  $ npm run test
  ```
* Generate Code Coverage Report. HTML Report can be found in `./coverage/index.html`
  ```console
  $ npm run test:cov
  ```
* Run via Docker using `docker-compose` and find API docs at `http://localhost:8082/`
  ```console
  $ docker-compose build && docker-compose up
  ```
