# Wallets

[<-- Back](../../../../README.md)

> **Firm access is required.**

📢 Each wallet is related to a list of companies and users.


## Get all
Get/fetch the list of wallets (portefeuilles).

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IDefaultHeaderOptions = {
  accessToken
};

const data = await MyUnisoft.compta.firm.getWallets(options);
```

## Interfaces
- [IDefaultHeaderOptions](../../../interfaces/common.md)

```ts
type getWallets = (options: IDefaultHeaderOptions) => Promise<any>;
```
