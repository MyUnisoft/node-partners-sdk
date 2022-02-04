// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  getDefaultHeaders,
  setSearchParams
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

export interface IBalanceByExerciceParams {
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

export interface IBalanceByDateParams {
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

export interface IBalanceOptions extends IDefaultHeaderOptions {
  params: IBalanceByExerciceParams | IBalanceByDateParams;
}

export async function getDynamicBalance(options: IBalanceOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/balance_dynamique", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    startDate: "start_date",
    endDate: "end_date",
    axisId: "axis_id",
    fiscalYearId: "fiscal_year_id"
  });

  const { data } = await httpie.get(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/x-www-form-urlencoded"
    }
  });

  return data;
}

export interface IGetGrandLivreOptions extends IDefaultHeaderOptions {
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

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}
