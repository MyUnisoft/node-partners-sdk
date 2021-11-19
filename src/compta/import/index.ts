// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, setDefaultHeaderOptions } from "../../constants";

export * as ocr from "./ocr";
export * as factureX from "./FacturX";
export * as JSON from "./JSON";
export * as TRA from "./TRA";
export * as FEC from "./FEC";

export interface IAddAttachmentToEntryOptions extends IDefaultOptions {
  params: {
    location: "ENTRIES" | "ENTRIES_TEMP";
    objectId: number;
    filenameExtension: string;
    // ???
    // typeResult: 1;
  };
}

export async function addAttachmentToEntry(options: IAddAttachmentToEntryOptions) {
  const endpoint = new URL("/api/v1/document/add_all_types", BASE_API_URL);
  endpoint.searchParams.set("location", options.params.location);
  endpoint.searchParams.set("object_id", String(options.params.objectId));
  endpoint.searchParams.set("filename_extension", options.params.filenameExtension);
  endpoint.searchParams.set("type_result", "1");

  options.header.contentType = "application/octet-stream";

  const { data } = await httpie.post(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
