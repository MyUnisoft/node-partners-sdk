// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, setDefaultHeaderOptions } from "../../constants";

export interface ISendFECOptions extends IDefaultOptions {
  params: {
    exerciceId: number;
    filename: string;

    /**
     * 0 = check if there is entries on the exercise (returns an error message).
     *
     * 1 = no verification, the data is added to the existing exercise.
     *
     * 2 = delete the entries if present on the exercise.
     */
    type: 0 | 1 | 2;
  };
  body: Buffer | string;
}

export async function sendTRA(options: ISendFECOptions) {
  const endpoint = new URL("/api/v1/fec", BASE_API_URL);

  options.header.contentType = "application/octet-stream";

  const { data } = await httpie.post<{status: string}>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

