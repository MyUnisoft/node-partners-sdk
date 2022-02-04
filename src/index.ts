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
  accessType: new LocalVariable<AccessType>()
});

export interface IConfigureOptions {
  /** Name to use for the http 'user-agent' header */
  userAgent: string;

  /** The secret key provided by the MyUnisoft team for the 'X-Third-Party-Secret' header */
  secretKey: string;
}

export function configure(options: IConfigureOptions) {
  getters.secret.set(options.secretKey);

  httpie.DEFAULT_HEADER["user-agent"] = options.userAgent;
}

export * as authentication from "./authenticate/index";
export * as accounting from "./accounting/index";
