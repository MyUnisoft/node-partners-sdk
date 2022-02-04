import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_AUTH_URL, IDefaultHeaderOptions, setDefaultHeaderOptions } from "../constants";
import { getters } from "../index";

export interface ISocietyAccessOptions {
  userAccessToken: string;

  /**
   * ID of the company that will be linked to the APItoken.
   */
  accountingFolderId: number;
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
export async function generateKey(options: ISocietyAccessOptions): Promise<SocietyApiToken> {
  const headers: IDefaultHeaderOptions = {
    contentType: "application/json",
    accessToken: options.userAccessToken
  };

  const endpointGrantedFor = new URL("/api/v1/key/granted-for", BASE_AUTH_URL);
  console.log(endpointGrantedFor);

  const { data: grantedFor } = await httpie.post<any>(endpointGrantedFor, {
    ...setDefaultHeaderOptions(headers),
    body: {
      secret: getters.secret.get()
    }
  });

  const endpoint = new URL("/api/v1/key/create", BASE_AUTH_URL);
  const { data } = await httpie.post<SocietyApiToken>(endpoint, {
    ...setDefaultHeaderOptions(headers),
    body: {
      grantedFor,
      target: options.accountingFolderId
    }
  });

  return data;
}

export async function getEndpoints(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/key/info", BASE_AUTH_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}
