// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { BASE_API_URL, IDefaultOptions, getDefaultOptions } from "../constants";

export async function usersV2(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/users_v2", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

export async function persPhysique(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/pers_physique", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}

// TODO: implement options
export async function balance(options: IDefaultOptions) {
  const endpoint = new URL("/api/v1/balance_dynamique", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...getDefaultOptions(options)
  });

  return data;
}
