// Import Node.js Dependencies
import { Writable } from "stream";
import { join } from "path";
import { readFileSync } from "fs";

// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import * as myun from "../../../../index";
import { BASE_API_URL } from "../../../../constants";
import { Windev } from "@myunisoft/tsd";

import kCEntriesReply from "./fixtures/entry.json";

// CONSTANTS
const kMockHttpAgent = new httpie.MockAgent();
const kOriginalHttpDispatcher = httpie.getGlobalDispatcher();
const kHttpReplyHeaders = { headers: { "content-type": "application/json" } };
const kPlainTextReplyHeaders = { headers: { "content-type": "plain/text" } };
// const kHttpReply = { status: "ok" };
const kUrlPathname = "/api/v1";
const kFixturePath = join(__dirname, "fixtures");
const kExportFEC = readFileSync(join(kFixturePath, "exportFEC.txt"), { encoding: "utf-8" });


function initiateHttpieMock() {
  const mockClient = kMockHttpAgent.get(BASE_API_URL);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/export/fec`),
      method: "POST"
    })
    .reply(200, kExportFEC, kPlainTextReplyHeaders);

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

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/entries`),
      method: "POST"
    })
    .reply(200, kCEntriesReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/entries/id`),
      method: "GET"
    })
    .reply(200, {
      id_entry: 1,
      type: "ENTRIES"
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
  beforeEach(() => {
    mockClient = initiateHttpieMock();
  });

  afterEach(async() => {
    await mockClient.close();
  });

  test("getPartialFEC", async() => {
    const data = await myun.accounting.export.FEC.getPartialFEC({
      accessToken: "test",
      from: "2021-01-01",
      to: "2021-12-31"
    });

    expect(typeof data).toBe("string");
  });

  test("getPartialFECStream", async() => {
    const cursor = await myun.accounting.export.FEC.getPartialFECStream({
      accessToken: "test",
      from: "2021-01-01",
      to: "2021-12-31"
    });

    const buffs: Buffer[] = [];
    cursor(new Writable({
      write(chunk) {
        buffs.push(chunk);
      }
    }));

    const data = Buffer.concat(buffs).toString("utf-8");

    expect(typeof data).toBe("string");
  });

  test("getFEC", async() => {
    const data = await myun.accounting.export.FEC.getFEC({
      accessToken: "test",
      exerciceId: 1
    });

    expect(typeof data).toBe("string");
  });

  test("getFECStream", async() => {
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

    const data = Buffer.concat(buffs).toString("utf-8");
    expect(typeof data).toBe("string");
  });

  test("getPendingDocument", async() => {
    const data = await myun.accounting.export.getPendingDocument({
      accessToken: "test",
      offset: 10,
      filter: "grouped",
      width: 10,
      height: 10,
      limit: 25,
      sortDateDirection: "asc",
      societyId: 1
    });

    expect(data.ocrStatus).toBe(false);
  });

  test("getPendingDocumentStream", async() => {
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
    const data = await myun.accounting.export.OCR.getOCRFollowUp({
      accessToken: "test",
      startDate: "20210101",
      endDate: "20221231",
      filter: "test",
      limit: 10,
      sort: {
        direction: "asc",
        column: "fileName"
      },
      offset: 10,
      mode: 1,
      body: { societies_array: [1] }
    });

    expect(data.nb_ocr).toBe(0);
  });

  test("getOCRFollowUpStream", async() => {
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

  describe("index", () => {
    test("getEntryByPartnerID", async() => {
      const data = await myun.accounting.export.getEntryByPartnerID({
        accessToken: "test",
        accountingFolderId: 1,
        id: 1
      });

      expect(data.id_entry).toBe(1);
      expect(data.type).toBe("ENTRIES");
    });

    test("getEntries", async() => {
      const data = await myun.accounting.export.getEntries<Windev.Entry.Entries>({
        accessToken: "test",
        type: "entry",
        accountingFolderId: 1,
        body: {
          sort: { ecr: "desc" },
          filters: [{ name: "type", value: "e" }]
        }
      });

      expect(data.type).toBe("E");
      expect(data.entry_array[0].entry_id).toBe(5);
    });
  });
});
