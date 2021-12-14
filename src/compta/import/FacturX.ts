// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  setDefaultHeaderOptions,
  IDefaultOptions,
  enumInvoiceType,
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  setSearchParams
} from "../../constants";

export interface ISendFacturXPdfOptions extends IDefaultOptions {
  params: {
    name: string;
    invoiceType: "Achat" | "Note de frais" | "Vente" | "Avoir";
    extension: "pdf"
  };
  body: Buffer | string;
}

export async function sendFacturXPdf(options: ISendFacturXPdfOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/invoice", BASE_API_URL);
  endpoint.searchParams.set("invoice_type_id", enumInvoiceType[options.params.invoiceType]);
  endpoint.searchParams.set("ocr_type_id", "6");
  setSearchParams(endpoint, options.params, {
    invoiceType: undefined
  });

  options.header.contentType = "application/octect";

  const { data } = await httpie.post<Windev.Entry.Entries>(endpoint, {
    ...setDefaultHeaderOptions(options.header),
    body: options.body
  });

  return data;
}
