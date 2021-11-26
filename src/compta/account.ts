// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";
import { RequireExactlyOne } from "type-fest";
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

export interface IAccountV2Options extends IDefaultOptions {
  params: {
    account_id?: string;

    /**
     * Permet d'obtenir les infos complémentaires.
     * Valeur par défaut: false.
     */
    details?: boolean;

    /**
     * Permet d’obtenir les infos sens, solde et blocked pour le plan comptable.
     * Valeur par défaut: false.
     */
    compta?: boolean;

    /**
     * Permet d'obtenir les infos TVA.
     * Valeur par défaut: false.
     */
    vat?: boolean;

    /**
     * Permet d'obtenir les infos de contrepartie.
     * Valeur par défaut: false.
     */
    counterpart?: boolean;

    /**
     * Permet de faire un contrôle de validation du compte à la date donnée (aucun contrôle si pas de date).
     * Format: YYYYMMDD
     */
    entry_date?: string;

    /**
     * Permet d’obtenir les infos des quantités.
     * Valeur par défaut: false.
     */
    quantity: boolean;

    /**
     * Permet de filtrer sur des comptes commançant par...
     * Valeur par défaut: "".
     */
    begin_by: string;
  }

}

export async function getAccountV2(options: IAccountV2Options) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/account/v2", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    accountantId: "accountant_id",
    entryDate: "entry_date",
    beginBy: "begin_by"
  });

  const { data } = httpie.get<Windev.Account.DetailedAccountV2>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

interface ILineEntriesParams {
  /**
   * Type de filtrage sur le lettrage.
   */
  lettering?: "false" | "true" | "date";

  /** 
   * Identifiant du compte pour lequel on veut récupérer les écritures.
   * Soit ILineEntriesOptions.account_id, soit ILineEntriesOptions.account_no. */
  accountId?: string;

  /**
   * Permet de filtrer sur les comptes qui commencent par XXX.
   * Soit ILineEntriesOptions.account_id, soit ILineEntriesOptions.account_no.
   */
  accountNo?: string;

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

export interface ILineEntriesOptions extends IDefaultOptions {
  params: RequireExactlyOne<ILineEntriesParams, "accountId" | "accountNo">;
}

export async function getlineEntries(options: ILineEntriesOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/account/entries", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    entryTypes: "entry_types",
    searchDate: "search_date",
    accountNo: "account_no",
    accountId: "account_id"
  });

  const { data } = await httpie.get<Windev.Account.AccountEntries>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

export interface IBalanceOptions extends IDefaultOptions {
  params: {
    /**
     * Date pour identifier l’exercice associé.
     * Format: YYYY_MM
     */
    date: string;

    accountId: string;
  }
}

export async function getBalance(options: IBalanceOptions) {
  firmAccessThrowWithoutSociety(options.header);

  // à vérifier
  const endpoint = new URL(`/api/v1/account/${options.params.accountId}/balance`, BASE_API_URL);
  endpoint.searchParams.set("YYYY_MM", options.params.date);

  options.header.contentType = "application/json";

  const { data } = await httpie.get<Windev.Account.AccountBalance>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

export interface INextLetteringOptions extends IDefaultOptions {
  params: {
    accountId: string;
  }
}

export async function getNextLettering(options: INextLetteringOptions) {
  const endpoint = new URL(`/api/v1/account/${options.params.accountId}/next_lettering`, BASE_API_URL);

  const { data } = httpie.get<Windev.Account.NextLettering>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

export async function getUnbalancedLettering(options: IDefaultHeaderOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/account/unbalanced_lettering", BASE_API_URL);

  const { data } = httpie.get<Windev.Account.UnbalancedLettering[]>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export interface IAccountRevisionOptions extends IDefaultOptions {
  params: {
    accountId: string;
    dossierRevisionId: string;
  }
}

export async function getAccountRevision(options: IAccountRevisionOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL(
    `/api/v1/accounts/${options.params.accountId}/revisions/${options.params.dossierRevisionId}/infos`,
    BASE_API_URL
  );

  const { data } = httpie.get<Windev.Account.AccountRevision>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
