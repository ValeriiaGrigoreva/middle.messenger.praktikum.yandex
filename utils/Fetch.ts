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

interface Options {
  timeout?: number,
  method?: string,
  data?: any,
  headers?: object
}

class HTTPTransport {
    get = (url, options: Options = {}) => {      
      return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };
    
    post = (url, options: Options = {}) => {
            return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url, options: Options = {}) => {
            return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url, options: Options = {}) => { 
            return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };


    request = (url, options: Options = {}, timeout = 5000) => {
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
            xhr.setRequestHeader(key, headers[key]);
          }
          
          xhr.timeout = timeout;

          xhr.onload = function() {
            resolve(xhr);
          };

          xhr.onabort = reject;
          xhr.onerror = reject;
          xhr.ontimeout = reject;
          
          

          if (method === METHODS.GET || !data) {
            xhr.send();
          } else {
            xhr.send(data);
          }
        });
    };
}
