// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import {
  getDefaultHeaders,
  IDefaultHeaderOptions,
  setSearchParams,
  enumInvoiceType,
  BASE_API_URL,
  firmAccessThrowWithoutSociety
} from "../../constants";

export interface ISendImgOrPdfOptions extends IDefaultHeaderOptions {
  params: {
    extension: "pdf" | "jpg";
    name: string;
    invoiceType: "Achat" | "Frais" | "Vente" | "Avoir";
    ocrType: "Manuel" | "OCRMyUnisoft" | "OCRPremium" | "Factur-X";
  };
  body: Buffer;
}

export async function ocr(options: ISendImgOrPdfOptions) {
  firmAccessThrowWithoutSociety(options);

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

  const { data } = await httpie.post(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/octet-stream"
    },
    body: options.body
  });

  return data;
}
