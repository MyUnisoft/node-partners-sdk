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
```