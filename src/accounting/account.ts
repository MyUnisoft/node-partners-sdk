// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";
import { RequireExactlyOne } from "type-fest";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  getDefaultHeaders,
  throwIfIsNotFirm,
  rateLimitChecker
} from "../constants";

export interface IGetAllOptions extends IDefaultHeaderOptions {
  /**
   * @description
   * OPTIONAL.
   *
   * Retrieves:
   * - accounts where the account label includes accountNumber.
   * - accounts where the account number starts with accountNumber.
   */
  accountNumber?: string;

  /**
  * OPTIONAL. Default value: 5.
  */
  limit?: number;
}

export async function getAll(options: IGetAllOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/account", BASE_API_URL);
  endpoint.searchParams.set("mode", "1");
  endpoint.searchParams.set("q", String(options.accountNumber || ""));

  const { data } = await httpie.get<Windev.Account.SimplifiedAccount[]>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export interface IGetAllDetailedOptions extends IDefaultHeaderOptions {
  /**
   * @description OPTIONAL. Retrieves accounts where the account number starts with begin_by.
   */
  accountNumber?: string;

  sort?: {
    column: "";
    direction: "asc" | "desc";
  };
}

export async function getAllDetailed(options: IGetAllDetailedOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/account", BASE_API_URL);
  endpoint.searchParams.set("mode", "2");
  endpoint.searchParams.set("begin_by", String(options.accountNumber || ""));
  endpoint.searchParams.set("sort_", JSON.stringify(options.sort) || "");

  const { data } = await httpie.get<Windev.Account.DetailedAccounts>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export interface IFindOrCreateOptions extends IDefaultHeaderOptions {
  accountNumber: string;
  label: string;
}

export async function findOrCreate(options: IFindOrCreateOptions) {
  firmAccessThrowWithoutSociety(options);
  const endpoint = new URL("/api/v1/account", BASE_API_URL);

  const { data } = await httpie.post<Windev.Account.Account>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken),
    body: {
      account_number: options.accountNumber,
      label: options.label
    }
  });

  return data;
}

// changer le body comme la methode findOrCreate ?
export interface IUpdateAccountOptions extends IDefaultHeaderOptions {
  body: Windev.Account.UpdateAccount;
}

export async function updateAccount(options: IUpdateAccountOptions) {
  throwIfIsNotFirm();
  // manque le society-id dans le header ? error GBL1

  const endpoint = new URL("/api/v1/account", BASE_API_URL);

  const { data } = await httpie.put<Windev.Account.Account | { status: string; message: string; }>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken),
    body: options.body
  });

  return data;
}

export interface ILineEntriesOptions extends IDefaultHeaderOptions {
  /**
 * Type de filtrage sur le lettrage.
 */
  lettering?: "false" | "true" | "date";

  /**
  * Identifiant du compte pour lequel on veut récupérer les écritures.
  * Soit ILineEntriesOptions.account_id, soit ILineEntriesOptions.account_no. */
  accountId?: number;

  /**
  * Permet de filtrer sur les comptes qui commencent par XXX.
  * Soit ILineEntriesOptions.account_id, soit ILineEntriesOptions.account_no.
  */
  accountNumber?: string;

  /**
  * Période pour laquel on va retourner les lignes d'écritures.
  * Format des dates: YYYYMMDD
  */
  searchDate?: {
    start_date: string;
    end_date: string;
  }

  /**
  * Permet de selectionner le type d'écriture à remonter.
  */
  entryTypes?: "SITU" | "NORM";
}

export async function getLineEntries(options: RequireExactlyOne<ILineEntriesOptions, "accountId" | "accountNumber">) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/account/entries", BASE_API_URL);
  endpoint.searchParams.set("entry_types", options.entryTypes || "");
  endpoint.searchParams.set("search_date", JSON.stringify(options.searchDate) || "");

  if (options.accountId) {
    endpoint.searchParams.set("account_id", String(options.accountId));
  }
  else if (options.accountNumber) {
    endpoint.searchParams.set("account_no", options.accountNumber);
  }
  else {
    throw new Error("Missing account ID/number");
  }

  const { data } = await httpie.get<Windev.Account.AccountEntries>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}
