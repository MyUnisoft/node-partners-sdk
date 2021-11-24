import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_AUTH_URL, IDefaultHeaderOptions, setDefaultHeaderOptions } from "../constants";
import * as User from "./user";
import * as secret from "./secret";

export interface ISocietyAccessOptions {
  mail: string;
  password: string;
  target: string;
}

/**
 * À noter qu’une fois votre API token généré il n’est plus nécessaire d'utiliser cette fonction
 * (sauf si le token a entre-temps été revoqué).
 */
export async function generateKey(options: ISocietyAccessOptions): Promise<any> {
  const { access_token } = (await User.authenticate({
    mail: options.mail,
    password: options.password
  })).details;

  if (!access_token) {
    return new Error("Invalid user.");
  }

  const headers: IDefaultHeaderOptions = {
    contentType: "application/json",
    accessToken: access_token
  };

  const endpointGrantedFor = new URL("/api/v1/key/granted-for", BASE_AUTH_URL);
  const { grantedFor } = (await httpie.post<any>(endpointGrantedFor, {
    ...setDefaultHeaderOptions(headers),
    body: { secret: secret.get() }
  })).data;

  const endpoint = new URL("/api/v1/key/create", BASE_AUTH_URL);
  const { data } = await httpie.post(endpoint, {
    ...setDefaultHeaderOptions(headers),
    body: {
      grantedFor,
      target: options.target
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
