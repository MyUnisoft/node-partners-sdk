
<p align="center"><h1 align="center">
  Node.js Partners SDK
</h1>

<p align="center">
  Simplify your life with the official Node.js SDK created and maintained by MyUnisoft.
</p>

<p align="center">
    <a href="https://github.com/MyUnisoft/node-partners-sdk"><img src="https://img.shields.io/github/package-json/v/MyUnisoft/node-partners-sdk?style=flat-square" alt="npm version"></a>
    <a href="https://github.com/MyUnisoft/node-partners-sdk"><img src="https://img.shields.io/github/license/MyUnisoft/node-partners-sdk?style=flat-square" alt="license"></a>
    <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg?style=flat-square" alt="Responsible Disclosure Policy" /></a>
</p>

## 👀 Why ?
- Let MyUnisoft manage breaking changes. Reduce the impact that updates will have on your implementations.
- Include TypeScript interfaces from [@myunisoft/tsd](https://github.com/MyUnisoft/tsd).
- Use [@myunisoft/httpie](https://github.com/MyUnisoft/httpie) for the most optimal performance experience (but also manage API limitations for you).
- Modern `async/await` API, including stream interfaces.
- Following strong security best practices.

## 🚧 Requirements
- [Node.js](https://nodejs.org/en/) version 14 or higher

## 🚀 Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @myunisoft/partners-sdk
# or
$ yarn add @myunisoft/partners-sdk
```

## 📚 Usage example

```ts
import dotenv from "dotenv";
import * as MyUnisoft from "@myunisoft/partners-sdk";

dotenv.config();

MyUnisoft.configure({
  secretKey: process.env.MYUNISOFT_SECRET_KEY,
  userAgent: "partnerName"
});

const { api_token: accessToken } = await MyUnisoft.access.firm.authenticate({
  mail: process.env.MYUNISOFT_MAIL,
  password: process.env.MYUNISOFT_PASSWORD
});

const diaries = await MyUnisoft.accounting.folder.diary({
  accessToken,
  /** Mandatory for 'firm' access **/
  accountingFolderId: 1
});
console.log(diaries);
```

## 📜 API

> ⚠️ WORK IN PROGRESS

### Configure

Use this function at the beginning of the runtime. We highly recommand the [dotenv](https://www.npmjs.com/package/dotenv) npm package to loads environment variables (Do not store them in the code).

```ts
export function configure(options: IConfigureOptions): void;

export interface IConfigureOptions {
  /** Name to use for the http 'user-agent' header */
  userAgent: string;

  /** The secret key provided by the MyUnisoft team for the 'X-Third-Party-Secret' header */
  secretKey: string;
}
```

---

APIs to authenticate the script or to generate tokens. Choose depending on the kind of your access:

### [Access](./docs/api/access)
- 🔹 [Firm](./docs/api/access/firm.md)
- 🔸 [Society (Folder)](./docs/api/access/society.md)

---

### [Accounting](./docs/api/compta)
- [Account](./docs/api/accounting/account/account.md)
  - [GetAll](./docs/api/accounting/account/getAll.md#exemple-get-all)
  - [GetAllDetailed](./docs/api/accounting/account/account.md#exemple-get-all-detailed)
  - [FindOrCreate](./docs/api/accounting/account/account.md#exemple-find-or-create)
  - [UpdateAccount](./docs/api/accounting/account/account.md#exemple-update-account)
  - [GetLineEntries](./docs/api/accounting/account/account.md#exemple-get-line-entries)
- [Folder](./docs/api/accounting/folder)
  - [Informations of the accounting folder](./docs/api/accounting/folder/society-info.md)
  - [Diaries](./docs/api/accounting/folder/diary.md) (Journaux)
  - [Exercices](./docs/api/accounting/folder/exercices.md)
  - [Balance](./docs/api/accounting/folder/balance.md)
  - [Grand Livre](./docs/api/accounting/folder/grandèlivre.md)
  - [Payment type](./docs/api/accounting/folder/payment-type.md) (Méthodes de paiements)
  - [VAT](./docs/api/accounting/folder/vat.md) (TVA)

## License
MIT
