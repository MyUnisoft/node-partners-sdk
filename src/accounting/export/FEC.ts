// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
// import { ReadStream } from "fs";

// Import Internal Dependencies
import {
  BASE_API_URL,
  IDefaultHeaderOptions,
  getDefaultHeaders,
  rateLimitChecker
} from "../../constants";

export interface IGetFECEntriesOptions extends IDefaultHeaderOptions {
  /** Format: YYYY-MM-DD */
  from: string;

  /** Format: YYYY-MM-DD */
  to: string;
}

export async function getPartialFEC(options: IGetFECEntriesOptions) {
  const endpoint = new URL("/api/v1/export/fec", BASE_API_URL);
  endpoint.searchParams.set("export_type", "1");
  endpoint.searchParams.set("from", options.from);
  endpoint.searchParams.set("to", options.to);


  const { data } = await httpie.post<string>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/json"
    },
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getPartialFECStream(options: IGetFECEntriesOptions) {
  const endpoint = new URL("/api/v1/export/fec", BASE_API_URL);
  endpoint.searchParams.set("export_type", "1");
  endpoint.searchParams.set("from", options.from);
  endpoint.searchParams.set("to", options.to);


  return await httpie.stream("POST", endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/json"
    }
  });
}

export interface IGetFEC extends IDefaultHeaderOptions {
  exerciceId: number;
}

export async function getFEC(options: IGetFEC) {
  const endpoint = new URL("/api/v1/export/fec", BASE_API_URL);
  endpoint.searchParams.set("export_type", "0");
  endpoint.searchParams.set("exercice_id", String(options.exerciceId));

  const { data } = await httpie.post<string>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/json"
    },
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getFECStream(options: IGetFEC) {
  const endpoint = new URL("/api/v1/export/fec", BASE_API_URL);
  endpoint.searchParams.set("export_type", "0");
  endpoint.searchParams.set("exercice_id", String(options.exerciceId));

  return await httpie.stream("POST", endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/json"
    }
  });
}
