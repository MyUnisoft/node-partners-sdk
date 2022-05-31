# Firm

> [Back to root API](../../../README.md#📜-api)

## API
<details>
  <summary>Get Users</summary>

> ⚠️ Require Firm Authentication !

```ts
  type getUsers = (options: IDefaultHeaderOptions) => Promise<Windev.User.UsersResponse>
```

### Exemple Get Users

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken
};

const data = await MyUnisoft.accounting.firm.getExercices(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### UsersResponse
```ts
interface UsersResponse {
  bdelete: number;
  user_array: User[];
}

interface User {
  tel: string | null;
  mail: UserPersonalDetail | null;
  name: string;
  badmin: boolean;
  tel_fix: UserPersonalDetail | null;
  user_id: number;
  civility: string | null;
  firstname: string;
  groupslst: Group[];
  id_profil: number;
  access_list: AccessList[];
  civility_id: number | null;
  maiden_name: string | null;
  safe_status: boolean;
  tel_portable: UserPersonalDetail | null;
  id_type_profil: number;
  libelle_profil: string;
  display_safe_choice: boolean;
  libelle_type_profil: string;
}

interface AccessList {
  label: string | null;
  siret: string | null;
  acces_id: number;
  profil_id: number;
  wallet_id: number | null;
  society_id: number | null;
  profil_name: string;
  wallet_label: string | null;
  id_type_profil: number;
  libelle_type_profil: string;
}

interface Group {
  fonctions: string;
  id_fonction: number;
  id_l_users_groups_pers_physique: number;
}

interface UserPersonalDetail {
  id: number;
  coordonnee: string;
}
```
</details>

<details>
  <summary>Get Physical Persons</summary>

> ⚠️ Require Firm Authentication !

```ts
  type getPhysicalPersons = (options: IDefaultHeaderOptions) => Promise<Windev.User.PhysicalPerson[]>
```

### Exemple Get Physical Persons

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken
};

const data = await MyUnisoft.accounting.firm.getPhysicalPersons(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### UsersResponse
```ts
interface PhysicalPerson {
  name: string;
  actif: boolean;
  civility: GenericField;
  firstname: string;
  coordonnee?: PhysicalPersonDetail[];
  company_number: number;
  pers_physique_id: number;
  physical_person_type?: GenericField;
  city?: string;
  address?: string;
  comment?: string;
  company?: Company[];
  road_type?: GenericField;
  city_birth?: string;
  maiden_name?: string;
  postal_code?: string;
  country_birth?: string;
  address_number?: string;
  country_address?: string;
  department_birth?: string;
  address_complement?: string;
  address_repetition?: string;
  social_security_number?: string;
  marital_situation?: GenericField;
  organism?: string;
  date_birth?: string;
  matrimonial_regime?: GenericField;
}

interface GenericField {
  id?: number;
  label?: string;
  value?: string;
}

interface PhysicalPersonDetail {
  id: number;
  type: GenericField;
  value: string;
  label?: string;
}

interface Company {
  society_id: number;
  society_name: string;
}
```
</details>

<details>
  <summary>Get Wallets</summary>

> ⚠️ Require Firm Authentication !

```ts
  type getWallets = (options: IDefaultHeaderOptions) => Promise<IWallet[]>
```

### Exemple Get Wallets

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken
};

const data = await MyUnisoft.accounting.firm.getWallets(options);
```
### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### IWallet
```ts
interface IWallet {
  id_wallet: number;
  main_wallet: boolean;
  libelle: string;
  nb_society: number;
  list_society: IWalletListSociety[];
  nb_users: number;
  list_users: IWalletListUser[];
  blocked: boolean
}

interface IWalletListSociety {
  name: string;
  id_society: number;
}

interface IWalletListUser {
  name: string;
  firstname: string;
  id_pers_physique: number;
}
```
</details>

<details>
  <summary>Get Accounting Firms</summary>

> ⚠️ Require Firm Authentication !

```ts
  type getAccountingFirms = (options: IDefaultHeaderOptions) => Promise<IFirm>
```

### Exemple Get Accounting Firms
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken
};

const data = await MyUnisoft.accounting.firm.getAccountingFirms(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### IFirm
```ts
interface IFirm {
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
```
</details>

<details>
  <summary>Get Dashboard Modules</summary>

> ⚠️ Require Firm Authentication !

```ts
  type getDashboardModules = (options: IDefaultHeaderOptions) => Promise<IDashbordModule>
```

### Exemple Get Dashboard Modules
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken
};

const data = await MyUnisoft.accounting.firm.getDashboardModules(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### IDashbordModule
```ts
interface IDashbordModule {
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
```
</details>

<details>
  <summary>Get Accounting Folders</summary>

> ⚠️ Require Firm Authentication !

```ts
  type getAccountingFolders = (options: IDefaultHeaderOptions) => Promise<Windev.Society.SocietiesArray>
```

### Exemple Get Accounting Folders
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken
};

const data = await MyUnisoft.accounting.firm.getAccountingFolders(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### SocietiesArray
```ts
interface SocietiesArray {
  row_numbers: number;
  pages_number: number | null;
  society_array: CompanyInfo[];
}

interface CompanyInfo {
  /**Code [APE](https://www.insee.fr/fr/information/2406147). */
  ape: string | null;

  city: string;
  name: string;

  /**??? */
  step: string;

  siret: string | null;

  status: string;

  /**Adresse complète. */
  address: string;

  capital: number;
  country: string;

  /**Permet de savoir si la société possède un mot de passe. */
  secured: boolean;

  /**Permet de savoir s'il y a de l'analytique sur le projet. */
  analytics: boolean;

  member_id: number;
  road_type: string | null;

  /**Complément d'adresse. */
  complement: string | null;


  coordonnee: Coordonnee[];
  society_id: number;
  address_bis: string | null;
  companyType: string;

  /**Adresse mail de contact pour les liasses. */
  mail_liasse: string | null;

  postal_code: string;

  /**Option coffre fort. */
  safe_status: boolean;

  /**Numéro d'adresse de la société. */
  street_name: string;

  address_number: number;
  id_type_company: number;
  folder_reference: string;

  /**Code [Insee](https://fr.wikipedia.org/wiki/Code_Insee). */
  insee: string;
  
  enable_quantity: boolean;
}

interface Coordonnee extends CommonField {
  type: CommonField;
}

interface CommonField {
  id: number;
  label: string;
  value: string;
}
```
</details>

<details>
  <summary>Get Company By Ref</summary>

> ⚠️ Require Firm Authentication !

```ts
  type getCompanyByRef = (options: ISearchCompanyByRefOptions) => Promise<ICompanyByRef>
```

### Exemple Get Company By Ref
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.ISearchCompanyByRefOptions = {
  accessToken,
  reference: "MYU"
};

const data = await MyUnisoft.accounting.firm.getCompanyByRef(options);
```

### Interfaces

#### ISearchCompanyByRefOptions
- [IDefaultHeaderOptions](../../interfaces/common.md)
```ts
interface ISearchCompanyByRefOptions extends IDefaultHeaderOptions {
  reference: string;
}
```

#### ICompanyByRef
```ts
interface ICompanyByRef {
  name: string;
  siret: string;
  society_id: number;
}
```
</details>

<details> 
  <summary>Get Review</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getReview = (options: IGetReviewOptions) => Promise<{dossier_revision_list: IDossierRevision[]}>
```

### Exemple Get Review
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IGetReviewOptions = {
  accessToken,
  accountingFolderId: 1
};

const data = await MyUnisoft.accounting.firm.getReview(options);
```

### Interfaces
#### IGetReviewOptions
- [IDefaultHeaderOptions](../../interfaces/common.md)
```ts
interface IGetReviewOptions extends IDefaultHeaderOptions {
  /**
   * OPTIONAL. For a specific review.
   */
  reviewId?: number;
}
```

#### IDossierRevision
```ts
interface IDossierRevision {
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
```
</details>

<details> 
  <summary>Get Cycle Of Review</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getCycleOfReview = (options: IGetCycleOfReviewOptions) => Promise<ICycleOfReview[]>
```

### Exemple Get Cycle Of Review
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IGetCycleOfReviewOptions = {
  accessToken,
  accountingFolderId: 1,
  reviewId: 1,
  sectionId: 1,
  startDate: "2021-01-01",
  endDate: "2022-04-25"
};

const data = await MyUnisoft.accounting.firm.getCycleOfReview(options);
```

### Interfaces
#### IGetCycleOfReviewOptions
- [IDefaultHeaderOptions](../../interfaces/common.md)
```ts
interface IGetCycleOfReviewOptions extends IDefaultHeaderOptions {
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
```
#### ICycleOfReview
```ts
interface ICycleOfReview {
  code: string;
  label: string;
  valid_rm: string;
  section_id: number;
  valid_collab: string;
  cycle_da_dp_id: number;
}
```
</details>

<details> 
  <summary>Get Work Program Of Review</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getWorkProgramOfReview = (options: IWorkProgramOfReview) => Promise<IWorkProgramOfReviewReply>
```

### Exemple Get Work Program Of Review
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IWorkProgramOfReview = {
  accessToken,
  accountingFolderId: 1,
  reviewId: 1,
  sectionId: 1,
  startDate: "2021-01-01",
  endDate: "2022-04-25",
  workSheetOnly: 0
};

const data = await MyUnisoft.accounting.firm.getWorkProgramOfReview(options);
```
### Interfaces
#### IWorkProgramOfReview
- [IDefaultHeaderOptions](../../interfaces/common.md)
```ts
interface IWorkProgramOfReview extends IGetCycleOfReviewOptions {
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
```
#### IWorkProgramOfReviewReply
```ts
interface IWorkProgramOfReviewReply {
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

interface IDiligence {
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
```
</details>

---

## General Interfaces

### IDefaultHeaderOptions
- [IDefaultHeaderOptions](../../../interfaces/common.md)

---

> [Back to root API](../../../README.md#📜-api)
