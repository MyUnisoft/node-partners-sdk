// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, setDefaultHeaderOptions } from "../../constants";

export interface ISendTRAOptions extends IDefaultOptions {
  body: Buffer | string;
}

export async function sendTRA(options: ISendTRAOptions) {
  const endpoint = new URL("/api/v1/TRA/partial", BASE_API_URL);

  options.header.contentType = "application/zip";

  const { data } = await httpie.post<{status: string}>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

