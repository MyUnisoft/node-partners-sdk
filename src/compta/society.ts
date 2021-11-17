// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, setDefaultHeaderOptions } from "../constants";

export async function exercices(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/society/exercice", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Exercice[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function diary(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/diary", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.Diary[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function vat(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/vat_param", BASE_API_URL);

  const { data } = await httpie.get<Windev.Vat.VatParam[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function payment(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/payment_type", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.PaymentType[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function society(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.SocietiesArray>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function balance(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/balance_dynamique", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}
