// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  getDefaultHeaders
} from "../constants";

export async function getExercices(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/society/exercice", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Exercice[]>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getDiaries(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/diary", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Diary[]>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getVatParameters(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/vat_param", BASE_API_URL);

  const { data } = await httpie.get<Windev.Vat.VatParam[]>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getPaymentType(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/payment_type", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.PaymentType[]>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getInformation(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Company>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface IBalanceByExercice extends IDefaultHeaderOptions {
  /**
   * ID de l’exercice dont on souhaite la balance.
   */
  exerciceId?: number;

  /**
   * ID de l’axe dont on souhaite la balance.
   */
  axisId: number;

  type?: "compare" | "aged";
}

interface IBalanceAccount {
  id_account: number;
  account_number: number;
  label: string;
  exercice_values: [ number | null ]
  exercice_mvt: [
    {
      credit: number;
      debit: number;
    }
  ]
  percentage_values: [];
  month_values: [ number | null ];
  account_List: IBalanceAccount[];
  validation: {
    VRM: string;
    VCOL: string;
    VSUP: string;
  } | null;
  hasComment: boolean;
  hasJustification: boolean;
  id_account_revision: number;
  id_fiscal_year: number;
  varPercent: null;
  varValue: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IBalance {
  fiscal_year_list: string[];
  month_list: string[];
  data: IBalanceAccount[];
}

interface IBalanceDynamique {
  exercice: {
    id: number;
    label: string;
    start_date: string;
    end_date: string;
  }
}

export async function getDynamicBalanceFromExercice(options: IBalanceByExercice) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/balance_dynamique", BASE_API_URL);

  endpoint.searchParams.set("fiscal_year_id", String(options.exerciceId));
  endpoint.searchParams.set("axis_id", String(options.axisId));
  endpoint.searchParams.set("type", options.type || "");

  const { data } = await httpie.get<IBalanceDynamique[]>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/x-www-form-urlencoded"
    }
  });

  return data;
}

export interface IBalanceByDate extends IDefaultHeaderOptions {
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

export async function getDynamicBalanceFromDate(options: IBalanceByDate) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/balance_dynamique", BASE_API_URL);
  endpoint.searchParams.set("axis_id", String(options.axisId));
  endpoint.searchParams.set("start_date", options.startDate);
  endpoint.searchParams.set("end_date", options.endDate);

  const { data } = await httpie.get<IBalanceDynamique>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/x-www-form-urlencoded"
    }
  });

  return data;
}

export interface IGetGrandLivreOptions extends IDefaultHeaderOptions {
  /**
   * Format: YYYY-MM-DD
   */
  startDate: string;

  /**
   * Format: YYYY-MM-DD
   */
  endDate: string;
  xls?: boolean;
}

export async function getGrandLivre(options: IGetGrandLivreOptions) {
  const endpoint = new URL("/api/v1/grand_livre", BASE_API_URL);
  endpoint.searchParams.set("start_date", options.startDate);
  endpoint.searchParams.set("end_date", options.endDate);

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getGrandLivreStream(options: IGetGrandLivreOptions) {
  const endpoint = new URL("/api/v1/grand_livre", BASE_API_URL);
  endpoint.searchParams.set("start_date", options.startDate);
  endpoint.searchParams.set("end_date", options.endDate);

  return await httpie.stream("GET", endpoint, {
    headers: getDefaultHeaders(options)
  });
}
