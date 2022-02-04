// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import { BASE_API_URL, firmAccessThrowWithoutSociety, IDefaultOptions, setDefaultHeaderOptions } from "../../constants";

export interface IEntryOptions extends IDefaultOptions {
  body: Windev.Entry.NewEntry;
}

export interface IDirectEntryOptions extends IEntryOptions {
  params: {
    /**
     * E = ecriture
     *
     * O = ocr
     */
    type: "e" | "o"
  };
}

export async function jsonEntry(options: IDirectEntryOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/entry", BASE_API_URL);
  endpoint.searchParams.set("type", options.params.type);

  options.header.contentType = "application/json";

  const { data } = await httpie.post(endpoint, {
    ...setDefaultHeaderOptions(options.header),
    body: options.body
  });

  return data;
}

export async function jsonPendingEntry(options: IEntryOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/entry/temp", BASE_API_URL);

  options.header.contentType = "application/json";

  const { data } = await httpie.post(endpoint, {
    ...setDefaultHeaderOptions(options.header),
    body: options.body
  });

  return data;
}
