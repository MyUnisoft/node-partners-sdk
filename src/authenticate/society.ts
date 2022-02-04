import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_AUTH_URL, IDefaultHeaderOptions, setDefaultHeaderOptions } from "../constants";
import * as User from "./user";
import { getters } from "../index";

export interface ISocietyAccessOptions {
  mail: string;
  password: string;

  /**
   * ID of the company that will be linked to the APItoken.
   */
  accountingFolderId: number;
}

/**
 * Once your API token is generated,
 * it is no longer necessary to use this function (unless the token has been revoked).
 */
export async function generateKey(options: ISocietyAccessOptions): Promise<any> {
  const { access_token } = (await User.authenticate({
    mail: options.mail,
    password: options.password
  })).details;

  if (!access_token) {
    return new Error("Unable to authenticate user.");
  }

  const headers: IDefaultHeaderOptions = {
    contentType: "application/json",
    accessToken: access_token
  };

  const endpointGrantedFor = new URL("/api/v1/key/granted-for", BASE_AUTH_URL);
  const { data: grantedFor } = await httpie.post<any>(endpointGrantedFor, {
    ...setDefaultHeaderOptions(headers),
    body: {
      secret: getters.secret.get()
    }
  });

  const endpoint = new URL("/api/v1/key/create", BASE_AUTH_URL);
  const { data } = await httpie.post(endpoint, {
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
