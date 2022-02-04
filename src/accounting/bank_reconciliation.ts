// // Import Third-party Dependencies
// import * as httpie from "@myunisoft/httpie";
// import { Windev } from "@myunisoft/tsd";
// import { isFirmAccess } from "../authenticate/access_type";

// // Import Internal Dependencies
// import {
//   BASE_API_URL,
//   IDefaultHeaderOptions,
//   IDefaultOptions,
//   setDefaultHeaderOptions,
//   setSearchParams
// } from "../constants";

// export interface IGetListEntriesOptions {
//   header: IDefaultHeaderOptions & {
//     /**
//      * Example: "fr".
//      */
//     language: string;
//   };
//   params: {
//     /**
//      * 0 = undotted
//      *
//      * 1 = dotted
//      *
//      * 2 = all
//      */
//     dotted: 0 | 1 | 2;

//     /**
//      * Format: YYYYMMDD
//      */
//     date: string;

//     idDiary: number;
//     limit: number;
//     offset: number;
//     sort?: {
//       direction: "asc" | "desc";

//       /**
//        * "counterpart_number" est "no_compte" dans le json.
//        */
//       column: "counterpar_number" | "piece" | "piece_2" | "dotted" | "label" | "debit" | "credit" |"date";
//     };
//   };
// }

// export async function getListEntries(options: IGetListEntriesOptions) {
//   const endpoint = new URL("bank_reconciliation/list_entries", BASE_API_URL);
//   setSearchParams(endpoint, options.params, {
//     idDiary: "id_diary"
//   });

//   const { data } = await httpie.get(endpoint, {
//     ...setDefaultHeaderOptions(options.header)
//   });

//   return data;
// }

// export async function getDate(options: IDefaultHeaderOptions) {
//   const endpoint = new URL("bank_reconciliation/date", BASE_API_URL);

//   const { data } = await httpie.get(endpoint, {
//     ...setDefaultHeaderOptions(options)
//   });

//   return data;
// }

// export async function getDateList(options: IDefaultHeaderOptions) {
//   if (!options.societyId) {
//     return new Error("societyId is missing.");
//   }
//   const endpoint = new URL("bank_reconciliation/date_list", BASE_API_URL);

//   const { data } = await httpie.get(endpoint, {
//     ...setDefaultHeaderOptions(options)
//   });

//   return data;
// }

// export interface IPostDateListOptions extends IDefaultOptions {
//   body: {
//     /**
//      * Format: YYYYMMDD
//      */
//     date: string;
//   }
// }

// export async function postDateList(options: IPostDateListOptions) {
//   if (!options.header.societyId) {
//     return new Error("societyId is missing.");
//   }

//   const endpoint = new URL("bank_reconciliation/date_list", BASE_API_URL);

//   const { data } = await httpie.post(endpoint, {
//     ...setDefaultHeaderOptions(options.header),
//     body: options.body
//   });

//   return data;
// }
