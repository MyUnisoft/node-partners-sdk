// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import LocalVariable from "./utils/localVariable";

/**
 * @see https://github.com/MyUnisoft/api-partenaires#type-dacc%C3%A8s-
 */
export type AccessType = "firm" | "society";

export const getters = Object.freeze({
  secret: new LocalVariable<string>(),
  accessType: new LocalVariable<AccessType>(),
  limitManager: new LocalVariable<boolean>()
});

export interface IConfigureOptions {
  /** Name to use for the http 'user-agent' header */
  userAgent: string;

  /** The secret key provided by the MyUnisoft team for the 'X-Third-Party-Secret' header */
  secretKey: string;

  /**
   * Use the built-in rate-limit manager
   *
   * @default true
   */
  limitManager?: boolean;
}

export function configure(options: IConfigureOptions) {
  const { secretKey, userAgent, limitManager = true } = options;
  getters.secret.set(secretKey);
  getters.limitManager.set(limitManager);

  httpie.DEFAULT_HEADER["user-agent"] = userAgent;
}

export * as access from "./access/index";
export * as accounting from "./accounting/index";
export { IDefaultHeaderOptions } from "./constants";
