// Import Node.js Dependencies
import { IncomingHttpHeaders } from "http";

// Import Internal Dependencies
import { getters } from "./index";

// export const BASE_AUTH_URL = "https://app.myunisoft.fr/";
// export const BASE_API_URL = "https://app.myunisoft.fr/";
export const BASE_AUTH_URL = "https://yoda.myunisoft.fr:1337/";
export const BASE_API_URL = "https://yoda.myunisoft.fr:1367/";

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

  /** Accounting folder (dossier de production) id */
  societyId?: string | number;

  contentType?:
  "text/plain" |
  "application/zip" |
  "application/octect" |
  "application/json" |
  "application/octet-stream" |
  "application/x-www-form-urlencoded";
}

export interface IDefaultOptions {
  header: IDefaultHeaderOptions
}

/**
 * @description Default httpie options with all required headers
 */
export function setDefaultHeaderOptions(options: IDefaultHeaderOptions) {
  const headers: IncomingHttpHeaders = {
    "X-Third-Party-Secret": getters.secret.get(),
    ...("societyId" in options ? { "society-id": String(options.societyId) } : {}),
    ...("contentType" in options ? { "content-type": options.contentType as string } : {})
  };

  return {
    authorization: options.accessToken,
    headers
  };
}

export function setSearchParams(url: URL, options: any, customParams: any = {}) {
  if (typeof customParams !== "object" || Array.isArray(customParams)) {
    return new Error("customParams must be an object.");
  }

  for (const option in options) {
    if (option in customParams && !customParams[option]) {
      continue;
    }

    url.searchParams.set(
      customParams[option] || option,
      typeof options[option] === "object" ? JSON.stringify(options[option]) : options[option]
    );
  }

  return void 0;
}


// CHECK ACCES TYPE
export function firmAccessThrowWithoutSociety(header: IDefaultHeaderOptions) {
  return getters.accessType.is("firm") && !("societyId" in header) ? new Error("SocietyId is missing in the header.") : undefined;
}

export function throwIfIsNotFirm() {
  return getters.accessType.is("firm") ? undefined : new Error("This endpoint only works with a cabinet (firm) access.");
}
