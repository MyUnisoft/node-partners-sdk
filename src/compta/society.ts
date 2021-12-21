// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  IDefaultOptions,
  setDefaultHeaderOptions,
  setSearchParams
} from "../constants";

export async function exercices(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/society/exercice", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Exercice[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function diary(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/diary", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Diary[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function vat(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/vat_param", BASE_API_URL);

  const { data } = await httpie.get<Windev.Vat.VatParam[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function paymentType(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/payment_type", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.PaymentType[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

// interface IGetSocietiesParams {
//   /**
//    * Allows you to search in fields: siret, ape, name.
//    */
//   search?: string;

//   sort?: {
//     direction: "asc" | "desc";
//     /**
//      * Allows you to sort on a column.
//      *
//      * Columns name: "name","city","ape","siret","status","step", "folder_reference".
//      */
//     column: string;
//   },
//   referenceFront?: any;
//   parentSocietyId?: number;
// }

// export interface IGetSocietiesOptions extends IDefaultOptions {
//   params?: IGetSocietiesParams
// }

// // pour firm uniquement?
// export async function getSocieties(options: IGetSocietiesOptions) {
//   const endpoint = new URL("/api/v1/society", BASE_API_URL);

//   if (options.params) {
//     setSearchParams(endpoint, options.params, {
//       parentSocietyId: "parent_society_id",
//       referenceFront: "reference_front",
//       search: "q"
//     });
//   }

//   // Peut retourner une seule société selon les paramètres dans le cas où le header contient society-id.
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { societyId, ...header } = options.header;

//   const { data } = await httpie.get<Windev.Society.SocietiesArray>(endpoint, {
//     ...setDefaultHeaderOptions(header)
//   });

//   return data;
// }

export async function getInfo(options: Required<Omit<IDefaultHeaderOptions, "contentType">>) {
  if (!options.societyId) {
    return new Error("Missing argment 'societyId'");
  }

  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Company>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

interface IBalanceByExerciceParams {
  /**
   * ID de l’exercice dont on souhaite la balance.
   */
  fiscalYearId: number;

  /**
   * ID de l’axe dont on souhaite la balance.
   */
  axisId: number;

  type?: "compare" | "aged";
}

interface IBalanceByDateParams {
  /**
   * Format: YYYYMMDD
   */
  startDate: string;

  /**
   * Format: YYYYMMDD
   */
  endDate: string;

  /**
   * ID de l’axe dont on souhaite la balance.
   */
  axisId: number;
}

export interface IBalanceOptions extends IDefaultOptions {
  params: IBalanceByExerciceParams | IBalanceByDateParams;
}

export async function balance(options: IBalanceOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/balance_dynamique", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    startDate: "start_date",
    endDate: "end_date",
    axisId: "axis_id",
    fiscalYearId: "fiscal_year_id"
  });

  options.header.contentType = "application/x-www-form-urlencoded";

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

export interface IGetGrandLivreOptions extends IDefaultOptions {
  params: {
    /**
     * Format: YYYY-MM-DD
     */
    startDate: string;

    /**
     * Format: YYYY-MM-DD
     */
    endDate: string;
  }
}

export async function getGrandLivre(options: IGetGrandLivreOptions) {
  const endpoint = new URL("/api/v1/grand_livre", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    startDate: "start_date",
    endDate: "end_date"
  });

  options.header.contentType = "application/json";

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
