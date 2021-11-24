// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
// import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  firmAccessThrowWithoutSociety,
  IDefaultOptions,
  setSearchParams,
  setDefaultHeaderOptions
} from "../../constants";

export interface IPendingDocumentOptions extends IDefaultOptions {
  params: {
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
  const endpoint = new URL("/document/pending");
  setSearchParams(endpoint, options.params, {
    sortDateDirection: "sort_date_direction",
    societyId: "society_id"
  });

  const { data } = await httpie.get<IPendingDocuments>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
