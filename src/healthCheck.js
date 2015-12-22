import Repository from './repository';
import HealthCheckCore from 'health-check-core';

export default class HealthCheck {

  static do(configurations) {
    return new Promise((resolve, reject) => {
      const configuration = {
        fnIsHealthGood: status => {
          return (status.error === null);
        },
        fnName: status => {
          return `${status.configuration.method}:` +
            `${status.configuration.url}`;
        },
        fnErrorMessage: status => {
          return status.error.message;
        }
      };

      HealthCheckCore.do(configurations, Repository.test, configuration)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

HealthCheck.do({
  url: 'htp://globo.com',
  method: 'GET',
  expectedStatusCode: 300
}).then(r => console.log(r)).catch(r => console.log(r));
