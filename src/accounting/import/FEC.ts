// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  getDefaultHeaders
} from "../../constants";

export interface ISendFECOptions extends IDefaultHeaderOptions {
  exerciceId: number;
  filename: string;

  /**
   * 0 = Verification.
   *
   * 1 = No verification.
   *
   * 2 = Delete and import.
   */
  type: 0 | 1 | 2;
  body: Buffer | string;
}

export async function FEC(options: ISendFECOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/fec", BASE_API_URL);
  endpoint.searchParams.set("exercice_id", String(options.exerciceId));
  endpoint.searchParams.set("filename", options.filename);
  endpoint.searchParams.set("type", String(options.type));

  const { data } = await httpie.post<{status: string}>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/octet-stream"
    },
    body: options.body
  });

  return data;
}

