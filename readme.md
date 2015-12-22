# Health Check API

## CI
[![Circle CI](https://circleci.com/gh/LucasRodrigues/health-check-api.svg?style=svg)](https://circleci.com/gh/LucasRodrigues/health-check-api)

## Install

```
$ npm install health-check-api
```

## Usage

### Code

```js
var healthCheckApi = require('health-check-api');

healthCheckApi.do([
{
  url: 'http://validurl.com/good',
  method: 'GET'
  expectedStatusCode: 202
},
{
  url: 'http://validurl2.com/whitoutStatusCode',
  method: 'POST'
},
{
    url: 'http://validurl.com/wrongStatusCode',
    method: 'GET',
    expectedStatusCode: 200
}])
 .then(function(result){
    console.log(result); 
    
    /* 
      { 
        health: false,
        success: 2,
        error: 1,
        details: 
          [ 
            { 
              name: 'http://validurl.com/good', 
              health: true, 
              message: '' 
            },
            { 
              name: 'http://validurl2.com/whitoutStatusCode', 
              health: true, 
              message: '' 
            },
            { 
              name: 'http://validurl.com/wrongStatusCode',
              health: false,
              message: 'Return with status code 500 expected 200' 
            } 
          ] 
      }
    */
 })
 .catch(function(error){
    console.log(error); 
 });
```
