// Import Internal Dependencies
import * as secret from "./authenticate/secret";

export const BASE_AUTH_URL = "https://app.myunisoft.fr/";
export const BASE_API_URL = "https://app.myunisoft.fr/";

/**
 * @description Default interface for all requests options
 */
export interface IDefaultHeaderOptions {
  /** API Bearer Token */
  accessToken: string;

  /** Company (dossier de production) id */
  societyId?: string | number;

  contentType?: "application/octect" | "application/json"
}

export interface IDefaultOptions {
  header: IDefaultHeaderOptions
}

/**
 * @description Default httpie options with all required headers
 */
export function setDefaultHeaderOptions(options: IDefaultHeaderOptions) {
  const headers = {
    "X-Third-Party-Secret": secret.get()
  };

  if ("societyId" in options) {
    headers["society-id"] = options.societyId;
  }

  if ("contentType" in options) {
    headers["Content-Type"] = options.contentType;
  }

  return {
    authorization: options.accessToken,
    headers
  };
}

// export function setSearchParams(url: URL, options: any, params: string[]) {
//   for (const param of params) {
//     if (param in options) {
//       if (typeof options[param] === "object") {
//         options[param] = JSON.stringify(options[param]);
//       }
//       url.searchParams.set(param, options[param]);
//     }
//   }

//   return;
// }

export function setSearchParams(url: URL, options: any, excludeParams?: string[]) {
  for (const option in options) {
    if (option in options && !excludeParams?.includes(option)) {
      if (typeof options[option] === "object") {
        options[option] = JSON.stringify(options[option]);
      }
      url.searchParams.set(option, options[option]);
    }
  }

  return;
}
