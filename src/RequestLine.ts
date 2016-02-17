import * as uriTemplates from "uri-templates";
import {IFeigntsClient} from "./api";

export default function (requestLine: string) {
  let parts = requestLine.split(" ");

  if (parts.length > 2) {
    throw new Error("RequestLine not parsable: " + requestLine);
  }

  let method = parts.length === 2 ? parts[0] : "GET";
  let uriTemplate = uriTemplates(parts[parts.length - 1]);

  return (target: any, propertyKey: any, descriptor: any) => {
    let args = getArgs(descriptor.value);

    descriptor.value = function(...fnArguments : any[]) {
      if (!this._feigntsClient) {
        throw new Error("Method should have been instrumented by Feignts, "
          + "did you pass this class to the target function of a Feignts builder?");
      }

      let urlParams : {[index : string] : string} = {};
      for (let i = 0; i < args.length; i++) {
        urlParams[args[i]] = fnArguments[i];
      }

      let queryUrl = this._feigntsUrl + uriTemplate.fillFromObject(urlParams);

      // TODO : Fill body with @Body templates (how do I access that from here?)
      return (this._feigntsClient as IFeigntsClient).execute(queryUrl, {method});
    };

    return descriptor;
  };
}

// From https://davidwalsh.name/javascript-arguments
// MIT Licensed
function getArgs(func : Function) {
  // First match everything inside the function argument parens.
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  // Split the arguments string into an array comma delimited.
  return args.split(",").map(function(arg : string) {
    // Ensure no inline comments are parsed and trim the whitespace.
    return arg.replace(/\/\*.*\*\//, "").trim();
  }).filter(function(arg : string) {
    // Ensure no undefined values are added.
    return !!arg;
  });
}
