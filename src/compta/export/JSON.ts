// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, setDefaultHeaderOptions } from "../../constants";

export interface IGetEntriesOptions extends IDefaultOptions {
  params: {
    /**
     * E = ECRITURE.
     *
     * O = ECRITURE OCR/ECRITURE EN ATTENTE.
     *
     * IB = ECRITURE INTEGRATION BANCAIRE.
     *
     * M = ECRITURE MANUEL.
     *
     * EXT = ECRITURE EXTOURNE.
     *
     * L = ECRITURE LETTRAGE.
     */
    type: "E" | "O" | "IB" | "M" | "EXT" | "L";
  };
  body: Buffer | string;
}

// dans compta/export/index ?
export async function getEntries(options: IGetEntriesOptions) {
  const endpoint = new URL("/api/v1/entries", BASE_API_URL);
  endpoint.searchParams.set("type", options.params.type);

  options.header.contentType = "application/json";

  const { data } = await httpie.post<{status: string}>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
