# Express-Base

[![Build Status](https://travis-ci.org/santiperez/base-express.svg?branch=master)](https://travis-ci.org/santiperez/base-express)

This repository serves as a starting point for create applications with Node.js and Express.js.

It provides a simple and solid structure on which to build on. Clone it and you are ready to go.

## Structure

It is important not only know the structure of your files and folders, but also what each file is responsible for and what it should know about the outside world.

Let’s see what files and folders there are at the root of the project with a brief explanation of what each of them is about:  

```
├── config/ Contains configuration for each enviroment  
├── logs/ Contains the logs  
├── src/  Contains the source code of the whole app  
│   ├── helpers/ Code and functionality to be shared by different parts of the project  
│   ├── middlewares/  Express middlewares which process the incoming  requests before handling them down to the routes  
│   ├── models/  Represents data, implements business logic and handles storage  
│   ├── routes/  Defines your app routes and their logic  
│   │   ├── index.js Configures all the routes  
│   ├── tools/ Three part applications, tools and libraries  
│   ├── cluster.js  Configures the cluster module to easily create child processes that share server ports  
│   ├── index.js Initializes the app and glues everything together  
│   ├── server.js Configures and inits Express.js  
│   ├── package.json  Contains all packages that your app depends on and their version, scripts...  
├── test/  Contains the all the tests  
│   ├── acceptances/ Test the system as a whole  
│   ├── unit/ Test individual units of code in isolation   
```

## Development Dependencies

This are some the development dependencies used in this project

### Testing
https://github.com/chaijs/chai  
https://github.com/mochajs/mocha  
https://github.com/visionmedia/supertest  
https://github.com/jhnns/rewire  

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

## Requirements

**node version**: ^6.x.x  
**npm version**: ^3.x.x  

## NPM Scripts

**start**: Starts the application with the development configuration.  
**start:uat**: Starts the application with the uat configuration.  
**start:production**: Starts the application with the production configuration.  
**test**: Runs the unit tests.  
**acceptances**: Runs the acceptances tests.  
**lint**: Lints the /src and /test folders.  
**lint:fix**: Fixes linting errors of the /src and /test folders.  
**security**: Finds vulnerabilities.  
**check**: Runs acceptance and unit tests, lints code, checks for npm updates and security.  

##Usage

Set the environment variable **NODE\_CONFIG\_DIR** for the configuration folder path.   

Only for dev purposes you can set the enviroment variable as follows:  

process.env.NODE\_CONFIG\_DIR = path.join(__dirname, '..', 'config');  

The configuration data needs to be versioned separately to the source code. If not, a change of configuration leads to a new application build, and this is just plain wrong. Notice that for production you should add the config folder to .gitignore.  

##Basic configuration example

```json
{
  "workers": 1, 
  "api": {
    "port": 3000,
    "baseURL": "/api/v1"
  },
  "logger": {
    "transports": [
      {
        "config": {
          "type": "transports.Console"
        },
        "options": {
          "level": "debug",
          "colorize": true,
          "handleExceptions": true
        }
      }
    ]
  }
}
```

