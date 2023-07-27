import { HTTPTransport } from '../../utils/Fetch';

export abstract class API {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}
