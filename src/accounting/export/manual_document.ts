// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import {
  IDefaultHeaderOptions,
  getDefaultHeaders,
  BASE_API_URL,
  throwIfIsNotFirm
} from "../../constants";

export interface IPendingDocumentOptions extends IDefaultHeaderOptions {
  limit: number;
  societyId: number;
  offset?: number;
  sortDateDirection?: "asc" | "desc";

  /**
   * Retrieves all by default.
   */
  filter: "grouped" | "ungrouped";

  /**
   * Thumbnail width.
   */
  width: number;

  /**
   * Thumbnail heigth.
   */
  height: number;
}

export interface IPendingDocuments {
  agent_name: string;
  baseURL: string;
  created_date_time: string;
  docuemnt_id: number;
  document_label: string;
  download: string;
  from_source: string;
  invoice_label_id: string;
  invoice_type_id: number;
  is_parent: string;
  last_status_date_time: string;
  link: string;
  ocr_doc_id: number;
  ocr_follow_up_id: number;
  ocr_parent_doc_id: number;
}

export async function getPendingDocument(options: IPendingDocumentOptions) {
  throwIfIsNotFirm();

  const endpoint = new URL("/api/v1/document/pending", BASE_API_URL);
  endpoint.searchParams.set("limit", String(options.limit));
  endpoint.searchParams.set("offset", String(options.offset || ""));
  endpoint.searchParams.set("filter", options.filter);
  endpoint.searchParams.set("width", String(options.width));
  endpoint.searchParams.set("height", String(options.height));
  endpoint.searchParams.set("sort_date_direction", options.sortDateDirection || "");
  endpoint.searchParams.set("society_id", String(options.societyId));

  const { data } = await httpie.get<IPendingDocuments>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}
