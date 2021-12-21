# Society access
>Once your API token is generated, it is no longer necessary to use this function (unless the token has been revoked).

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";

const payload: MyUnisfot.auth.society.ISocietyAccessOptions = {
  mail: "Your@mail",
  password: "Your password",
  companyId: 1234 
};

const { value: accessToken } = await Myunisoft.auth.society.generateKey(payload);
```

If everything worked fine, you can use the function **getEndpoints** to get the list of authorized endpoints:
```ts
const options: IDefaultHeaderOptions = { accessToken };
const endpoints: Endpoint[] = await Myunisoft.auth.society.getEndpoints(options);
```

## Interfaces
- [IDefaultHeaderOptions](../../interfaces/common.md).

```ts
type generateKey = (payload: ISocietyAccessOptions) => Promise<any>;

interface ISocietyAccessOptions {
  mail: string;
  password: string;

  /**
   * ID of the company that will be linked to the APItoken.
   */
  companyId: number;
}

interface Endpoint {
  path: string;
  method: "get" | "post" | "put" | "delete";
}

type getEndpoints = (options: IDefaultHeaderOptions) => Promise<Endpoint[]>;

```
