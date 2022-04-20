// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, firmAccessThrowWithoutSociety, IDefaultHeaderOptions, getDefaultHeaders } from "../../constants";

export * as FEC from "./FEC";
export * as OCR from "./OCR";
export * from "./manual_document";

export interface IEntryByPartnerOptions extends IDefaultHeaderOptions {
  id: number;
}

export interface IEntryByPartnerResponse {
  id_entry: number;
  type: "ENTRIES" | "ENTRIES_TEMP";
  json_metadata_partners?: string;
}

export async function getEntryByPartnerID(options: IEntryByPartnerOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/entries/id", BASE_API_URL);
  endpoint.searchParams.set("id_origin", String(options.id));

  const { data } = await httpie.get<IEntryByPartnerResponse>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface IDefaultGetEntriesOptions extends IDefaultHeaderOptions {
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
  type: "entry" | "ocrFollowUp" | "bankStatement" | "manual" | "reversed" | "lettering";

  body: any;
}

export async function getEntries<T>(options: IDefaultGetEntriesOptions) {
  const enumEntryTypes = {
    entry: "e",
    ocrFollowUp: "o",
    bankStatement: "ib",
    manual: "m",
    reversed: "ext",
    lettering: "l"
  };

  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/entries", BASE_API_URL);
  endpoint.searchParams.set("type", enumEntryTypes[options.type]);

  const { data } = await httpie.post<T>(endpoint, {
    headers: getDefaultHeaders(options),
    body: options.body
  });

  return data;
}
