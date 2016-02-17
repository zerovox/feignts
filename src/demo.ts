import {Feignts, RequestLine, FetchClient, FetchClientResponse} from "./index";

interface IContributor {
  login: string;
  contributions: number;
}

class GitHub {
  @RequestLine("GET /repos/{owner}/{repo}/contributors")
  contributors(owner: string, repo: string): Promise<IContributor[]> {
    return FetchClientResponse();
  }
}

let github: GitHub = Feignts.builder()
  .client(new FetchClient())
  .target(GitHub, "https://api.github.com");

github.contributors("zerovox", "feignts")
  .then(contributors => console.log(contributors));
