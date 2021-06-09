# Ardalo Digital Platform Footer Service
![Build Status](https://github.com/ardalo/footer-service/workflows/Build/badge.svg)
[![Code Coverage](https://sonarcloud.io/api/project_badges/measure?project=ardalo_footer-service&metric=coverage)](https://sonarcloud.io/dashboard?id=ardalo_footer-service)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ardalo_footer-service&metric=ncloc)](https://sonarcloud.io/dashboard?id=ardalo_footer-service)

Provides the footer for all public pages of the Ardalo Digital Platform.

## Tech Info
__NodeJS Service based on Typescript and NestJS with fastify__
* npm
* Testing: Jest
* Metrics: Prometheus
* API Documentation: Swagger UI
* Access and Application Logs in JSON format
* Static Code Analysis via SonarCloud
* Docker
* CI/CD: GitHub Actions

## Quick Start
* Run via Docker using `docker compose` and find API docs at http://localhost:8082/apidoc
  ```console
  $ docker compose build && docker compose up
  ```
* Install dependencies
  ```console
  $ npm install
  ```
* Start application via `npm` and find API docs at http://localhost:8082/apidoc
  ```console
  $ npm run start:dev
  ```
* Run all tests
  ```console
  $ npm run test
  ```
* Generate Code Coverage Report. HTML Report can be found in `./coverage/index.html`
  ```console
  $ npm run test:cov
  ```

## API Documentation
Swagger UI is accessible via `/apidoc`
