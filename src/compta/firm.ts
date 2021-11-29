// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";
import { isFirmAccess } from "../authenticate/access_type";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, IDefaultOptions, setDefaultHeaderOptions } from "../constants";

export async function getUsersV2(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/users_v2", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getPhysicalPersons(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/pers_physique", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getWallets(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/wallet", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getFirms(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/member", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

/**
 * Admin EC.
 */
export async function getDashboardModules(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/dashboard/modules", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getCompanies(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.SocietiesArray>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export interface ISearchCompanyByRefOptions extends IDefaultOptions {
  params: {
    reference: string;
  }
}

export async function getCompanyByRef(options: ISearchCompanyByRefOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/society/search", BASE_API_URL);
  endpoint.searchParams.set("reference", options.params.reference);

  const { data } = await httpie.get<Windev.Society.CompanyInfo>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
