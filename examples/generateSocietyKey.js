import * as MyUnisoft from "@myunisoft/partners-sdk";

MyUnisoft.configure({
  secretKey: "...",
  userAgent: "user-agent-name"
});

const accessToken = await MyUnisoft.access.user.authenticate({
  mail: "...",
  password: "..."
});
const { value: APIToken } = await MyUnisoft.access.society.generateKey({
  accessToken,
  accountingFolderId: 3
});
console.log(APIToken);
