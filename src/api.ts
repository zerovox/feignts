export interface IFeigntsClient<T> {
  execute(url: string, payload? : RequestInit): T;
}
