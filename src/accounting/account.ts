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

// export interface IAccountV2Options extends IDefaultOptions {
//   params: {
//     account_id?: string;

//     /**
//      * Permet d'obtenir les infos complémentaires.
//      * Valeur par défaut: false.
//      */
//     details?: boolean;

//     /**
//      * Permet d’obtenir les infos sens, solde et blocked pour le plan comptable.
//      * Valeur par défaut: false.
//      */
//     compta?: boolean;

//     /**
//      * Permet d'obtenir les infos TVA.
//      * Valeur par défaut: false.
//      */
//     vat?: boolean;

//     /**
//      * Permet d'obtenir les infos de contrepartie.
//      * Valeur par défaut: false.
//      */
//     counterpart?: boolean;

//     /**
//      * Permet de faire un contrôle de validation du compte à la date donnée (aucun contrôle si pas de date).
//      * Format: YYYYMMDD
//      */
//     entry_date?: string;

//     /**
//      * Permet d’obtenir les infos des quantités.
//      * Valeur par défaut: false.
//      */
//     quantity: boolean;

//     /**
//      * Permet de filtrer sur des comptes commançant par...
//      * Valeur par défaut: "".
//      */
//     begin_by: string;
//   }
// }

// export async function getAccountV2(options: IAccountV2Options) {
//   firmAccessThrowWithoutSociety(options);

//   const endpoint = new URL("/api/v1/account/v2", BASE_API_URL);
//   setSearchParams(endpoint, options.params, {
//     accountantId: "accountant_id",
//     entryDate: "entry_date",
//     beginBy: "begin_by"
//   });

//   const { data } = httpie.get<Windev.Account.DetailedAccountV2>(endpoint, {
//     ...setDefaultHeaderOptions(options)
//   });

//   return data;
// }

// export interface IBalanceOptions extends IDefaultOptions {
//   params: {
//     /**
//      * Date pour identifier l’exercice associé.
//      * Format: YYYY_MM
//      */
//     date: string;

//     accountId: string;
//   }
// }

// export async function getBalance(options: IBalanceOptions) {
//   firmAccessThrowWithoutSociety(options);

//   // à vérifier
//   const endpoint = new URL(`/api/v1/account/${options.params.accountId}/balance`, BASE_API_URL);
//   endpoint.searchParams.set("YYYY_MM", options.params.date);

//   options.contentType = "application/json";

//   const { data } = await httpie.get<Windev.Account.AccountBalance>(endpoint, {
//     ...setDefaultHeaderOptions(options)
//   });

//   return data;
// }

// export interface INextLetteringOptions extends IDefaultOptions {
//   params: {
//     accountId: string;
//   }
// }

// export async function getNextLettering(options: INextLetteringOptions) {
//   const endpoint = new URL(`/api/v1/account/${options.params.accountId}/next_lettering`, BASE_API_URL);

//   const { data } = httpie.get<Windev.Account.NextLettering>(endpoint, {
//     ...setDefaultHeaderOptions(options)
//   });

//   return data;
// }

// export async function getUnbalancedLettering(options: IDefaultHeaderOptions) {
//   firmAccessThrowWithoutSociety(options);

//   const endpoint = new URL("/api/v1/account/unbalanced_lettering", BASE_API_URL);

//   const { data } = httpie.get<Windev.Account.UnbalancedLettering[]>(endpoint, {
//     ...setDefaultHeaderOptions(options)
//   });

//   return data;
// }

// export interface IAccountRevisionOptions extends IDefaultOptions {
//   params: {
//     accountId: string;
//     dossierRevisionId: string;
//   }
// }

// export async function getAccountRevision(options: IAccountRevisionOptions) {
//   firmAccessThrowWithoutSociety(options);

//   const endpoint = new URL(
//     `/api/v1/accounts/${options.params.accountId}/revisions/${options.params.dossierRevisionId}/infos`,
//     BASE_API_URL
//   );

//   const { data } = httpie.get<Windev.Account.AccountRevision>(endpoint, {
//     ...setDefaultHeaderOptions(options)
//   });

//   return data;
// }
