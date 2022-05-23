# Account

> [Back to root API](../../../../README.md#📜-api)

## API
<details>
  <summary>Get all</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type geAll = (options: IGetAllOptions) => Promise<Windev.Account.SimplifiedAccount[]>
```

### Exemple Get All

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IGetAllOptions = {
  accessToken,
  accountingFolderId: 1
}

const data: Windev.Account.SimplifiedAccount[] = await MyUnisfot.accounting.account.geAll(options);
```

### Interfaces

#### IGetAllOptions
- [IDefaultHeaderOptions](../../../interfaces/common.md)

```ts
interface IGetAllOptions extends IDefaultHeaderOptions {
  /**
   * @description
   * OPTIONAL.
   *
   * Retrieves:
   * - accounts where the account label includes accountNumber.
   * - accounts where the account number starts with accountNumber.
   */
  accountNumber?: string;

  /**
   * OPTIONAL. Default value: 5.
  */
 limit?: number;
}
```

#### SimplifiedAccount
 - [Account](../../../interfaces/account.md)
```ts
interface SimplifiedAccount extends Account {
  array_counterpart_account?: CounterpartAccountLine[] | null;
}
```

#### CounterpartAccountLine
```ts
interface CounterpartAccountLine extends Except<Account, "counterpart_account"> {
  num_ordre: string;
  vat_param: VatParam | null;
}

interface Account {
  /** Internal (postgres incremented) account id */
  account_id: number;

  /** Account number (or class). Example: 411FOOBAR */
  account_number: string;

  /** Account name */
  label: string;
  counterpart_account?: AccountNoCp | null;
}

type AccountNoCp = Except<Account, "counterpart_account">;
```

</details>

<details>
  <summary>Get All Detailed</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getAllDetailed = (options: IGetAllDetailedOptions) => Promise<Windev.Society.DetailedAccounts>
```

### Exemple Get All Detailed

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IGetAllDetailedOptions = {
  accessToken,
  accountingFolderId: 1
}

const data: Windev.Society.DetailedAccounts = await MyUnisfot.accounting.account.getAllDetailed(options);
```

### Interfaces

#### IGetAllDetailedOptions
- [IDefaultHeaderOptions](../../../interfaces/common.md)

```ts
export interface IGetAllDetailedOptions extends IDefaultHeaderOptions {
  /**
   * @description OPTIONAL. Retrieves accounts where the account number starts with begin_by.
   */
  accountNumber?: string;

  sort?: {
    column: "";
    direction: "asc" | "desc";
  };
}
```

#### Detailed Accounts
- [Account](../../../interfaces/account.md)
```ts
interface DetailedAccounts {
  account_array: DetailedAccount[] | null;
}

type DetailedAccount = SimplifiedAccount & DeepNullable<AccountDetails>;

interface AccountDetails {
  solde: number;
  sens: string;
  comment: string;
  intraco: boolean;
  btp_autoliquidation: boolean;
  presta: boolean;
  exoneration: boolean;
  das_2: boolean;
  blocked: boolean;
  vat_param: VatParam;
  array_counterpart_account: CounterpartAccountLine[];
  complementary_informations: ComplementaryInformations;
  society_id: number;
  closed: boolean;
}

interface CounterpartAccountLine extends Except<Account, "counterpart_account"> {
  num_ordre: string;
  vat_param: VatParam | null;
}

interface ComplementaryInformations {
  id_info_compte_tiers: number;
  person_in_charge: string;
  address_number: string;
  indice_repetition: string;
  address: string;
  address_complement: string;
  postal_code: string;
  city: string;
  siren: string;
  name: string;
  contact_lastname: string;
  contact_firstname: string;
  function: string;
  tel: string;
  email: string;
  comment: string;
  profession: string;
  firstname: string;
  lastname: string;
  type_info_compte_tiers: number;
  iban_list: Iban[];
  way_type: WayType;
  amount_type_paid: AmountTypePaid;
  ape: Ape;
  id_payment_deadline: number;
  payment_deadline: PaymentDeadline;
  payment_type_id: number;
  payment_type: PaymentType;
}
```

</details>

<details>
  <summary>Find Or Create</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type findOrCreate = (options: IGetAllDetailedOptions) => Promise<Windev.Account.Account>
```

### Exemple Find or Create

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IFindOrCreateOptions = {
  accessToken,
  accountingFolderId: 1,
  accountNumber: "01",
  label: "ACHAT"
}
const data: Windev.Account.Account = await MyUnisfot.accounting.account.findOrCreate(options);
```

### Interfaces
- [Account](../../../interfaces/account.md)

#### IFindOrCreateOptions
- [IDefaultHeaderOptions](../../../interfaces/common.md)

```ts
export interface IFindOrCreateOptions extends IDefaultHeaderOptions {
  accountNumber: string;
  label: string;
}
```

</details>

<details>
  <summary>Update Account</summary>

> ⚠️ Require Firm Authentication !  

```ts
  type updateAccount = (options: IUpdateAccountOptions) => Promise<Windev.Account.Account | { status: string; message: string; }>
```

### Exemple Update Account

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IUpdateAccountOptions = {
  accessToken,
  accountNumber: "101200",
  searchDate: { start_date: "20210101", end_date: "20211231" }
}
const data: Windev.Account.Account = await MyUnisfot.accounting.account.updateAccount(options);
```

### Interfaces
- [Account](../../../interfaces/account.md)

#### IUpdateAccountOptions
- [IDefaultHeaderOptions](../../../interfaces/common.md)

```ts
export interface IUpdateAccountOptions extends IDefaultHeaderOptions {
  body: Windev.Account.UpdateAccount;
}
```
</details>

<details>
  <summary>Get Line Entries</summary>

> ⚠️ Require Firm Authentication !  
> ⚠️ Require accountingFolderId !

```ts
  type getLineEntries = (options: RequireExactlyOne<ILineEntriesOptions, "accountId" | "accountNumber">) => Promise<Windev.Account.AccountEntries>
```

### Exemple Get Line Entries
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: ILineEntriesOptions = {
  accessToken,
  accountingFolderId: 1,
  accountNumber: "101200",
  searchDate: { start_date: "20210101", end_date: "20211231" }
}
const data: Windev.Account.Account = await MyUnisfot.accounting.account.getLineEntries(options);
```

### Interfaces

#### ILineEntriesOptions

```ts
export interface ILineEntriesOptions extends IDefaultHeaderOptions {
  /**
 * Type de filtrage sur le lettrage.
 */
  lettering?: "false" | "true" | "date";

  /**
  * Identifiant du compte pour lequel on veut récupérer les écritures.
  * Soit ILineEntriesOptions.account_id, soit ILineEntriesOptions.account_no. */
  accountId?: number;

  /**
  * Permet de filtrer sur les comptes qui commencent par XXX.
  * Soit ILineEntriesOptions.account_id, soit ILineEntriesOptions.account_no.
  */
  accountNumber?: string;

  /**
  * Période pour laquel on va retourner les lignes d'écritures.
  * Format des dates: YYYYMMDD
  */
  searchDate?: {
    start_date: string;
    end_date: string;
  }

  /**
  * Permet de selectionner le type d'écriture à remonter.
  */
  entryTypes?: "SITU" | "NORM";
}
```
</details>

---

## General Interfaces
- [IDefaultHeaderOptions](../../../interfaces/common.md)
- [Account](../../../interfaces/account.md)


---

> [Back to root API](../../../../README.md#📜-api)
