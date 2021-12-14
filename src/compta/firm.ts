// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";
import { isFirmAccess } from "../authenticate/access_type";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  IDefaultHeaderOptions,
  IDefaultOptions,
  setDefaultHeaderOptions,
  setSearchParams
} from "../constants";

export async function getUsersV2(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/users_v2", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getPhysicalPersons(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/pers_physique", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getWallets(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/wallet", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getFirms(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/member", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

/**
 * Admin EC.
 */
export async function getDashboardModules(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/dashboard/modules", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export async function getCompanies(options: IDefaultHeaderOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.SocietiesArray>(endpoint, {
    ...setDefaultHeaderOptions(options)
  });

  return data;
}

export interface ISearchCompanyByRefOptions extends IDefaultOptions {
  params: {
    reference: string;
  }
}

export async function getCompanyByRef(options: ISearchCompanyByRefOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }

  const endpoint = new URL("/api/v1/society/search", BASE_API_URL);
  endpoint.searchParams.set("reference", options.params.reference);

  const { data } = await httpie.get<Windev.Society.CompanyInfo>(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

export interface IGetReviewOptions extends IDefaultOptions {
  params?: {
    /**
     * OPTIONAL. For a specific review.
     */
    reviewId: number;
  };
}

export async function getReview(options: IGetReviewOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/dadp/dossier_revision_list", BASE_API_URL);
  setSearchParams(endpoint, options.params, { reviewId: "review_id" });

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

interface CommonReviewParams {
  reviewId: number;
  sectionId: number;

  /**
   * Format: YYYY-MM-DD
   */
  startDate: string;

  /**
   * Format: YYYY-MM-DD
   */
  endDate: string;

  /**
   * Code ou Label du cycle.
   */
  cycleRef?: string;
}

export interface IGetCycleOfReviewOptions extends IDefaultOptions {
  params: CommonReviewParams;
}

export async function getCycleOfReview(options: IGetCycleOfReviewOptions) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/dadp/cycle", BASE_API_URL);
  endpoint.searchParams.set("category", "DA");
  setSearchParams(endpoint, options.params, {
    reviewId: "dossier_revision_id",
    startDate: "start_date",
    endDate: "end_date",
    cycleRef: "cycle_da_dp_id",
    sectionId: "section_id"
  });

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}

export interface IWorkProgramOfReview extends IGetCycleOfReviewOptions {
  params: CommonReviewParams & {
    /**
     * 0 pour toutes les diligences. 1 WorkSheets seulement.
     */
    workSheetOnly: 0 | 1;
  };
}

export async function getWorkProgramOfReview(options: IWorkProgramOfReview) {
  if (!isFirmAccess()) {
    return new Error("This endpoint only works with a cabinet (firm) access.");
  }
  firmAccessThrowWithoutSociety(options.header);

  const endpoint = new URL("/api/v1/dadp/cycle", BASE_API_URL);
  endpoint.searchParams.set("category", "DA");
  setSearchParams(endpoint, options.params, {
    reviewId: "review_id",
    startDate: "start_date",
    endDate: "end_date",
    cycleRef: "cycle_id",
    sectionId: "section_id"
  });

  const { data } = await httpie.get(endpoint, {
    ...setDefaultHeaderOptions(options.header)
  });

  return data;
}
