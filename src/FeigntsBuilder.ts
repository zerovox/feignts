import {IFeigntsClient} from "./api";

export interface IConstructor<T> {
  new(): T;
}

export default class FeigntsBuilder {
  private _client : IFeigntsClient;

  public client(client: IFeigntsClient) {
    this._client = client;
    return this;
  }

  public target<T>(clazz: IConstructor<T>, url: string) : T {
    let instance = new clazz();
    (instance as any)._feigntsClient = this._client;
    (instance as any)._feigntsUrl = url;
    return instance;
  }
}
