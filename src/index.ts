// Import Third-party Dependencies
// import * as httpie from "@myunisoft/httpie";

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

export * as auth from "./authenticate/index";
export * as compta from "./compta/index";
