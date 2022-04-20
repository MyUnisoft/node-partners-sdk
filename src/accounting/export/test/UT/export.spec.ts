// Import Node.js Dependencies
import { Writable } from "stream";

// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import * as myun from "../../../../index";
import { BASE_API_URL } from "../../../../constants";
import { Windev } from "@myunisoft/tsd";

// CONSTANTS
const kMockHttpAgent = new httpie.MockAgent();
const kOriginalHttpDispatcher = httpie.getGlobalDispatcher();
const kHttpReplyHeaders = { headers: { "content-type": "application/json" } };
const kHttpReply = { status: "ok" };
const kUrlPathname = "/api/v1";
// const kTempFolder = path.join(__dirname, "..", "fixturesTemp");

interface OptionHttpieMock {
  fecReply?: { status: string };
  partialReply?: { status: string };
  invoiceReply?: Windev.Entry.Entries | { status: string };
}

function initiateHttpieMock(options: OptionHttpieMock = Object.create(null)) {
  const mockClient = kMockHttpAgent.get(BASE_API_URL);

  const {
    fecReply = kHttpReply
    // partialReply = kHttpReply,
    // invoiceReply = kHttpReply
  } = options;

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/export/fec`),
      method: "POST"
    })
    .reply(200, fecReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/document/pending`),
      method: "GET"
    })
    .reply(200, {
      rows_number: 0,
      pages_number: 0,
      ocrStatus: false,
      list_manual_document: []
    }, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/document_follow_up`),
      method: "POST"
    })
    .reply(200, {
      nb_ocr: 0,
      ocr_follow_up_array: []
    }, kHttpReplyHeaders);

  return mockClient;
}

beforeAll(() => {
  myun.getters.accessType.set("firm");
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

  test("getFEC", async() => {
    mockClient = initiateHttpieMock();

    const data = await myun.accounting.export.FEC.getFEC({
      accessToken: "test",
      exerciceId: 1
    });

    expect(data.status).toBe("ok");
  });

  test("getFECStream", async() => {
    mockClient = initiateHttpieMock();

    const cursor = await myun.accounting.export.FEC.getFECStream({
      accessToken: "test",
      exerciceId: 1
    });

    const buffs: Buffer[] = [];

    cursor(new Writable({
      write(chunk) {
        buffs.push(chunk);
      }
    }));

    const data = JSON.parse(Buffer.concat(buffs).toString("utf-8"));
    expect(data.status).toBe("ok");
  });

  test("getPendingDocument", async() => {
    mockClient = initiateHttpieMock();

    const data = await myun.accounting.export.getPendingDocument({
      accessToken: "test",
      limit: 25,
      societyId: 1
    });

    expect(data.ocrStatus).toBe(false);
  });

  test("getPendingDocumentStream", async() => {
    mockClient = initiateHttpieMock();

    const cursor = await myun.accounting.export.getPendingDocumentStream({
      accessToken: "test",
      limit: 25,
      societyId: 1
    });

    const buffs: Buffer[] = [];

    cursor(new Writable({
      write(chunk) {
        buffs.push(chunk);
      }
    }));

    const data = JSON.parse(Buffer.concat(buffs).toString("utf-8"));
    expect(data.ocrStatus).toBe(false);
  });

  test("getOCRFollowUp", async() => {
    mockClient = initiateHttpieMock();

    const data = await myun.accounting.export.OCR.getOCRFollowUp({
      accessToken: "test",
      startDate: "20210101",
      endDate: "20221231",
      mode: 1,
      body: { societies_array: [1] }
    });

    expect(data.nb_ocr).toBe(0);
  });

  test("getOCRFollowUpStream", async() => {
    mockClient = initiateHttpieMock();

    const cursor = await myun.accounting.export.OCR.getOCRFollowUpStream({
      accessToken: "test",
      startDate: "20210101",
      endDate: "20221231",
      mode: 1,
      body: { societies_array: [1] }
    });

    const buffs: Buffer[] = [];

    cursor(new Writable({
      write(chunk) {
        buffs.push(chunk);
      }
    }));

    const data = JSON.parse(Buffer.concat(buffs).toString("utf-8"));
    expect(data.nb_ocr).toBe(0);
  });
});
