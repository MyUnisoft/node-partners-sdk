// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  getDefaultHeaders,
  rateLimitChecker
} from "../constants";

export async function getExercices(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/society/exercice", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Exercice[]>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getDiaries(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/diary", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Diary[]>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getVatParameters(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/vat_param", BASE_API_URL);

  const { data } = await httpie.get<Windev.Vat.VatParam[]>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getPaymentType(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/payment_type", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.PaymentType[]>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getInformation(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Company>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}
