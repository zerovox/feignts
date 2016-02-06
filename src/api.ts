export interface FeigntsClient {
  execute(url : string, payload? : RequestInit) : Promise<any>
}
