// Import Node.js Dependencies
import fs from "fs";
const { promises: { readFile } } = fs;
import path from "path";

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

const files = Object.freeze({
  fec: path.join(__dirname, "..", "fixtures", "FEC.zip"),
  tra: path.join(__dirname, "..", "fixtures", "YD COIFF.tra"),
  ocr: path.join(__dirname, "..", "fixtures", "ocr.pdf"),
  facturX: path.join(__dirname, "..", "fixtures", "facturX.pdf")
});

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

describe("Import", () => {
  let mockClient;

  afterEach(async() => {
    await mockClient.close();
  });

  test("FEC Buffer", async() => {
    mockClient = initiateHttpieMock();

    const fileContent = await readFile(files.fec);
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

  test("FEC Stream", async() => {
    mockClient = initiateHttpieMock();

    const readStream = fs.createReadStream(files.fec);
    const result = await myun.accounting.import.FEC({
      accessToken: "test",
      exerciceId: 1,
      type: 1,
      filename: "import_fec.txt",
      body: readStream,
      accountingFolderId: 1
    });

    expect(result.status).toBe("ok");
  });

  test("TRA Buffer", async() => {
    mockClient = initiateHttpieMock();

    const fileContent = await readFile(files.tra);
    const result = await myun.accounting.import.TRA({
      accessToken: "test",
      body: fileContent,
      accountingFolderId: 1
    });

    expect(result.status).toBe("ok");
  });

  test("TRA Stream", async() => {
    mockClient = initiateHttpieMock();

    const readStream = await fs.createReadStream(files.tra);
    const result = await myun.accounting.import.TRA({
      accessToken: "test",
      body: readStream,
      accountingFolderId: 1
    });

    expect(result.status).toBe("ok");
  });

  test("OCR Buffer", async() => {
    mockClient = initiateHttpieMock();

    const fileContent = await readFile(files.ocr);
    const result = await myun.accounting.import.ocr({
      accessToken: "test",
      extension: "pdf",
      invoiceType: "Achat",
      name: "ocr_test",
      ocrType: "Manuel",
      body: fileContent
    });

    expect(result.status).toBe("ok");
  });

  test("OCR Stream", async() => {
    mockClient = initiateHttpieMock();

    const readStream = await fs.createReadStream(files.tra);
    const result = await myun.accounting.import.ocr({
      accessToken: "test",
      extension: "pdf",
      invoiceType: "Achat",
      name: "ocr_test",
      ocrType: "Manuel",
      body: readStream
    });

    expect(result.status).toBe("ok");
  });

  test("FactureX Buffer", async() => {
    const invoiceReply: Windev.Entry.Entries = {
      type: "E",
      debit_total: 1000,
      credit_total: 1000,
      entry_array: []
    };
    mockClient = initiateHttpieMock({ invoiceReply });

    const fileContent = await readFile(files.facturX);
    const result = await myun.accounting.import.FacturX({
      accessToken: "test",
      extension: "pdf",
      invoiceType: "Achat",
      name: "facturX_test",
      body: fileContent
    });

    expect(result.type).toBe("E");
  });

  test("FactureX Stream", async() => {
    const invoiceReply: Windev.Entry.Entries = {
      type: "E",
      debit_total: 1000,
      credit_total: 1000,
      entry_array: []
    };
    mockClient = initiateHttpieMock({ invoiceReply });

    const readStream = await fs.createReadStream(files.facturX);
    const result = await myun.accounting.import.FacturX({
      accessToken: "test",
      extension: "pdf",
      invoiceType: "Achat",
      name: "facturX_test",
      body: readStream
    });

    expect(result.type).toBe("E");
  });
});
