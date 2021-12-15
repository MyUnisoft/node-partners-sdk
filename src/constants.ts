// Import Internal Dependencies
import { isFirmAccess } from "./authenticate/access_type";
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

export function setSearchParams(url: URL, options: any, customParams: any = {}) {
  if (typeof customParams !== "object" || Array.isArray(customParams)) {
    return new Error("customParams must be an object.");
  }

  // eslint-disable-next-line guard-for-in
  for (const option in options) {
    if (option in customParams && !customParams[option]) {
      continue;
    }

    url.searchParams.set(
      customParams[option] || option,
      typeof options[option] === "object" ? JSON.stringify(options[option]) : options[option]
    );
  }

  // eslint-disable-next-line consistent-return
  return;
}


// CHECK ACCES TYPE
export function firmAccessThrowWithoutSociety(header: IDefaultHeaderOptions) {
  return isFirmAccess() && !("societyId" in header) ? new Error("SocietyId is missing in the header.") : undefined;
}

export function throwIfIsNotFirm() {
  return isFirmAccess() ? undefined : new Error("This endpoint only works with a cabinet (firm) access.");
}
