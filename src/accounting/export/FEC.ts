// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultHeaderOptions, getDefaultHeaders, setSearchParams } from "../../constants";

export interface IGetFECEntriesOptions extends IDefaultHeaderOptions {
  params: {
    /**
     * 0 = export à base de ID_EXERCICE.
     *
     * 1 = export à base de DATE DEBUT * DATE FIN.
     */
    exportType: 0 | 1;

    /** Format: YYYY-MM-DD */
    from: string;

    /** Format: YYYY-MM-DD */
    to: string;
  };
  body: Buffer | string;
}

export async function getEntries(options: IGetFECEntriesOptions) {
  const endpoint = new URL("/api/v1/export/fec", BASE_API_URL);
  setSearchParams(endpoint, options.params, {
    exportType: "export_type"
  });

  const { data } = await httpie.post<{status: string}>(endpoint, {
    headers: {
      ...getDefaultHeaders(options),
      "content-type": "text/plain"
    },
    body: options.body
  });

  return data;
}
