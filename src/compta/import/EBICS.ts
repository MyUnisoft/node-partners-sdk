// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { isFirmAccess } from "../../authenticate/access_type";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultOptions,
  setDefaultHeaderOptions,
  setSearchParams
} from "../../constants";

export interface ISendEBICS extends IDefaultOptions {
  params: {
    filename: string;
  };
  body: Buffer | string;
}

export async function sendEBICS(options: ISendEBICS) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/releve_bancaire", BASE_API_URL);
  setSearchParams(endpoint, options.params);
  options.header.contentType = "application/octet-stream";

  const { data } = await httpie.post<{status: string}>(endpoint, {
    ...setDefaultHeaderOptions(options.header),
    body: options.body
  });

  return data;
}
