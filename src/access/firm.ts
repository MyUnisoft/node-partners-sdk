// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import * as constants from "../constants";
import { getters } from "../index";

export interface IFirmAuthenticateOptions {
  mail: string;
  password: string;

  /** Entity/Schema/Firm id or name. Required if the account is linked to multiple entities */
  firm?: string | number;
}

export interface IFirmAuthenticateResponse {
  api_token: string;
  expiresIn: string;
  firm: {
    id: number;
    label: string;
  }
}

export async function authenticate(options: IFirmAuthenticateOptions): Promise<IFirmAuthenticateResponse> {
  const endpoint = new URL("/api/authenticate/firm", constants.BASE_AUTH_URL);

  const { data } = await httpie.post<any>(endpoint, {
    body: options
  });
  if (data.status === "firm-selection") {
    throw new Error("You must select a firm to authenticate");
  }

  getters.accessType.set("firm");

  return data as IFirmAuthenticateResponse;
}
