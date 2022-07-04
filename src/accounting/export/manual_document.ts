// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import {
  IDefaultHeaderOptions,
  getDefaultHeaders,
  BASE_API_URL,
  throwIfIsNotFirm,
  rateLimitChecker
} from "../../constants";

export interface IPendingDocumentOptions extends IDefaultHeaderOptions {
  limit: number;
  societyId: number;
  offset?: number;
  sortDateDirection?: "asc" | "desc";

  /**
   * Retrieves all by default.
   */
  filter?: "grouped" | "ungrouped";

  /**
   * Thumbnail width.
   */
  width?: number;

  /**
   * Thumbnail heigth.
   */
  height?: number;
}

interface IListManualDocuments {
  rows_number: number;
  created_date: string;
  document_attached_id: number;
  documents: IDocument[];
}

interface IDocument {
  document_id: number;
  name: string;
  thumbnail: string;
  date: string;
  token: string;
  link: string;
  invoice_type_id: number;
}

export interface IPendingDocuments {
  rows_number: number;
  pages_number: number;
  ocrStatus: boolean;
  list_manual_document: IListManualDocuments[];

}

function setPendingDocumentParams(options: IPendingDocumentOptions) {
  const endpoint = new URL("/api/v1/document/pending", BASE_API_URL);

  endpoint.searchParams.set("limit", String(options.limit));
  endpoint.searchParams.set("society_id", String(options.societyId));
  if (typeof options.offset !== "undefined") {
    endpoint.searchParams.set("offset", String(options.offset));
  }
  if (typeof options.filter !== "undefined") {
    endpoint.searchParams.set("filter", options.filter);
  }
  if (typeof options.width !== "undefined") {
    endpoint.searchParams.set("width", String(options.width));
  }
  if (typeof options.height !== "undefined") {
    endpoint.searchParams.set("height", String(options.height));
  }
  if (typeof options.sortDateDirection !== "undefined") {
    endpoint.searchParams.set("sort_date_direction", options.sortDateDirection);
  }

  return endpoint;
}

export async function getPendingDocument(options: IPendingDocumentOptions) {
  throwIfIsNotFirm();

  const endpoint = setPendingDocumentParams(options);

  const { data } = await httpie.get<IPendingDocuments>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getPendingDocumentStream(options: IPendingDocumentOptions) {
  throwIfIsNotFirm();

  const endpoint = setPendingDocumentParams(options);

  return await httpie.stream("GET", endpoint, {
    headers: getDefaultHeaders(options)
  });
}
