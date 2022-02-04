// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import {
  setDefaultHeaderOptions,
  IDefaultOptions,
  setSearchParams,
  enumInvoiceType,
  BASE_API_URL,
  firmAccessThrowWithoutSociety
} from "../../constants";

export interface ISendImgOrPdfOptions extends IDefaultOptions {
  params: {
    extension: "pdf" | "jpg";
    name: string;
    invoiceType: "Achat" | "Frais" | "Vente" | "Avoir";
    ocrType: "Manuel" | "OCRMyUnisoft" | "OCRPremium" | "Factur-X";
  };
  body: Buffer;
}

export async function ocr(options: ISendImgOrPdfOptions) {
  firmAccessThrowWithoutSociety(options.header);

  const enumOCRType = {
    Manuel: "2",
    OCRMyUnisoft: "3",
    OCRPremimum: "5",
    "Factur-X": "6"
  };

  const endpoint = new URL("/api/v1/invoice", BASE_API_URL);
  endpoint.searchParams.set("invoice_type_id", enumInvoiceType[options.params.invoiceType]);
  endpoint.searchParams.set("ocr_type_id", enumOCRType[options.params.ocrType]);
  setSearchParams(endpoint, options.params, {
    invoiceType: undefined,
    ocrType: undefined
  });

  options.header.contentType = "application/octet-stream";

  const { data } = await httpie.post(endpoint, {
    ...setDefaultHeaderOptions(options.header),
    body: options.body
  });

  return data;
}
