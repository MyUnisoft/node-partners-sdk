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
  setSearchParams
} from "../../constants";

export interface ISendFacturXPdfOptions extends IDefaultHeaderOptions {
  params: {
    name: string;
    invoiceType: "Achat" | "Note de frais" | "Vente" | "Avoir";
    extension: "pdf"
  };
  body: Buffer | string;
}

export async function FacturX(options: ISendFacturXPdfOptions) {
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/invoice", BASE_API_URL);
  endpoint.searchParams.set("invoice_type_id", enumInvoiceType[options.params.invoiceType]);
  endpoint.searchParams.set("ocr_type_id", "6");
  setSearchParams(endpoint, options.params, {
    invoiceType: undefined
  });

  const { data } = await httpie.post<Windev.Entry.Entries>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/octect"
    },
    body: options.body
  });

  return data;
}
