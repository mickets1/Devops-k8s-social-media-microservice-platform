# Auth Microservice

This is an authentication microservice built with Node.js and Express. It uses MongoDB as the database, with Mongoose. The microservice also utilizes environment variables with the dotenv package and provides password hashing and verification with the bcrypt library.


## Table of Contents


* Installation

* Usage

* Endpoints

* Tests



## Installation

To install the required dependencies, run the following command:


yarn install

Create a .env file in the root directory with the following variables:


DB_CONNECTION_STRING=<your_mongodb_connection_string>
PORT=<your_preferred_port>


# Usage

To start the server, run the following command:


npm start

The server will be running at http://localhost:<your_preferred_port>.


Endpoints

The following API endpoints are available:

```

POST /api/register: Register a new user

POST /api/login: Authenticate an existing user

````

