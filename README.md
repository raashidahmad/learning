# AngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.15.

## Mock API consumer application
This application is the consumer and a tester for the mock API server being built in the same application. You might run the API server
using `npm run server` command. As of the current configuration the application is listening on port 3000, however, this port can be changed using the package code.

## Notes about the server
Markup: 
  * The Mock API is an angular based application that will use different packages to develop
  a mock API based on the json file. The json file will be created and maintained by writing the script.

  * The schema of the json database will grow and be refined as the progress is being made.

  * Initially a basic schema will be setup for the simple data and it will be refined as learned more about the schema

  * It is intended to create the data using some mock package

  * The plan is to test the apis here before handing it over to the UI team

  * The default port for json-server is 3000, we can change it in the package code
 

  ##Important: 
  _Node version: 12.9.1_
  _Angular Cli Version: 11.2.15_

  ##How to use application:
  * First run the server using this command (npm run server), you will be able to access the server at http://localhost:3000.
  You will see the help on the given Url
  * The second part of this application is angular application that provides help about the structure of the schema. Run it using (npm run start). You can access it at http://localhost:4200 
