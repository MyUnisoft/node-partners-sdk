// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, setDefaultHeaderOptions } from "../constants";

export async function getAll(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/account", BASE_API_URL);
  endpoint.searchParams.set("mode", "1");

  const { data } = await httpie.get<Windev.Account.SimplifiedAccount[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getAllDetailed(options: IDefaultHeaderOptions) {
  const endpoint = new URL("/api/v1/account", BASE_API_URL);
  endpoint.searchParams.set("mode", "2");

  const { data } = await httpie.get<Windev.Account.DetailedAccounts>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

// TODO: findOrCreate, findRelatedEntries
