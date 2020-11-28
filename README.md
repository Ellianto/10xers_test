# 10xers Demo Project  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and created as an assessment entry for the 10xers assessment test. It uses the Bootstrap UI Framework Components sourced from ```react-bootstrap``` library.  

The built project is hosted with Firebase Hosting [here](https://xers-demo.web.app/).  


## Building the app  

To build the app, make sure to install all the dependencies with the following command at the root folder  

```
npm install  
```

Then run the ```npm run build``` command to generate a build folder  

```
npm run build  
```

If you want to serve the built project, you can use the ```serve``` library to do it  

```
npm install -g serve  
serve -s build  
```

## Running Unit Tests
The unit tests are built with ```@testing-library/react``` and the test files are right alongside the components in the ```/src/components/``` directory.  

To run the tests, after running ```npm install``` command,  you can execute the ```npm run test``` command at the root folder.

```
npm run test
```