
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

## 📜 [API](./docs/api)

> WORK IN PROGRESS

### [Configure](./docs/api/configure.md)

### [Access](./docs/api/access)
- [Firm](./docs/api/access/firm.md)
- [Society](./docs/api/access/society.md)

### [Accounting](./docs/api/compta)
- [Folder](./docs/api/accounting/folder)
  - [Informations of the accounting folder](./docs/api/accounting/folder/society-info.md)
  - [Diaries](./docs/api/accounting/folder/diary.md)
  - [Exercices](./docs/api/accounting/folder/exercices.md)
  - [Balance](./docs/api/accounting/folder/balance.md)
  - [Grand Livre](./docs/api/accounting/folder/grandèlivre.md)
  - [Payment type](./docs/api/accounting/folder/payment-type.md)
  - [VAT](./docs/api/accounting/folder/vat.md)

## License
MIT
