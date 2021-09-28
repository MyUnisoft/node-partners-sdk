// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import * as secret from "./authenticate/secret";

// const myun: httpie.CustomHttpAgent = {
//   customPath: "myun",
//   domains: new Set([
//     "yoda.myunisoft.fr",
//     "app.myunisoft.fr"
//   ]),
//   agent: new httpie.Agent({
//     connections: 100
//   }),
//   prod: "https://app.myunisoft.fr",
//   preprod: "https://yoda.myunisoft.fr",
//   dev: "https://yoda.myunisoft.fr"
// };

// httpie.agents.add(myun);

export interface IConfigureOptions {
  /** Name to use for the http 'user-agent' header */
  userAgent: string;

  /** The secret key provided by the MyUnisoft team for the 'X-Third-Party-Secret' header */
  secretKey: string;
}

export function configure(options: IConfigureOptions) {
  secret.set(options.secretKey);

  httpie.DEFAULT_HEADER["user-agent"] = options.userAgent;
}

export * as auth from "./authenticate/index";
export * as compta from "./compta/index";
