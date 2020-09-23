# Full Stack ASP .Net Core 3.1 and Angular 10.1

This was developed and tested in Linux 5.4.x only.

## 1. Docker

### 1.1 Prerequisite

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- SQL Server Client
  > [SQL Server VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql) or [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15) or any other

### 1.2 Running Application

The following command starts SQL Server 2019, .Net Core API, Angular Webapp, and container for EF Core tool.

```sh
docker-compose up
```

> To view logs of a specific service run `docker-compose logs -f <service_name>` in a different terminal.
> E.g. `docker-compose logs -f api`

### 1.3 DB Initialization

- Create a database

  > Create a database using SQL Server Client

  ```sql
  CREATE DATABASE WorldCities;
  ```

- Updates the DB to the last migration

  > Use `docker-compose exec migrations dotnet ef` command to deal with DB migration

  ```sh
  docker-compose exec migrations dotnet ef database update
  ```

### 1.4 Running Tests

- API Tests

  ```sh
  docker-compose -f docker-compose.tests.yml up api-tests
  ```

- Webapp Tests

  ```sh
  docker-compose -f docker-compose.tests.yml up webapp-tests
  ```

## 2. Local

### 2.1 Prerequisite

- [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
- [EF Core tool 3.1](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet)
- [Node.js 12.x](https://nodejs.org/en/download/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- SQL Server Client
  > [SQL Server VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql) or [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15) or any other

### 2.2 DB Initialization

- Create a database

  > Create a database using SQL Server Client

  ```sql
  CREATE DATABASE WorldCities;
  ```

- Updates the DB to the last migration

  ```sh
  dotnet ef database update
  ```

### 2.3 Running Application

The following command starts .Net Core API and Angular Webapp.

```sh
dotnet watch --project=WorldCities run
```

### 2.4 Running Tests

- API Tests

  ```sh
  dotnet watch --project=WorldCities.Tests test
  ```

- Webapp Tests

  ```sh
  cd WorldCities/ClientApp/
  npm test
  ```
