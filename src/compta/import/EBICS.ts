// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultOptions,
  setDefaultHeaderOptions,
  setSearchParams,
  throwIfIsNotFirm
} from "../../constants";

export interface ISendEBICS extends IDefaultOptions {
  params: {
    filename: string;
  };
  body: Buffer | string;
}

export async function sendEBICS(options: ISendEBICS) {
  throwIfIsNotFirm();
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
