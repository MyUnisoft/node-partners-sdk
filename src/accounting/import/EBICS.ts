// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  getDefaultHeaders,
  setSearchParams,
  throwIfIsNotFirm
} from "../../constants";

export interface ISendEBICS extends IDefaultHeaderOptions {
  params: {
    filename: string;
  };
  body: Buffer | string;
}

export async function EBICS(options: ISendEBICS) {
  throwIfIsNotFirm();
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/releve_bancaire", BASE_API_URL);
  setSearchParams(endpoint, options.params);

  const { data } = await httpie.post<{status: string}>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/octet-stream"
    },
    body: options.body
  });

  return data;
}
