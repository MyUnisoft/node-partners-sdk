// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
// import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  IDefaultHeaderOptions,
  setSearchParams,
  getDefaultHeaders,
  BASE_API_URL,
  throwIfIsNotFirm
} from "../../constants";

// REQUEST
interface IGetOCRFollowUpParams {
  /** Format de date YYYYMMDD. */
  startDate: string;

  /** Format de date YYYYMMDD. */
  endDate: string;

  /**
   * Mode :
   *
   * 1 (All my folders)
   *
   * 2 (All sent by me)
   *
   * 3 (OCR only)
   */
  mode: 1 | 2 | 3;

  /** Valeur par défaut: 1000000 */
  limit?: number;

  /**  Columns filtered (society name, document label, lastname(space) firstname, state of document, all totals). */
  filter?: string;

  /** Column and direction of sorting results by columns (society, fileName, type, sendBy, status). */
  sort?: {
    direction: "asc" | "desc";
    column: "society" | "fileName" | "type" | "sendBy" | "status";
  }

  /** List of society_id in an array. */
  arraySocietyId?: {
    id: number;
    pwd?: string;
  }

  offset?: number;
}

export interface IOCRFollowUpOptions extends IDefaultHeaderOptions {
  params: Omit<IGetOCRFollowUpParams, "array_society_id">;
  body: {
    societies_array: number[];
  }
}

// RESPONSE
export interface IOCRFollowUp {
  document_id: number;
  document_label: string;
  token: string;
  link: string;
  baseURL: string;
  thumbnail: string;
  download: string;
  invoice_type_id: number;
  physical_pers_id: number;
  ocr_follow_up_id: number;
  invoice_label_id: string;
  agent_name: string;
  ocr_doc_id: number;
  ocr_parent_doc_id: number;
  is_parent: string;
  ocr_state_follow_up_id: number;
  status: {
    label: string;
    key: string
  };
  last_status_date_time: string;
  created_date_time: string;
  society_id: number;
  society_name: string;
  total_excl_taxes: number;
  vat_total: number;
  total_incl_taxes: number;
  from_source: string;
}

export interface IGetOCRFollowUpResponse {
  nb_ocr: number;
  ocr_follow_up_array: IOCRFollowUp[];
}

export async function getOCRFollowUp(options: IOCRFollowUpOptions) {
  throwIfIsNotFirm();

  const endpoint = new URL("/api/v1/ocr_follow_up", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    startDate: "start_date",
    endDate: "end_date",
    requestMode: "request_mode"
  });

  const { data } = await httpie.post<IGetOCRFollowUpResponse>(endpoint, {
    body: options.body,
    headers: getDefaultHeaders(options)
  });

  return data;
}

// export type IOCRFollowUpV2Response = Omit<IOCRFollowUp, "from_source" | "is_parent" | "ocr_parent_doc_id" | "ocr_doc_id">[];

// export async function getOCRFollowUpV2(options: Omit<IOCRFollowUpOptions, "body">) {
//   const endpoint = new URL("api/v1/ocr_follow_up_V2", BASE_API_URL);
//   setSearchParams(endpoint, options.params, {
//     startDate: "start_date",
//     endDate: "end_date",
//     requestMode: "request_mode",
//     arraySocietyId: "array_society_id"
//   });

//   const { data } = await httpie.get<IOCRFollowUpV2Response>(endpoint, {
//     ...setDefaultHeaderOptions(options.header)
//   });

//   return data;
// }
