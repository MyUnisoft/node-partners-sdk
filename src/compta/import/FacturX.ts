// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  setDefaultHeaderOptions,
  IDefaultOptions,
  enumInvoiceType,
  BASE_API_URL,
  firmAccessThrowWithoutSociety
} from "../../constants";

export interface ISendFacturXPdfOptions extends IDefaultOptions {
  params: {
    name: string;
    invoiceType: "Achat" | "Frais" | "Vente" | "Avoir";
  };
  body: Buffer | string;
}

export async function sendFacturXPdf(options: ISendFacturXPdfOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/invoice", BASE_API_URL);
  endpoint.searchParams.set("invoice_type_id", enumInvoiceType[options.params.invoiceType]);
  endpoint.searchParams.set("ocr_type_id", "6");
  endpoint.searchParams.set("extension", "pdf");
  endpoint.searchParams.set("name", options.params.name);

  options.header.contentType = "application/octect";

  const { data } = await httpie.post<Windev.Entry.Entries>(endpoint, {
    ...setDefaultHeaderOptions(options.header),
    body: options.body
  });

  return data;
}
