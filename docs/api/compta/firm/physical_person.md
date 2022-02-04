# Physical person

> 📌 **Firm access is required.**

## Get all

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IDefaultHeaderOptions = {
  accessToken
};

const data: Windev.User.PhysicalPerson = await MyUnisoft.compta.firm.getPhysicalPersons(options);
```

## Interfaces
- [IDefaultHeaderOptions](../../../interfaces/common.md)
- [PhysicalPerson](https://github.com/MyUnisoft/tsd/blob/main/types/windev/user.d.ts#L1)

```ts
type getPhysicalPersons = (options: IDefaultHeaderOptions) => Promise<PhysicalPerson>;
```