# Vat

## Get all
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IDefaultHeaderOptions = {
  accessToken,

  /** Only if you are authenticated with a firm access. */
  societyId: 1234
}

const data: Windev.Vat.VatParam[] = await MyUnisfot.compta.society.vat(options);
```

## Interfaces
- [IDefaultHeaderOptions](../../../interfaces/common.md)
- [Account](../../../interfaces/common.md)

```ts
type vat = (options: IDefaultHeaderOptions) => Promise<VatParam[]>;

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
  label_vat_type: string;
  code: string;
}

interface VatExigility {
  id: number;
  label: string;
  code: string;
}
```