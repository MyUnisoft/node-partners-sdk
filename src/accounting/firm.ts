// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  getDefaultHeaders,
  IDefaultHeaderOptions,
  throwIfIsNotFirm
} from "../constants";

export async function getUsers(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/users_v2", BASE_API_URL);

  const { data } = await httpie.get<Windev.User.UsersResponse>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getPhysicalPersons(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/pers_physique", BASE_API_URL);

  const { data } = await httpie.get<Windev.User.PhysicalPerson>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getWallets(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/wallet", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getAccountingFirms(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/member", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

/**
 * Admin EC.
 */
export async function getDashboardModules(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/dashboard/modules", BASE_API_URL);

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export async function getAccountingFolders(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/society", BASE_API_URL);

  const { data } = await httpie.get<Windev.Society.SocietiesArray>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface ISearchCompanyByRefOptions extends IDefaultHeaderOptions {
  reference: string;
}

export async function getCompanyByRef(options: ISearchCompanyByRefOptions) {
  throwIfIsNotFirm();

  const endpoint = new URL("/api/v1/society/search", BASE_API_URL);
  endpoint.searchParams.set("reference", options.reference);

  const { data } = await httpie.get<Windev.Society.CompanyInfo>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface IGetReviewOptions extends IDefaultHeaderOptions {
  /**
   * OPTIONAL. For a specific review.
   */
  reviewId?: number;
}

export async function getReview(options: IGetReviewOptions) {
  throwIfIsNotFirm();
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/dadp/dossier_revision_list", BASE_API_URL);
  endpoint.searchParams.set("review_id", String(options.reviewId || ""));

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface IGetCycleOfReviewOptions extends IDefaultHeaderOptions {
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
  cycleId?: string;
}

export async function getCycleOfReview(options: IGetCycleOfReviewOptions) {
  throwIfIsNotFirm();
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/dadp/cycle", BASE_API_URL);
  endpoint.searchParams.set("category", "DA");
  endpoint.searchParams.set("dossier_revision_id", String(options.reviewId));
  endpoint.searchParams.set("start_date", options.startDate);
  endpoint.searchParams.set("end_date", options.endDate);
  endpoint.searchParams.set("cycle_da_dp_id", options.cycleId || "");
  endpoint.searchParams.set("section_id", String(options.sectionId));

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface IWorkProgramOfReview extends IGetCycleOfReviewOptions {
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
  cycleId?: string;

  /**
   * 0 pour toutes les diligences. 1 WorkSheets seulement.
   */
  workSheetOnly: 0 | 1;
}

export async function getWorkProgramOfReview(options: IWorkProgramOfReview) {
  throwIfIsNotFirm();
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/dadp/work_program", BASE_API_URL);
  endpoint.searchParams.set("category", "DA");
  endpoint.searchParams.set("review_id", String(options.reviewId));
  endpoint.searchParams.set("start_date", options.startDate);
  endpoint.searchParams.set("end_date", options.endDate);
  endpoint.searchParams.set("cycle_id", options.cycleId || "");
  endpoint.searchParams.set("section_id", String(options.sectionId));

  const { data } = await httpie.get(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}
