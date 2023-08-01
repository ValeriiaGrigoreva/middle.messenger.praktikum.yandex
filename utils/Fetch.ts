const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
// function queryStringify(data) {
//     let result = '?'
//     for (key in data) {
//       result += key + '=' + data[key] + '&'
//     }

//     return result.slice(0, result.length - 1)
// }

type Options = {
  timeout?: number,
  method?: string,
  data?: any,
  headers?: object
}
// eslint-disable-next-line
export class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint: string) {
      this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    get = (url: string, options: Options = {}) => {      
      return this.request(this.endpoint + url, {...options, method: METHODS.GET}, options.timeout);
    };
    
    post = (url: string, options: Options = {}) => {
            return this.request(this.endpoint + url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options: Options = {}) => {
            return this.request(this.endpoint + url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url: string, options: Options = {}) => { 
            return this.request(this.endpoint + url, {...options, method: METHODS.DELETE}, options.timeout);
    };


    request = (url: string, options: Options = {}, timeout = 5000) => {
        const {method, data, headers ={}} = options;
      
        return new Promise((resolve, reject) => {
          
          const xhr = new XMLHttpRequest();
          // if(method === METHODS.GET && data) {
          //   url += queryStringify(data)
          // }
          if (method) {
            xhr.open(method, url);
          }
          for (let key in headers) {
            xhr.setRequestHeader(key, headers[key as keyof typeof headers]);
          }
          
          xhr.timeout = timeout;

          xhr.onreadystatechange = () => {

            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status < 400) {
                resolve(xhr.response);
              } else {
                reject(xhr.response);
              }
            }
          };

          // xhr.onload = function() {
          //   resolve(xhr);
          // };

          xhr.onabort = () => reject({reason: 'abort'});
          xhr.onerror = () => reject({reason: 'network error'});
          xhr.ontimeout = () => reject({reason: 'timeout'});

          xhr.withCredentials = true;
          xhr.responseType = 'json';
          
          if (!(data instanceof FormData)) {
            xhr.setRequestHeader('Content-Type', 'application/json');
          }
          
          

          if (method === METHODS.GET || !data) {
            xhr.send();
          } else {
            if (data instanceof FormData) {
              xhr.send(data);
            } else {
              xhr.send(JSON.stringify(data));
            }
          }
        });
    };
  }
