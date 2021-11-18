// Import Internal Dependencies
import * as secret from "./authenticate/secret";

export const BASE_AUTH_URL = "https://app.myunisoft.fr/";
export const BASE_API_URL = "https://app.myunisoft.fr/";

export const enumInvoiceType = Object.freeze({
  Achat: "1",
  Frais: "2",
  Vente: "3",
  Avoir: "4"
});

/**
 * @description Default interface for all requests options
 */
export interface IDefaultHeaderOptions {
  /** API Bearer Token */
  accessToken: string;

  /** Company (dossier de production) id */
  societyId?: string | number;

  contentType?: "application/octect" | "application/json" | "application/octet-stream";
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

export function setSearchParams(url: URL, options: any, params: string[] = []) {
  const excludeParams = new Set(params);
  for (const option in options) {
    if (!excludeParams.has(option)) {
      url.searchParams.set(option, typeof options[option] === "object" ? JSON.stringify(options[option]) : options[option]);
    }
  }

  return;
}
