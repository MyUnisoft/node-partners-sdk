// Import Node.js Dependencies

// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import * as myun from "../../../index";
import { BASE_API_URL } from "../../../constants";
import kWalletReply from "./fixtures/wallet.json";
import kPersPhysiqueReply from "./fixtures/persPhysique.json";
import kSocietyeReply from "./fixtures/society.json";
import kMemberReply from "./fixtures/member.json";
import kDashboardModules from "./fixtures/dashboardModules.json";
import kCycleOfReview from "./fixtures/cycleOfReview.json";
import kCompanyByRef from "./fixtures/companyByRef.json";
import kDossierRevisionList from "./fixtures/dossierRevisionList.json";
import kWorkProgramOfReview from "./fixtures/workProgramOfReview.json";
import kUserV2 from "./fixtures/userV2.json";

// CONSTANTS
const kMockHttpAgent = new httpie.MockAgent();
const kOriginalHttpDispatcher = httpie.getGlobalDispatcher();
const kHttpReplyHeaders = { headers: { "content-type": "application/json" } };
const kUrlPathname = "/api/v1";


function initiateHttpieMock() {
  const mockClient = kMockHttpAgent.get(BASE_API_URL);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/users_v2`),
      method: "GET"
    })
    .reply(200, kUserV2, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/wallet`),
      method: "GET"
    })
    .reply(200, kWalletReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/pers_physique`),
      method: "GET"
    })
    .reply(200, kPersPhysiqueReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: `${kUrlPathname}/society`,
      method: "GET"
    })
    .reply(200, kSocietyeReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/society/search`),
      method: "GET"
    })
    .reply(200, kCompanyByRef, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/member`),
      method: "GET"
    })
    .reply(200, kMemberReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/dashboard/modules`),
      method: "GET"
    })
    .reply(200, kDashboardModules, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/dadp/dossier_revision_list`),
      method: "GET"
    })
    .reply(200, kDossierRevisionList, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/dadp/cycle`),
      method: "GET"
    })
    .reply(200, kCycleOfReview, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/dadp/work_program`),
      method: "GET"
    })
    .reply(200, kWorkProgramOfReview, kHttpReplyHeaders);

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

describe("Accounting", () => {
  let mockClient;
  beforeEach(() => {
    mockClient = initiateHttpieMock();
  });

  afterEach(async() => {
    await mockClient.close();
  });


  describe("firm", () => {
    test("getUsers", async() => {
      const data = await myun.accounting.firm.getUsers({
        accessToken: "test"
      });

      expect(data.user_array[0].name).toBe("Doual");
    });

    test("getWallets", async() => {
      const data = await myun.accounting.firm.getWallets({
        accessToken: "test"
      });

      expect(data[0].id_wallet).toBe(1);
    });

    test("getPhysicalPersons", async() => {
      const data = await myun.accounting.firm.getPhysicalPersons({
        accessToken: "test"
      });

      expect(data.array_pers_physique[0].name).toBe("API");
    });

    test("getAccountingFolders", async() => {
      const data = await myun.accounting.firm.getAccountingFolders({
        accessToken: "test"
      });

      expect(data.society_array[0].name).toBe("MyUni3");
    });

    test("getAccountingFirms", async() => {
      const data = await myun.accounting.firm.getAccountingFirms({
        accessToken: "test"
      });

      expect(data[0].name).toBe("SCH1");
    });

    test("getAccountingFirms", async() => {
      const data = await myun.accounting.firm.getDashboardModules({
        accessToken: "test"
      });

      expect(data[0].company_name).toBe("Aadprox");
    });

    test("getCompanyByRef", async() => {
      const data = await myun.accounting.firm.getCompanyByRef({
        accessToken: "test",
        reference: "MYU"
      });

      expect(data.name).toBe("MY UNISOFT");
    });

    test("getReview", async() => {
      const data = await myun.accounting.firm.getReview({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data.dossier_revision_list[0].type.code).toBe("BIL");
    });

    test("getCycleOfReview", async() => {
      const data = await myun.accounting.firm.getCycleOfReview({
        accessToken: "test",
        accountingFolderId: 1,
        reviewId: 1,
        sectionId: 1,
        startDate: "2021-01-01",
        endDate: "2022-04-25"
      });

      expect(data[0].code).toBe("AC-A");
    });

    test("getWorkProgramOfReview", async() => {
      const data = await myun.accounting.firm.getWorkProgramOfReview({
        accessToken: "test",
        accountingFolderId: 1,
        reviewId: 1,
        sectionId: 1,
        startDate: "2021-01-01",
        endDate: "2022-04-25",
        workSheetOnly: 0
      });

      expect(data[0].ref).toBe("AC-A-00-A1");
    });
  });
});
