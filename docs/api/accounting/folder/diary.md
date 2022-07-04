# Diary

[<-- Back](../../../../README.md)

## Get all
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IDefaultHeaderOptions = {
  accessToken,

  /** Only if you are authenticated with a firm access. */
  societyId: 1234
}

const data: Windev.Society.Diary[] = await MyUnisfot.compta.society.diary(options);
```

## Interfaces
- [IDefaultHeaderOptions](../../../interfaces/common.md).

```ts
type diary = (options: IDefaultHeaderOptions) => Promise<Diary[]>;

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
