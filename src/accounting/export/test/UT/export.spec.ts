// Import Node.js Dependencies
import fs from "fs";
// const { promises: { readFile } } = fs;
// import path from "path";

// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import * as myun from "../../../../../dist/index";
import { BASE_API_URL } from "../../../../constants";
import { Windev } from "@myunisoft/tsd";

// CONSTANTS
const kMockHttpAgent = new httpie.MockAgent();
const kOriginalHttpDispatcher = httpie.getGlobalDispatcher();
const kHttpReplyHeaders = { headers: { "content-type": "application/json" } };
const kHttpReply = { status: "ok" };
const kUrlPathname = "/api/v1";

interface OptionHttpieMock {
  fecReply?: { status: string };
  partialReply?: { status: string };
  invoiceReply?: Windev.Entry.Entries | { status: string };
}

function initiateHttpieMock(options: OptionHttpieMock = Object.create(null)) {
  const mockClient = kMockHttpAgent.get(BASE_API_URL);

  const {
    fecReply = kHttpReply,
    partialReply = kHttpReply,
    invoiceReply = kHttpReply
  } = options;

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/fec`),
      method: "POST"
    })
    .reply(200, fecReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/TRA/partial`),
      method: "POST"
    })
    .reply(200, partialReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/invoice`),
      method: "POST"
    })
    .reply(200, invoiceReply, kHttpReplyHeaders);

  return mockClient;
}

beforeAll(() => {
  kMockHttpAgent.disableNetConnect();
  httpie.setGlobalDispatcher(kMockHttpAgent);
});

afterAll(() => {
  kMockHttpAgent.enableNetConnect();
  httpie.setGlobalDispatcher(kOriginalHttpDispatcher);
});

describe("export", () => {
  let mockClient;

  afterEach(async() => {
    await mockClient.close();
  });

  test("FEC Buffer", async() => {
    mockClient = initiateHttpieMock();

    // const fileContent = await readFile(files.fec);
    const result = await myun.accounting.import.FEC({
      accessToken: "test",
      exerciceId: 1,
      type: 1,
      filename: "import_fec.txt",
      body: fileContent,
      accountingFolderId: 1
    });

    expect(result.status).toBe("ok");
  });

  // test("FEC Stream", async() => {
  //   mockClient = initiateHttpieMock();

  //   const readStream = fs.createReadStream(files.fec);
  //   const result = await myun.accounting.import.FEC({
  //     accessToken: "test",
  //     exerciceId: 1,
  //     type: 1,
  //     filename: "import_fec.txt",
  //     body: readStream,
  //     accountingFolderId: 1
  //   });

  //   expect(result.status).toBe("ok");
  // });
});
