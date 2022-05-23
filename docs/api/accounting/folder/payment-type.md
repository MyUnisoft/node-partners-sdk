# Payment type

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

const data: Windev.Society.PaymentType[] = await MyUnisfot.compta.society.paymentType(options);
```

## Interfaces
- [IDefaultHeaderOptions](../../../interfaces/common.md)


```ts
type paymentType = (options: IDefaultHeaderOptions) => Promise<PaymentType[]>;

interface PaymentType {
  payment_type_id: number;
  name: string;
  code: string;
}
```
