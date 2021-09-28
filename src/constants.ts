// Import Internal Dependencies
import * as secret from "./authenticate/secret";

export const BASE_AUTH_URL = "https://app.myunisoft.fr/";
export const BASE_API_URL = "https://app.myunisoft.fr/";

/**
 * @description Default interface for all requests options
 */
export interface IDefaultOptions {
  /** API Bearer Token */
  accessToken: string;

  /** Company (dossier de production) id */
  societyId?: string | number;
}

/**
 * @description Default httpie options with all required headers
 */
export function getDefaultOptions(options: IDefaultOptions) {
  const headers = {
    "X-Third-Party-Secret": secret.get()
  };
  if ("societyId" in options) {
    headers["society-id"] = options.societyId;
  }

  return {
    authorization: options.accessToken,
    headers
  };
}
