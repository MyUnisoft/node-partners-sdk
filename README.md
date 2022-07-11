
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
- [Account](./docs/api/accounting/account.md)
  - Get All
  - Get AllDetailed
  - Find Or Create
  - Update Account
  - Get Line Entries
- [Folder](./docs/api/accounting/folder.md)
  - Get Exercices
  - Get Diaries
  - Get Vat Parameters
  - Get Payment Type
  - Get Information
  - Get Dynamic Balance From Exercice
  - Get Dynamic Balance From Date
  - Get Grand Livre
  - Get Grand Livre Stream
- [Firm](./docs/api/accounting/firm.md)
  - Get Users
  - Get Physical Persons
  - Get Wallets
  - Get Accounting Firms
  - Get Dashboard Modules
  - Get Accounting Folders
  - Get Company By Ref
  - Get Review
  - Get Cycle Of Review
  - Get Work Progam Of Review

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/MyUnisoft/node-partners-sdk/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/MyUnisoft/node-partners-sdk/commits?author=fraxken" title="Documentation">📖</a> <a href="#security-fraxken" title="Security">🛡️</a></td>
    <td align="center"><a href="http://sofiand.github.io/portfolio-client/"><img src="https://avatars.githubusercontent.com/u/39944043?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yefis</b></sub></a><br /><a href="https://github.com/MyUnisoft/node-partners-sdk/commits?author=SofianD" title="Code">💻</a> <a href="https://github.com/MyUnisoft/node-partners-sdk/commits?author=SofianD" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
