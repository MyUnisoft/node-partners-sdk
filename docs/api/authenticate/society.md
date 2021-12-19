# Society access
Once your API token is generated, it is no longer necessary to use this function (unless the token has been revoked).

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { ApiToken } from "@myunisoft/tsd";

const options: MyUnisfot.auth.society.ISocietyAccessOptions = {
  mail: "Your@mail",
  password: "Your password",
  companyId: 1234 
};

const data: ApiToken = await generateKey(options);
```

## Interfaces
```ts
type generateKey = (options: ISocietyAccessOptions) => Promise<ApiToken>;

interface ISocietyAccessOptions {
  mail: string;
  password: string;

  /**
   * ID of the company that will be linked to the APItoken.
   */
  companyId: number;
}

interface ApiToken {
  type: "api";
  member_group_id: number;
  third_party_id: number;
  society_id: number;
}
```
