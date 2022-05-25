// Import Node.js Dependencies
import { ReadStream } from "fs";

// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  getDefaultHeaders,
  IDefaultHeaderOptions,
  enumInvoiceType,
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  rateLimitChecker
} from "../../constants";

export interface ISendFacturXPdfOptions extends IDefaultHeaderOptions {
  name: string;
  invoiceType: "Achat" | "Note de frais" | "Vente" | "Avoir";
  extension: string;
  body: Buffer | ReadableStream | ReadStream;
}

export async function FacturX(options: ISendFacturXPdfOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/invoice", BASE_API_URL);
  endpoint.searchParams.set("name", options.name);
  endpoint.searchParams.set("invoice_type_id", enumInvoiceType[options.invoiceType]);
  endpoint.searchParams.set("ocr_type_id", "6");
  endpoint.searchParams.set("extension", options.extension);

  const { data } = await httpie.post<Windev.Entry.Entries>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/octect"
    },
    limit: rateLimitChecker(options.accessToken),
    body: options.body
  });

  return data;
}
