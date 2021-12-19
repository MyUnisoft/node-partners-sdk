# Configure
Use this function when you start your API.

[Dotenv](https://www.npmjs.com/package/dotenv) loads environment variables.

```ts
import dotenv from "dotenv";
import * as MyUnisoft from "@myunisoft/partners-sdk";

dotenv.config();

MyUnisoft.configure({
  secretKey: process.env.MYUNISOFT_SECRET_KEY,
  userAgent: "partnerName"
});
```
