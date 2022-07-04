// Import Node.js Dependencies
import { ReadStream } from "fs";

// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, getDefaultHeaders, rateLimitChecker } from "../../constants";

export interface ISendTRAOptions extends IDefaultHeaderOptions {
  body: Buffer | ReadableStream | ReadStream;
}

export async function TRA(options: ISendTRAOptions) {
  const endpoint = new URL("/api/v1/TRA/partial", BASE_API_URL);

  const { data } = await httpie.post<{status: string}>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/octet-stream"
    },
    limit: rateLimitChecker(options.accessToken),
    body: options.body
  });

  return data;
}
