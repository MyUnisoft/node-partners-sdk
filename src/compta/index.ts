// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, getDefaultOptions } from "../constants";

// Exports sub modules
export * as account from "./account";

export async function diary(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/diary", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Diary[]>(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

export async function vat(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/vat_param", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.VatParam[]>(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

export async function payment(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/payment_type", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.PaymentType[]>(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

// TODO: define proper type for both API
// MyUnisoft.Windev.Society.CompanyInfo
export async function society(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.SocietiesArray>(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

export async function exercices(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/society/exercice", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Exercice[]>(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

export async function usersV2(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/users_v2", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

export async function persPhysique(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/pers_physique", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

// TODO: implement options
export async function balance(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/balance_dynamique", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}
