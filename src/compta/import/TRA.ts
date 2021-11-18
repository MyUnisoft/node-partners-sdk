// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { IDefaultOptions, setDefaultHeaderOptions } from "../../constants";

export interface ISendTRAOptions extends IDefaultOptions {
  body: Buffer | string;
}

export async function sendTRA(options: ISendTRAOptions) {
  const endpoint = new URL("/api/v1/TRA/partial");

  options.header.contentType = "application/octet-stream";

  const { data } = await httpie.get<{status: string}>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

