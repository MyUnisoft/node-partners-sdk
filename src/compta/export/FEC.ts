// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { IDefaultOptions, setDefaultHeaderOptions, setSearchParams } from "../../constants";

export interface IGetFECEntriesOptions extends IDefaultOptions {
  params: {
    /**
     * 0 = export à base de ID_EXERCICE.
     *
     * 1 = export à base de DATE DEBUT * DATE FIN.
     */
    exportType: 0 | 1;

    /** Format: YYYY-MM-DD */
    from: string;

    to: string;
  };
  body: Buffer | string;
}

export async function getEntries(options: IGetFECEntriesOptions) {
  const endpoint = new URL("/api/v1/entries");
  endpoint.searchParams.set("export_type", String(options.params.exportType));
  setSearchParams(endpoint, options.params);

  options.header.contentType = "application/json";

  const { data } = await httpie.get<{status: string}>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
