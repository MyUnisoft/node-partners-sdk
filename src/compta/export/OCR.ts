// Import Third-party Dependencies
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import { defaultGetEntries, IDefaultGetEntriesOptions } from "./index";
import {
  firmAccessThrowWithoutSociety,
  IDefaultOptions
} from "../../constants";

export interface IOCRFollowUpOptions extends IDefaultOptions {
  body: {
    sort?: {
      ecr: "desc"
    };
    filters?: {
      // type: "e" ???

      diary?: number;
      /** Format: YYYY-MM-DD. */
      start_date?: string;

      /** Format: YYYY-MM-DD. */
      end_date?: string;
    };
  }
}

/**
 * Suivi OCR.
 */
export async function getOCRFollowUp(options: IOCRFollowUpOptions) {
  firmAccessThrowWithoutSociety(options.header);

  (options as IDefaultGetEntriesOptions).params = { type: "o" };

  return await defaultGetEntries<Windev.Entry.Entries>(options as IDefaultGetEntriesOptions);
}

/**
 * Récupérer Flux Manuel.
 */
export async function getFluxManuel(options: IOCRFollowUpOptions) {
  firmAccessThrowWithoutSociety(options.header);

  (options as IDefaultGetEntriesOptions).params = { type: "m" };

  return await defaultGetEntries<Windev.Entry.Entries>(options as IDefaultGetEntriesOptions);
}

// export async function getOCRFollowUp(options: IOCRFollowUpOptions) {
//   const endpoint = new URL("/api/v1/entries", BASE_API_URL);
//   endpoint.searchParams.set("type", "o");

//   if (isFirmAccess() && !("societyId" in options.header)) {
//     return new Error("Need societyId in the header.");
//   }

//   const { data } = await httpie.post<Windev.Entry.Entries>(endpoint, {
//     body: options.body,
//     ...setDefaultHeaderOptions(options.header)
//   });

//   return data;
// }

// export interface IOCRFollowUp {
//   document_id: number;
//   document_label: string;
//   token: string;
//   link: string;
//   baseURL: string;
//   thumbnail: string;
//   download: string;
//   invoice_type_id: number;
//   physical_pers_id: number;
//   ocr_follow_up_id: number;
//   invoice_label_id: string;
//   agent_name: string;
//   ocr_doc_id: number;
//   ocr_parent_doc_id: number;
//   is_parent: string;
//   ocr_state_follow_up_id: number;
//   status: {
//     label: string;
//     key: string
//   };
//   last_status_date_time: string;
//   created_date_time: string;
//   society_id: number;
//   society_name: string;
//   total_excl_taxes: number;
//   vat_total: number;
//   total_incl_taxes: number;
//   from_source: string;
// }

// export interface IGetOCRFollowUpResponse {
//   nb_ocr: number;
//   ocr_follow_up_array: IOCRFollowUp[];
// }
