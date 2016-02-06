import {FeigntsClient} from './api';

export interface TConstructor<T> {
  new() : T;
}

export default class FeigntsBuilder {
  private _client : FeigntsClient;

  client(client : FeigntsClient) {
    this._client = client;
    return this;
  }

  target<T>(clazz : TConstructor<T>, url : string) : T {
    let instance = new clazz();
    (instance as any)._feigntsClient = this._client;
    (instance as any)._feigntsUrl = url;
    return instance;
  }
}