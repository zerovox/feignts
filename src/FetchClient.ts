import {IFeigntsClient} from "./api";

export function FetchClientResponse(): any {
  throw new Error("Method should have been instrumented by Feignts, was it annotated by @RequestLine?");
}

export default class FetchClient implements IFeigntsClient<Promise<any>> {
  public execute(url: string, body?: RequestInit) {
    return fetch(url, body).then(r => r.json());
  }
}
