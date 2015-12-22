import request from 'request-promise';

export default class Repository {

  static test(configuration) {
    return new Promise(resolve => {
      var options = {
        method: configuration.method,
        uri: configuration.url,
        json: true,
        resolveWithFullResponse: true
      };

      request(options)
        .then(result => {
          if (result.statusCode === (configuration.expectedStatusCode || 200)) {
            resolve({
              configuration: configuration,
              error: null
            });
          } else {
            resolve({
              configuration: configuration,
              error: {
                message: `Return with status code ${result.statusCode }` +
                ` and expected ${configuration.expectedStatusCode || 200}`
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
          resolve({
            configuration: configuration,
            error: error
          });
        });
    });
  }
}
