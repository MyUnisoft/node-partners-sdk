// Import Node.js Dependencies
import { IncomingHttpHeaders } from "http";

// Import Third-party Dependencies
import { pRateLimit } from "p-ratelimit";
import EphemeralMap from "@openally/ephemeral-map";

// Import Internal Dependencies
import { getters } from "./index";
import { InlineCallbackAction } from "@myunisoft/httpie";

// CONSTANTS
const kTokenRatelimit = new EphemeralMap<string, InlineCallbackAction>(void 0, {
  ttl: 1000 * 60 * 5,
  refreshOnGet: true
});

// export const BASE_AUTH_URL = "https://app.myunisoft.fr";
// export const BASE_API_URL = "https://app.myunisoft.fr";
export const BASE_AUTH_URL = "https://yoda.myunisoft.fr:1337";
export const BASE_API_URL = "https://yoda.myunisoft.fr:1367";

export const enumInvoiceType = Object.freeze({
  Achat: "1",
  Frais: "2",
  Vente: "3",
  Avoir: "4"
});

/**
 * @description Default interface for all requests options
 */
export interface IDefaultHeaderOptions {
  /** API Bearer Token */
  accessToken: string;

  /** Accounting folder (dossier de production) id */
  accountingFolderId?: string | number;
}

export function rateLimitChecker(token: string): InlineCallbackAction | undefined {
  if (getters.limitManager) {
    if (!kTokenRatelimit.has(token)) {
      kTokenRatelimit.set(token, pRateLimit({
        interval: 1000 * 60,
        rate: 100,
        concurrency: 10
      }));
    }

    return kTokenRatelimit.get(token);
  }

  return void 0;
}

/**
 * @description Default httpie options with all required headers
 */
export function getDefaultHeaders(options: IDefaultHeaderOptions): IncomingHttpHeaders {
  return {
    authorization: `Bearer ${options.accessToken}`,
    "X-Third-Party-Secret": getters.secret.get(),
    ...("accountingFolderId" in options ? { "society-id": String(options.accountingFolderId) } : {})
  };
}

// CHECK ACCES TYPE
export function firmAccessThrowWithoutSociety(options: IDefaultHeaderOptions) {
  if (getters.accessType.is("firm") && !("accountingFolderId" in options)) {
    throw new Error("accountingFolderId is missing (mandatory for a firm access).");
  }
}

export function throwIfIsNotFirm() {
  if (!getters.accessType.is("firm")) {
    throw new Error("This endpoint only works with a cabinet (firm) access.");
  }
}
