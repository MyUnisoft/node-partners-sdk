// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { BearerToken } from "@myunisoft/tsd";

// Import Internal Dependencies
import { BASE_AUTH_URL } from "../constants";
import { getters } from "../index";

export interface IUserAuthenticateOptions {
  mail: string;
  password: string;
  firm?: string | number;
}

export interface IUserAuthenticateResponse {
  status: string;
  policy: string;
  firm: {
    id: number;
    label: string;
  }
  details: BearerToken
}

export async function authenticate(options: IUserAuthenticateOptions): Promise<IUserAuthenticateResponse> {
  const endpoint = new URL("/api/authenticate", BASE_AUTH_URL);

  const { data } = await httpie.post<IUserAuthenticateResponse>(endpoint, {
    headers: {
      "X-Third-Party-Secret": getters.secret.get(),
      "Content-Type": "application/json"
    },
    body: options
  });

  return data;
}
