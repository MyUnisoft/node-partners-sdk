import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, getDefaultHeaders } from "../constants";
import { getters } from "../index";

export interface IGrantedFor {
  grantedFor: number;
}

export async function getThirdPartyId(options: IDefaultHeaderOptions): Promise<IGrantedFor> {
  const endpoint = new URL("/api/v1/key/granted-for", BASE_API_URL);

  const { data } = await httpie.post<IGrantedFor>(endpoint, {
    authorization: options.accessToken,
    body: {
      secret: getters.secret.get()
    }
  });

  return data;
}

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
  const { grantedFor } = await getThirdPartyId(options);

  const endpoint = new URL("/api/v1/key/create", BASE_API_URL);
  const { data } = await httpie.post<SocietyApiToken>(endpoint, {
    authorization: options.accessToken,
    body: {
      grantedFor: String(grantedFor),
      target: String(options.accountingFolderId)
    }
  });

  return data;
}

export async function getEndpoints(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/key/info", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}
