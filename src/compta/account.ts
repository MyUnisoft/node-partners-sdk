// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";
import { isFirmAccess } from "../authenticate/access_type";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  IDefaultOptions,
  setDefaultHeaderOptions,
  setSearchParams
} from "../constants";

export async function getAll(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/account", BASE_API_URL);
  endpoint.searchParams.set("mode", "1");

  const { data } = await httpie.get<Windev.Account.SimplifiedAccount[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getAllDetailed(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/account", BASE_API_URL);
  endpoint.searchParams.set("mode", "2");

  const { data } = await httpie.get<Windev.Account.DetailedAccounts>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export interface IFindRelatedEntriesOptions extends IDefaultOptions {
  params: {
    accountNo: number;
    accountId: number;
    limit?: number;

    /**
     * Starting rows (Default 0).
     */
    offset?: number;

    /**
     * Optionnal date ranges but if it's activated start_date and end_date must be filled.
     */
    searchDate?: string;

    sort?: {
      direction: "desc" | "asc";
      column: "credit" | "debit" | "date" | "label" | "lettrage" | "piece" | "piece2";
    };

    /**
     * If lettering param not filled all entries are retrieved.
     *
     * True = entries filtered by lettering not empty.
     * False = entries filtered by lettering empty.
     */
    lettering?: boolean;

    // ???
    prevnext?: "previous" | "next";
  }
}

export async function findRelatedEntries(options: IFindRelatedEntriesOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/account/entries", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    accountNo: "account_no",
    accountId: "account_id",
    searchDate: "search_date"
  });

  // Vérifier le type de retour.
  const { data } = await httpie.get<Windev.Account.AccountEntries>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

export interface IFindOrCreateOptions extends IDefaultOptions {
  body: {
    accountNumber: string;
    label: string;
  }
}

export async function findOrCreate(options: IFindOrCreateOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/account", BASE_API_URL);

  options.header.contentType = "application/json";

  const { data } = await httpie.post<Windev.Account.Account>(endpoint, {
    ...setDefaultHeaderOptions(options.header),
    body: {
      account_number: options.body.accountNumber,
      label: options.body.label
    }
  });

  return data;
}

export interface IUpdateAccountOptions extends IDefaultOptions {
  body: Windev.Account.UpdateAccount;
}

export async function updateAccount(options: IUpdateAccountOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only work with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/account", BASE_API_URL);

  options.header.contentType = "application/json";

  const { data } = await httpie.put<Windev.Account.Account | { status: string; message: string; }>(endpoint, {
    ...setDefaultHeaderOptions(options.header),
    body: options.body
  });

  return data;
}
