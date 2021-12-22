# Users
📢 Get/fetch the list of users.

Users should not be confused with physical persons. A user can be a physical person but the reverse is not necessarily true.

From a technical point of view, a user is first and foremost someone who has access to the MyUnisoft solution (and more specifically to the firm).

> 📌 **Firm access is required.**

## Get all
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IDefaultHeaderOptions = {
  accessToken
};

const data: Windev.User.UsersResponse = await MyUnisoft.compta.firm.getUsers(options);
```

## Interfaces
- [IDefaultHeaderOptions](../../../interfaces/common.md)
- [UsersResponse](https://github.com/MyUnisoft/tsd/blob/main/types/windev/user.d.ts#L49)

```ts
type getUsers = (options: IDefaultHeaderOptions) => Promise<UsersResponse>;
```
