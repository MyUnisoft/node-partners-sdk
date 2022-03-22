// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, getDefaultHeaders } from "../../constants";

export interface IGetFECEntriesOptions extends IDefaultHeaderOptions {
  /** Format: YYYY-MM-DD */
  from: string;

  /** Format: YYYY-MM-DD */
  to: string;
  body: Buffer | string;
}

export async function getPartialFEC(options: IGetFECEntriesOptions) {
  const endpoint = new URL("/api/v1/export/fec", BASE_API_URL);
  endpoint.searchParams.set("export_type", "1");
  endpoint.searchParams.set("from", options.from);
  endpoint.searchParams.set("to", options.to);


  const { data } = await httpie.post<{status: string}>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "text/plain"
    },
    body: options.body
  });

  return data;
}

export interface IGetFEC extends IDefaultHeaderOptions {
  exerciceId: number;
  body: Buffer | string;
}

export async function getFEC(options: IGetFEC) {
  const endpoint = new URL("/api/v1/export/fec", BASE_API_URL);
  endpoint.searchParams.set("export_type", "0");
  endpoint.searchParams.set("exercice_id", String(options.exerciceId));

  const { data } = await httpie.post<{status: string}>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "text/plain"
    },
    body: options.body
  });

  return data;
}
