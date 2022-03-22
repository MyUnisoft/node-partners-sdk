// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, getDefaultHeaders } from "../../constants";

export * from "./ocr";
export * from "./FacturX";
export * from "./JSON";
export * from "./TRA";
export * from "./FEC";
export * from "./EBICS";

export interface IAddAttachmentToEntryOptions extends IDefaultHeaderOptions {
  location: "ENTRIES" | "ENTRIES_TEMP";
  objectId: number;
  filename: string;
}

export async function addAttachmentToEntry(options: IAddAttachmentToEntryOptions) {
  const endpoint = new URL("/api/v1/document/add_all_types", BASE_API_URL);
  endpoint.searchParams.set("object_id", String(options.objectId));
  endpoint.searchParams.set("filename_extension", options.filename);
  endpoint.searchParams.set("location", options.location);

  // ???
  endpoint.searchParams.set("type_result", "1");

  const { data } = await httpie.post(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/octet-stream"
    }
  });

  return data;
}
