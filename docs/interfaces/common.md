```ts
/**
 * @description Default interface for all requests options
 */
interface IDefaultHeaderOptions {
  /** API Bearer Token */
  accessToken: string;

  /** Company (dossier de production) id */
  societyId?: string | number;

  contentType?:
  "text/plain" |
  "application/zip" |
  "application/octect" |
  "application/json" |
  "application/octet-stream" |
  "application/x-www-form-urlencoded";
}

interface IDefaultOptions {
  header: IDefaultHeaderOptions
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
```