// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, getDefaultOptions } from "../constants";

export async function getAll(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/account", BASE_API_URL);
  endpoint.searchParams.set("mode", "1");

  const { data } = await httpie.get<Windev.Account.SimplifiedAccount[]>(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

export async function getAllDetailed(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/account", BASE_API_URL);
  endpoint.searchParams.set("mode", "2");

  const { data } = await httpie.get<Windev.Account.DetailedAccounts>(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

// TODO: findOrCreate, findRelatedEntries
