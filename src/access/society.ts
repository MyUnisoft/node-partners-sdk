import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, getDefaultHeaders } from "../constants";
import { getters } from "../index";

export interface SocietyApiToken {
  id: string;
  target: number;
  grantedBy: number;
  grantedFor: number;
  value: string;
}

/**
 * Once your API token is generated,
 * it is no longer necessary to use this function (unless the token has been revoked).
 */
export async function generateKey(options: Required<IDefaultHeaderOptions>): Promise<SocietyApiToken> {
  const endpoint = new URL("/api/v1/key/create", BASE_API_URL);
  const { data } = await httpie.post<SocietyApiToken>(endpoint, {
    authorization: options.accessToken,
    headers: {
      "X-Third-Party-Secret": getters.secret.get()
    },
    body: {
      target: String(options.accountingFolderId)
    }
  });

  return data;
}

export interface SocietyEndpointsInfo {
  path: string;
  method: string;
}

export async function getEndpoints(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/key/info", BASE_API_URL);

  const { data } = await httpie.get<SocietyEndpointsInfo[]>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}
