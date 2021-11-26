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

export async function society(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.SocietiesArray>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function balance(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/balance_dynamique", BASE_API_URL);

  options.contentType = "application/octet-stream";

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
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

  options.header.contentType = "application/octet-stream";

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
