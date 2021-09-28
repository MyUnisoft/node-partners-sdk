
<p align="center"><h1 align="center">
  Node.js Partners SDK
</h1>

<p align="center">
  Simplify your life with the official Node.js SDK.
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
import * as MyUnisoftSDK from "@myunisoft/partners-sdk";

dotenv.config();

const { api_token: accessToken } = await MyUnisoftSDK.auth.firm.authenticate({
  mail: process.env.MYUNISOFT_MAIL,
  password: process.env.MYUNISOFT_PASSWORD
});
sdk.auth.secret.set(process.env.MYUNISOFT_SECRET_KEY);

const diaries = await sdk.compta.diary({
  accessToken,
  societyId: 1
});
console.log(diaries);
```

## 📜 API

> WORK IN PROGRESS

## License
MIT
