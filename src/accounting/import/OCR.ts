// Import Node.js Dependencies
import { ReadStream } from "fs";

// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import {
  getDefaultHeaders,
  IDefaultHeaderOptions,
  enumInvoiceType,
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  rateLimitChecker
} from "../../constants";

export interface ISendImgOrPdfOptions extends IDefaultHeaderOptions {
  extension: "pdf" | "jpg";
  name: string;
  invoiceType: "Achat" | "Frais" | "Vente" | "Avoir";
  ocrType: "Manuel" | "OCRMyUnisoft" | "OCRPremium" | "Factur-X";
  body: Buffer | ReadableStream | ReadStream;
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
  endpoint.searchParams.set("extension", options.extension);
  endpoint.searchParams.set("name", options.name);
  endpoint.searchParams.set("invoice_type_id", enumInvoiceType[options.invoiceType]);
  endpoint.searchParams.set("ocr_type_id", enumOCRType[options.ocrType]);

  const { data } = await httpie.post<{status: string}>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "application/octet-stream"
    },
    limit: rateLimitChecker(options.accessToken),
    body: options.body
  });

  return data;
}
