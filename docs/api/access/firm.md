# Firm access

[<-- Back](../../../README.md)

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";

const options: MyUnisoft.access.firm.IFirmAuthenticateOptions = {
  mail: process.env.MYUNISOFT_MAIL,
  password: process.env.MYUNISOFT_PASSWORD
};

const data: MyUnisoft.access.firm.IFirmAuthenticateResponse = await MyUnisoft.access.firm.authenticate(options);
```

## Interfaces

```ts
type authenticate = (options: IFirmAuthenticateOptions) => Promise<IFirmAuthenticateResponse>;

interface IFirmAuthenticateOptions {
  mail: string;
  password: string;

  /** Entity/Schema/Firm id or name. Required if the account is linked to multiple entities */
  firm?: string | number;
}

interface IFirmAuthenticateResponse {
  api_token: string;
  expiresIn: string;
  firm: {
    id: number;
    label: string;
  }
}
```
