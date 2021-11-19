// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, setDefaultHeaderOptions } from "../../constants";

export * as JSON from "./JSON";
export * as FEC from "./FEC";

export interface IEntryByPartnerOptions extends IDefaultOptions {
  params: {
    id: number;
  }
}

export interface IEntryByPartnerResponse {
  id_entry: number;
  type: "ENTRIES" | "ENTRIES_TEMP";
  json_metadata_partners?: string;
}

export async function getEntryByPartnerID(options: IEntryByPartnerOptions) {
  const endpoint = new URL("/api/v1/entries/id", BASE_API_URL);
  endpoint.searchParams.set("id_origin", String(options.params.id));

  const { data } = await httpie.get<IEntryByPartnerResponse>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

export interface IDefaultGetEntriesOptions extends IDefaultOptions {
  params: {
    /**
     * E = ECRITURE.
     *
     * O = ECRITURE OCR/ECRITURE EN ATTENTE.
     *
     * IB = ECRITURE INTEGRATION BANCAIRE.
     *
     * M = ECRITURE MANUEL.
     *
     * EXT = ECRITURE EXTOURNE.
     *
     * L = ECRITURE LETTRAGE.
     */
    type: "e" | "o" | "ib" | "m" | "ext" | "l";
  };
  body: any;
}


export async function defaultGetEntries<T>(options: IDefaultGetEntriesOptions) {
  const endpoint = new URL("/api/v1/entries", BASE_API_URL);
  endpoint.searchParams.set("type", options.params.type);

  options.header.contentType = "application/json";

  const { data } = await httpie.post<T>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

