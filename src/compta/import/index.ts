// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, setDefaultHeaderOptions, setSearchParams } from "../../constants";

export * as OCR from "./ocr";
export * as facturX from "./FacturX";
export * as JSON from "./JSON";
export * as TRA from "./TRA";
export * as FEC from "./FEC";

export interface IAddAttachmentToEntryOptions extends IDefaultOptions {
  params: {
    location: "ENTRIES" | "ENTRIES_TEMP";
    objectId: number;
    filename: string;
  };
}

export async function addAttachmentToEntry(options: IAddAttachmentToEntryOptions) {
  const endpoint = new URL("/api/v1/document/add_all_types", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    objectId: "object_id",
    filename: "filename_extension"
  });

  // ???
  endpoint.searchParams.set("type_result", "1");

  options.header.contentType = "application/octet-stream";

  const { data } = await httpie.post(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
