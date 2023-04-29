// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  BASE_API_URL,
  getDefaultHeaders,
  IDefaultHeaderOptions,
  rateLimitChecker,
  throwIfIsNotFirm
} from "../constants";

export async function getUsers(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/users_v2", BASE_API_URL);

  const { data } = await httpie.get<Windev.User.UsersResponse>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getPhysicalPersons(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/pers_physique", BASE_API_URL);

  const { data } = await httpie.get<{ array_pers_physique: Windev.User.PhysicalPerson[] }>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export interface IWalletListSociety {
  name: string;
  id_society: number;
}

export interface IWalletListUser {
  name: string;
  firstname: string;
  id_pers_physique: number;
}

export interface IWallet {
  id_wallet: number;
  main_wallet: boolean;
  libelle: string;
  nb_society: number;
  list_society: IWalletListSociety[];
  nb_users: number;
  list_users: IWalletListUser[];
  blocked: boolean
}

export async function getWallets(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/wallet", BASE_API_URL);

  const { data } = await httpie.get<IWallet[]>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface IFirm {
  member_id: number,
  name: string,
  address: null,
  postal_code: null,
  city: null,
  website: null,
  phone_number: null,
  email: null,
  fax: null,
  safe_status: string,
  address_ws_silae: null,
  login_ws_silae: string,
  login_silae: string,
  pw_ws_silae_secured: boolean,
  pw_silae_secured: boolean,
  street_number: null,
  repetition_index: null,
  address_complement: null,
  siret: null,
  typevoie: null
}

export async function getAccountingFirms(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/member", BASE_API_URL);

  const { data } = await httpie.get<IFirm>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getAccountingFolders(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.SocietiesArray>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface ISearchCompanyByRefOptions extends IDefaultHeaderOptions {
  reference: string;
}

export interface ICompanyByRef {
  name: string;
  siret: string;
  society_id: number;
}

export async function getCompanyByRef(options: ISearchCompanyByRefOptions) {
  throwIfIsNotFirm();

  const endpoint = new URL("/api/v1/society/search", BASE_API_URL);
  endpoint.searchParams.set("reference", options.reference);

  const { data } = await httpie.get<ICompanyByRef>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}
