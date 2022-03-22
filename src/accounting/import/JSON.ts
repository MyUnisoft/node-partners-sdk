// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import { BASE_API_URL, firmAccessThrowWithoutSociety, IDefaultHeaderOptions, getDefaultHeaders } from "../../constants";

export interface IEntryOptions extends IDefaultHeaderOptions {
  body: Windev.Entry.NewEntry;
}

export interface IDirectEntryOptions extends IEntryOptions {
  /**
   * E = ecriture
   *
   * O = ocr
   */
  type: "e" | "o";
}

export async function jsonEntry(options: IDirectEntryOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/entry", BASE_API_URL);
  endpoint.searchParams.set("type", options.type);

  const { data } = await httpie.post(endpoint, {
    headers: getDefaultHeaders(options),
    body: options.body
  });

  return data;
}

export async function jsonPendingEntry(options: IEntryOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/entry/temp", BASE_API_URL);

  const { data } = await httpie.post(endpoint, {
    headers: getDefaultHeaders(options),
    body: options.body
  });

  return data;
}
