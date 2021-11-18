// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { IDefaultOptions, setDefaultHeaderOptions } from "../../constants";

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
  const endpoint = new URL("/api/v1/entries/id");
  endpoint.searchParams.set("id_origin", String(options.params.id));

  const { data } = await httpie.get<IEntryByPartnerResponse>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
