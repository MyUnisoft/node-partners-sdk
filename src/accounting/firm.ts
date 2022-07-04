// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Import Internal Dependencies
import {
  BASE_API_URL,
  firmAccessThrowWithoutSociety,
  getDefaultHeaders,
  IDefaultHeaderOptions,
  rateLimitChecker,
  throwIfIsNotFirm
} from "../constants";

export async function getUsers(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/users_v2", BASE_API_URL);

  const { data } = await httpie.get<Windev.User.UsersResponse>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export async function getPhysicalPersons(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/pers_physique", BASE_API_URL);

  const { data } = await httpie.get<{ array_pers_physique: Windev.User.PhysicalPerson[] }>(endpoint, {
    headers: getDefaultHeaders(options),
    limit: rateLimitChecker(options.accessToken)
  });

  return data;
}

export interface IWalletListSociety {
  name: string;
  id_society: number;
}

export interface IWalletListUser {
  name: string;
  firstname: string;
  id_pers_physique: number;
}

export interface IWallet {
  id_wallet: number;
  main_wallet: boolean;
  libelle: string;
  nb_society: number;
  list_society: IWalletListSociety[];
  nb_users: number;
  list_users: IWalletListUser[];
  blocked: boolean
}

export async function getWallets(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/wallet", BASE_API_URL);

  const { data } = await httpie.get<IWallet[]>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

export interface IFirm {
  member_id: number,
  name: string,
  address: null,
  postal_code: null,
  city: null,
  website: null,
  phone_number: null,
  email: null,
  fax: null,
  safe_status: string,
  address_ws_silae: null,
  login_ws_silae: string,
  login_silae: string,
  pw_ws_silae_secured: boolean,
  pw_silae_secured: boolean,
  street_number: null,
  repetition_index: null,
  address_complement: null,
  siret: null,
  typevoie: null
}

export async function getAccountingFirms(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/member", BASE_API_URL);

  const { data } = await httpie.get<IFirm>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}

/**
 * Admin EC.
 */

export interface IDashbordModule {
  EC: {
    id: number;
    name: string;
    initial: string;
    firstname: string;
  };
  MG: string | null;
  RD: string | null;
  secured: boolean;
  company_id: number;
  my_data_rh: boolean,
  silae_code: string | null,
  wallet_list: [
    {
      label: string;
      wallet_id: number;
    }
  ];
  company_name: string;
  type_company: {
    label: string;
    id_type_company: number;
  };
  retrieving_day: number;
  employee_app_id: string | null;
  formula_myun_id: number;
  folder_reference: string | null;
  preaccounting_id: string | null;
  accounting_process: boolean;
}

export async function getDashboardModules(options: IDefaultHeaderOptions) {
  throwIfIsNotFirm();
  const endpoint = new URL("/api/v1/dashboard/modules", BASE_API_URL);

  const { data } = await httpie.get<IDashbordModule>(endpoint, {
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

export interface ICompanyByRef {
  name: string;
  siret: string;
  society_id: number;
}

export async function getCompanyByRef(options: ISearchCompanyByRefOptions) {
  throwIfIsNotFirm();

  const endpoint = new URL("/api/v1/society/search", BASE_API_URL);
  endpoint.searchParams.set("reference", options.reference);

  const { data } = await httpie.get<ICompanyByRef>(endpoint, {
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

export interface IDossierRevision {
  type: {
    id: number;
    code: string;
    label: string;
  };
  end_date: string;
  exercice: string;
  start_date: string;
  review_model: {
    label: string;
    modifier_by: string;
    id_review_model: number;
    last_modify_date: string;
  };
  id_dossier_revision: number;
}

export async function getReview(options: IGetReviewOptions) {
  throwIfIsNotFirm();
  firmAccessThrowWithoutSociety(options);

  const endpoint = new URL("/api/v1/dadp/dossier_revision_list", BASE_API_URL);
  endpoint.searchParams.set("review_id", String(options.reviewId || ""));

  const { data } = await httpie.get<{dossier_revision_list: IDossierRevision[]}>(endpoint, {
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

export interface ICycleOfReview {
  code: string;
  label: string;
  valid_rm: string;
  section_id: number;
  valid_collab: string;
  cycle_da_dp_id: number;
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

  const { data } = await httpie.get<ICycleOfReview[]>(endpoint, {
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

export interface IDiligence {
  to: string;
  from: string;
  name: string;
  pj_list: string[]
  comments: number;
  valid_rm: string;
  diligence_id: number;
  valid_collab: string;
  link_work_sheet: string;
  custom_worksheet: {
    original_custom_worksheet: {
      link: string;
      name: string;
      token: string;
      baseUrl: string;
      download: string;
      thumbnail: string;
      document_id: number;
      original_name: string;
    }
    diligence_custom_worksheet: object
  }
  hasJustification: boolean;
  label_work_sheet: string;
}

export interface IWorkProgramOfReviewReply {
  na: {
    id: number;
    value: boolean;
  } | null;
  ref: string;
  help: string;
  name: string;
  ref_id: number;
  children: {
    id_ref_daçdp: number;
    diligence_list: IDiligence[] | null;
  }
  periodicity: string;
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

  const { data } = await httpie.get<IWorkProgramOfReviewReply>(endpoint, {
    headers: getDefaultHeaders(options)
  });

  return data;
}
