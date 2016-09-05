# Express-Base

[![Build Status](https://travis-ci.org/santiperez/base-express.svg?branch=master)](https://travis-ci.org/santiperez/base-express)
[![dependencies Status](https://david-dm.org/santiperez/base-express/status.svg)](https://david-dm.org/santiperez/base-express)
[![devDependencies Status](https://david-dm.org/santiperez/base-express/dev-status.svg)](https://david-dm.org/santiperez/base-express?type=dev)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This repository serves as a starting point for create APIs with Node.js and Express.js based on TDD development methodology. 

It provides a simple and solid structure on which to build on. Clone it and you are ready to go.

## Structure

It is important not only know the structure of your files and folders, but also what each file is responsible for and what it should know about the outside world.

Let’s see what files and folders there are at the root of the project with a brief explanation of what each of them is about:  

```
├── config/ Contains configuration for each enviroment  
│   ├── certificates/ Contains SSL certificates if are required  
├── logs/ Contains the logs  
├── src/  Contains the source code of the whole app  
│   ├── helpers/ Code and functionality to be shared by different parts of the project  
│   ├── middlewares/  Express middlewares which process the incoming  requests before handling them down to the routes  
│   ├── models/  Represents data, implements business logic and handles storage  
│   ├── public/  Contains all static files like images, styles and javascript  
│   │   ├── swagger/ Contains Swagger  
│   ├── routes/  Defines your app routes and their logic  
│   │   ├── index.js Configures all the routes  
│   ├── tools/ Three part applications, tools and libraries  
│   ├── cluster.js  Configures the cluster module to easily create child processes that share server ports  
│   ├── index.js Initializes the app and glues everything together  
│   ├── server.js Configures and inits Express.js  
│   ├── package.json  Contains all packages that your app depends on and their version, scripts...  
├── test/  Contains all the tests  
│   ├── acceptances/ Test the system as a whole  
│   ├── unit/ Test individual units of code in isolation   
```
## Requirements

**node version**: ^6.x.x  
**npm version**: ^3.x.x  

## NPM Scripts

**start:xxxxx**: Starts the application with according the xxxxx configuration. Check package.json for more details.  
**test**: Runs the unit tests.  
**acceptances**: Runs the acceptances tests.  
**coverage**: Runs the acceptances and unit tests and creates a coverage report with Istanbul.  
**lint**: Lints the /src and /test folders.  
**lint:fix**: Fixes linting errors of the /src and /test folders.  
**security**: Finds vulnerabilities.  
**check**: Runs coverage task, lints code, checks for npm updates and security.  

##Usage

Set the environment variable **NODE\_CONFIG\_DIR** for the configuration folder path.   

Only for dev purposes you can set the enviroment variable as follows:  

process.env.NODE\_CONFIG\_DIR = path.join(__dirname, '..', 'config');  

The configuration data needs to be versioned separately to the source code. If not, a change of configuration leads to a new application build, and this is just plain wrong. Notice that for production you should add the config folder to .gitignore.  

##Basic configuration example

**workers**: Number of workers to start the application.  
**logger**: Contains the different transports for the winston logger. For log rotate in Files set transport.config.rotate to true (take a look at uat, and production configuration files).  
**test**: Tests configuration. Sets the url an path for Instanbul coverage reports.  
**swagger**: Swagger configuration. Sets the url an path for API documentation.

```json
{
  "workers": 1,
  "api": {
    "protocol":"http",
    "domain":"localhost",
    "port": 3000,
    "baseUrl": "/api/v1",
    "version": "0.0.1",
    "routesFolder": "./src/routes",
    "name": "Express Base"
  },
  "logger": {
    "transports": [
      {
        "config": {
          "type": "transports.Console"
        },
        "options": {
          "level": "debug",
          "colorize": true
        }
      }
    ]
  },
  "test":{
    "reports":{
      "url":"/coverage",
      "path":"./src/public/coverage/lcov-report"
    }
  },
  "swagger":{
    "url":"/swagger",
    "path":"./src/public/swagger"
  }
}
```

## Third-Party Libraries

These are some the development dependencies used in this project

### Testing
https://github.com/chaijs/chai  
https://github.com/mochajs/mocha  
https://github.com/visionmedia/supertest  
https://github.com/jhnns/rewire  

###Reporting
https://github.com/gotwarlost/istanbul

###Documentation
https://github.com/fliptoo/swagger-express

### Logging
https://github.com/winstonjs/winston  
https://github.com/winstonjs/winston-daily-rotate-file  

### Monitor
https://github.com/remy/nodemon  

### Linter
https://github.com/eslint/eslint  

### Configuration
https://github.com/lorenwest/node-config  

### GIT Hooks
https://github.com/observing/pre-commit  

### Security
https://github.com/nodesecurity/nsp  
https://github.com/helmetjs/helmet  