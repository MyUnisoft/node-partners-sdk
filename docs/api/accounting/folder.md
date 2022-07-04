# Folder

> [Back to root API](../../../README.md#📜-api)

## API
<details>
  <summary>Get Exercices</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getExercices = (options: IDefaultHeaderOptions) => Promise<Windev.Society.Exercice[]>
```
### Exemple Get Exercice

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken,
  accountingFolderId: 1
};

const data = await MyUnisoft.accounting.folder.getExercices(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### Exercice

```ts
interface Exercice {
  exercice_id: number;
  start_date: string;
  end_date: string;

  /**Label de l'exercice ( N-1, N, N+1 etc..) */
  label: string;

  result: number;

  /**Chiffre d'affaire sur l'exercice. */
  ca: number;
  closed: boolean;
  duration: number;
  closed_at: null | string;

  /**ID de la personne qui a clotûré l'exercice. */
  closed_by: null | number;

  review_model: {
    label: string;
    id_review_model: number;
  };

  lettering_method_id: number;
}
```
</details>

<details>
  <summary>Get Diaries</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getDiaries = (options: IDefaultHeaderOptions) => Promise<Windev.Society.Diary[]>
```

### Exemple Get Diaries

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken,
  accountingFolderId: 1
};

const data = await MyUnisoft.accounting.folder.getDiaries(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### Diaries
```ts
interface DiaryType {
  ACH: 1,
  VTE: 2,
  BQ: 3,
  CAISSE: 4,
  OD: 5,
  OD_AUDIT: 7,
  A_EXT: 8,
  EXT: 9,
  AN: 10,
  OD_PAIE: 11,
  OD_LET: 12,
  NDF: 13,
  OD_DECL_FISCALE: 14,
  OD_EXC: 15
}

interface Diary<T = DiaryType> {
  code: string;
  name: string;
  closed: boolean;
  account: null | {
    id: number;
    label: string;
    number: string;
  };
  blocked: boolean;
  diary_id: number;
  diary_type_id: T[keyof T];
  diary_type_code: keyof T;
  diary_type_name: string;
}
```
</details>

<details>
  <summary>Get Vat Parameters</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getVatParameters = (options: IDefaultHeaderOptions) => Promise<Windev.Vat.VatParam[]>
```

### Exemple Get Vat Parameters
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken,
  accountingFolderId: 1
};

const data = await MyUnisoft.accounting.folder.getVatParameters(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### VatParam
- [Account](../../interfaces/account.md)
```ts
interface VatParam { 
  vat_param_id: number;
  code: string;
  account_ded: Except<Account, "counterpart_account">;
  account_coll: Except<Account, "counterpart_account">;
  vat: {
    id: number;
    rate: number;
  };
  vat_type: VatType;
  vat_exigility: VatExigility;
  blocked: boolean;
}

interface VatType {
  id: number;
  label: string;
  code: string;
}

interface VatExigility {
  id: number;
  label: string;
  code: string;
}

interface VatRegime {
  id: number;
  name: string;
  code: string;
}
```
</details>

<details>
  <summary>Get Payment Type</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getPaymentType = (options: IDefaultHeaderOptions) => Promise<Windev.Vat.PaymentType[]>
```

### Exemple Get Payment Type
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken,
  accountingFolderId: 1
};

const data = await MyUnisoft.accounting.folder.getPaymentType(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### PaymentType
```ts
interface PaymentType {
  payment_type_id: number;
  name: string;
  code: string;
}
```
</details>

<details>
  <summary>Get Information</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getInformation = (options: IDefaultHeaderOptions) => Promise<Society.Vat.Company>
```

### Exemple Get Information
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: MyUnisoft.IDefaultHeaderOptions = {
  accessToken,
  accountingFolderId: 1
};

const data = await MyUnisoft.accounting.folder.getInformation(options);
```

### Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md)

#### Company
```ts
interface CommonField {
  id: number;
  label: string;
  value: string;
}

interface Coordonnee extends CommonField {
  type: CommonField;
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

interface PhysicalPersonEnFR { //  Nom temporaire.
  id_ex: number;
  prenom: string;
  nom: string;
}

interface Logo {
  id: number;
  token: string;
  label: string;
  link: string;
  thumbnail: string;
  download: string;
  baseURL: string;
}

interface Company extends Omit<CompanyInfo, "ape" | "city" | "road_type" | "address_number"> {
  /**Code [APE](https://www.insee.fr/fr/information/2406147). */
  ape: CommonField | null;

  register: CommonField | null;

  /**Statut juridique */
  legal_form: null | {
    id: number;
    label: string;
    code: string;
  };

  road_type: CommonField | null;
  owner_company: CommonField;

  /**??? */
  bilan: null;
  impot: null;

  /**Régime TVA */
  vat_regime: CommonField | null;

  /**Dans l'ancien fichier, footer a les même params que Logo ici... */
  footer: null;

  city: Omit<CommonField, "id">;
  comment: string;
  society_id: number;
  name: string;
  siret: string;
  activity: string;

  /**Code Référence d'Obligation Fiscale (ROF) de la TVA.  */
  rof_tva: string;

  /**Code Référence d'Obligation Fiscale (ROF) Transfert des Données Fiscales et Comptables (TDFC). */
  rof_tdfc: string;

  /**Code Référence d'Obligation Fiscale (ROF) de Cotisation Fonciere des Entreprise (CFE). */
  rof_cfe: string

  /**Code Référence d'Obligation Fiscale (ROF) de la Cotisation sur la Valeur Ajoutée des Entreprises (CVAE). */
  rof_cvae: string;

  address_number: string;

  /**Identifiant de l'expert comptable de la société. */
  id_accountant: number | null;
  accountant: PhysicalPersonEnFR;

  /**Identitfiant du responsable de mission de la société. */
  id_rm: number | null;
  rm: PhysicalPersonEnFR | null;

  id_collab: number | null;
  collab: PhysicalPersonEnFR | null;

  adherent_code: string;
  logo: Logo | null;

  id_centre_gestion: number | null;

  /**Code du régime d'imposition. */
  code_sheet_group: string;

  /**Date d'immatriculation. */
  registration_date: string;

  /**Clotûre automatique des écritures lors de l'envoi de la TVA. */
  close_entries_VAT: boolean;

  axe: CommonField | null;

  formule_code: string;
}
```
</details>

<details>
  <summary>Get Dynamic Balance From Exercice</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getDynamicBalanceFromExercice = (options: IBalanceByExercice) => Promise<IBalanceDynamique>
```

### Exemple Get Dynamic Balance From Exercice
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: IBalanceByExercice = {
  accessToken,
  accountingFolderId: 1,
  axisId: 1
};

const data = await MyUnisoft.accounting.folder.getDynamicBalanceFromExercice(options);
```

### Interfaces

#### IBalanceByExercice
- [IDefaultHeaderOptions](../../interfaces/common.md)
```ts
interface IBalanceByExercice extends IDefaultHeaderOptions {
  /**
   * ID de l’exercice dont on souhaite la balance.
   */
  exerciceId?: number;

  /**
   * ID de l’axe dont on souhaite la balance.
   */
  axisId: number;

  type?: "compare" | "aged";
}
```

#### IBalanceDynamique
- [IBalanceDynamique](./folder.md#ibalancedynamique-2)
</details>

<details>
  <summary>Get Dynamic Balance From Date</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getDynamicBalanceFromDate = (options: IBalanceByDate) => Promise<IBalanceDynamique>
```

### Exemple Get Dynamic Balance From Date
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: IBalanceByExercice = {
  accessToken,
  accountingFolderId: 1,
  startDate: "20210101",
  endDate: "20211231",
  axisId: 1
};

const data = await MyUnisoft.accounting.folder.getDynamicBalanceFromDate(options);
```

### Interfaces

#### IBalanceByDate
- [IDefaultHeaderOptions](../../interfaces/common.md)
```ts
interface IBalanceByDate extends IDefaultHeaderOptions {
  /**
   * Format: YYYYMMDD
   */
  startDate: string;

  /**
   * Format: YYYYMMDD
   */
  endDate: string;

  /**
   * ID de l’axe dont on souhaite la balance.
   */
  axisId: number;
}
```

#### IBalanceDynamique
- [IBalanceDynamique](./folder.md#ibalancedynamique-2)

</details>

<details>
  <summary>Get Grand Livre</summary>

```ts
  type getGrandLivre = (options: IGetGrandLivreOptions) => Promise<string>
```

### Exemple Get Grand Livre
```ts
import fs from "fs";
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";


const options: IGetGrandLivreOptions = {
  accessToken,
  accountingFolderId: 1,
  startDate: "2021-01-01",
  endDate: "2021-12-31"
};

const data = await MyUnisoft.accounting.folder.getDynamicBalanceFromDate(options);

await fs.promises.writeFile("myPdf.pdf", data)
```

### Interfaces

#### IGetGrandLivreOptions
- [IDefaultHeaderOptions](../../interfaces/common.md)
```ts
interface IGetGrandLivreOptions extends IDefaultHeaderOptions {
  /**
   * Format: YYYY-MM-DD
   */
  startDate: string;

  /**
   * Format: YYYY-MM-DD
   */
  endDate: string;
  xls?: boolean;
}
```

</details>

<details>
  <summary>Get Grand Livre Stream</summary>

```ts
  type getGrandLivreStream = (options: IGetGrandLivreOptions) => Promise<string>
```

### Exemple Get Grand Livre Stream
```ts
import fs from "fs";
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IGetGrandLivreOptions = {
  accessToken,
  accountingFolderId: 1,
  startDate: "2021-01-01",
  endDate: "2021-12-31"
};

const cursor = await MyUnisoft.accounting.folder.getDynamicBalanceFromDate(options);

cursor(fs.createWritableStream("myPdf.pdf"));
```

### Interfaces

#### IGetGrandLivreOptions
- [IDefaultHeaderOptions](../../interfaces/common.md)
```ts
interface IGetGrandLivreOptions extends IDefaultHeaderOptions {
  /**
   * Format: YYYY-MM-DD
   */
  startDate: string;

  /**
   * Format: YYYY-MM-DD
   */
  endDate: string;
  xls?: boolean;
}
```

</details>

---

## General Interfaces

### IDefaultHeaderOptions
- [IDefaultHeaderOptions](../../../interfaces/common.md)

### IBalanceDynamique
```ts
interface IBalanceDynamique {
  exercice: {
    id: number;
    label: string;
    start_date: string;
    end_date: string;
  }
}
```
</details>

---

> [Back to root API](../../../README.md#📜-api)
