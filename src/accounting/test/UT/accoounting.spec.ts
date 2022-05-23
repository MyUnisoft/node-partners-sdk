// Import Node.js Dependencies
import fs from "fs";
import path from "path";
import { Writable } from "stream";

// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Windev } from "@myunisoft/tsd";

// Require Internal Dependencies
import * as myun from "../../../index";
import { BASE_API_URL } from "../../../constants";

// Fixtures Firm
import kCompanyByRefReply from "./fixtures/firm/companyByRef.json";
import kCycleOfReviewReply from "./fixtures/firm/cycleOfReview.json";
import kDashboardModulesReply from "./fixtures/firm/dashboardModules.json";
import kDossierRevisionListReply from "./fixtures/firm/dossierRevisionList.json";
import kMemberReply from "./fixtures/firm/member.json";
import kPersPhysiqueReply from "./fixtures/firm/persPhysique.json";
import kSocietyReply from "./fixtures/firm/society.json";
import kUserV2Reply from "./fixtures/firm/userV2.json";
import kWalletReply from "./fixtures/firm/wallet.json";
import kWorkProgramOfReviewReply from "./fixtures/firm/workProgramOfReview.json";

// Fixtures Folder
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import kBalanceReply from "./fixtures/folder/balance.json";
import kBalanceDynamiqueReply from "./fixtures/folder/balanceDynamique.json";
import kDiaryReply from "./fixtures/folder/diary.json";
import kExerciceReply from "./fixtures/folder/exercice.json";
import kParamVatReply from "./fixtures/folder/paramVat.json";
import kPaymentTypeReply from "./fixtures/folder/paymentType.json";
import kSocietyByIdReply from "./fixtures/folder/societyById.json";
const kGrandLivreReply = fs.readFileSync(path.join(__dirname, "fixtures", "folder", "grandLivre.pdf"));

// Fixtures Account
import kDetailedAccountReply from "./fixtures/account/detailedAccount.json";
import kEntriesAccountReply from "./fixtures/account/entries.json";
import kFindOrCreateAccounttReply from "./fixtures/account/findOrCreateAccount.json";
import kSimplifiedAccountReply from "./fixtures/account/simplifiedAccount.json";
import kUpdateAccounttReply from "./fixtures/account/updateAccount.json";

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
    .reply(200, kUserV2Reply, kHttpReplyHeaders);

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
    .reply(200, kSocietyReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/society/search`),
      method: "GET"
    })
    .reply(200, kCompanyByRefReply, kHttpReplyHeaders);

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
    .reply(200, kDashboardModulesReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/dadp/dossier_revision_list`),
      method: "GET"
    })
    .reply(200, kDossierRevisionListReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/dadp/cycle`),
      method: "GET"
    })
    .reply(200, kCycleOfReviewReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/dadp/work_program`),
      method: "GET"
    })
    .reply(200, kWorkProgramOfReviewReply, kHttpReplyHeaders);

  return mockClient;
}

function initiateHttpieMockFolder() {
  const mockClient = kMockHttpAgent.get(BASE_API_URL);
  mockClient
    .intercept({
      path: `${kUrlPathname}/society/exercice`,
      method: "GET"
    })
    .reply(200, kExerciceReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: `${kUrlPathname}/diary`,
      method: "GET"
    })
    .reply(200, kDiaryReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: `${kUrlPathname}/vat_param`,
      method: "GET"
    })
    .reply(200, kParamVatReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: `${kUrlPathname}/payment_type`,
      method: "GET"
    })
    .reply(200, kPaymentTypeReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: `${kUrlPathname}/society`,
      method: "GET"
    })
    .reply(200, kSocietyByIdReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/balance_dynamique`),
      method: "GET"
    })
    .reply(200, kBalanceDynamiqueReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/grand_livre`),
      method: "GET"
    })
    .reply(200, kGrandLivreReply, { headers: { "content-type": "application/pdf" } });

  return mockClient;
}

interface IMockAccountOptions {
  getAccountReply?: Windev.Account.SimplifiedAccount[] | Windev.Account.DetailedAccounts | Windev.Account.AccountEntries;
  putAccountReply?: Windev.Account.Account | { status: string; message: string; };
}

function initiateHttpieMockAccount(options: IMockAccountOptions = Object.create(null)) {
  const mockClient = kMockHttpAgent.get(BASE_API_URL);
  const {
    getAccountReply = kSimplifiedAccountReply
  } = options;

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/account`),
      method: "GET"
    })
    .reply(200, getAccountReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/account`),
      method: "POST"
    })
    .reply(200, kFindOrCreateAccounttReply, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/account`),
      method: "PUT"
    })
    .reply(200, kUpdateAccounttReply, kHttpReplyHeaders);

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
  describe("firm", () => {
    let mockClient;
    beforeEach(() => {
      mockClient = initiateHttpieMock();
    });

    afterEach(async() => {
      await mockClient.close();
    });

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

  describe("folder", () => {
    let mockClient;
    beforeEach(() => {
      mockClient = initiateHttpieMockFolder();
    });

    afterEach(async() => {
      await mockClient.close();
    });

    test("getExercices", async() => {
      const data = await myun.accounting.folder.getExercices({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data[0].label).toBe("N");
    });

    test("getDiaries", async() => {
      const data = await myun.accounting.folder.getDiaries({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data[1].code).toBe("02");
      expect(data[1].name).toBe("JOURNAL DE VENTES");
    });

    test("getVatParameters", async() => {
      const data = await myun.accounting.folder.getVatParameters({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data[0].code).toBe("01");
      expect(data[0].blocked).toBe(true);
    });

    test("getInformation", async() => {
      const data = await myun.accounting.folder.getInformation({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data.name).toBe("Aadprox");
    });

    test("getPaymentType", async() => {
      const data = await myun.accounting.folder.getPaymentType({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data[0].code).toBe("CB");
      expect(data[0].name).toBe("Carte bleue");
    });

    test("getDynamicBalanceFromExercice", async() => {
      const data = await myun.accounting.folder.getDynamicBalanceFromExercice({
        accessToken: "test",
        accountingFolderId: 1,
        axisId: 1
      });

      expect(data[0].exercice.start_date).toBe("2021-01-01");
      expect(data[0].exercice.end_date).toBe("2021-12-31");
    });

    test("getDynamicBalanceFromDate", async() => {
      const data = await myun.accounting.folder.getDynamicBalanceFromDate({
        accessToken: "test",
        accountingFolderId: 1,
        startDate: "20210101",
        endDate: "20211231",
        axisId: 1
      });

      expect(data[0].exercice.start_date).toBe("2021-01-01");
      expect(data[0].exercice.end_date).toBe("2021-12-31");
    });

    test("getGrandLivre", async() => {
      const data = await myun.accounting.folder.getGrandLivre({
        accessToken: "test",
        accountingFolderId: 1,
        startDate: "2021-01-01",
        endDate: "2021-12-31"
      });

      expect(typeof data).toBe("string");
    });

    test("getGrandLivreStream", async() => {
      const cursor = await myun.accounting.folder.getGrandLivreStream({
        accessToken: "test",
        accountingFolderId: 1,
        startDate: "2021-01-01",
        endDate: "2021-12-31"
      });


      const buffs: Buffer[] = [];
      cursor(new Writable({
        write(chunk) {
          buffs.push(chunk);
        }
      }));

      expect(typeof buffs.toString()).toBe("string");
    });
  });

  describe("account", () => {
    let mockClient;
    afterEach(async() => {
      await mockClient.close();
    });

    test("getAll", async() => {
      mockClient = initiateHttpieMockAccount();

      const data = await myun.accounting.account.getAll({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data[1].account_number).toBe("101200");
    });

    test("getAllDetailed", async() => {
      mockClient = initiateHttpieMockAccount({ getAccountReply: kDetailedAccountReply });

      const data = await myun.accounting.account.getAllDetailed({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data.account_array![0].label).toBe("RESERVE LEGALE PROP.");
    });

    test("findOrCreate", async() => {
      mockClient = initiateHttpieMockAccount();

      const data = await myun.accounting.account.findOrCreate({
        accessToken: "test",
        accountingFolderId: 1,
        accountNumber: "106110",
        label: "RESERVE LEGALE PROP."
      });

      expect(data.account_id).toBe(4);
    });

    test("updateAccount", async() => {
      mockClient = initiateHttpieMockAccount();

      const data = await myun.accounting.account.updateAccount({
        accessToken: "test",
        body: {
          account_id: 2,
          account_number: "101200",
          label: "CAPITAL APPELE NON VERS"
        }
      });

      if ("label" in data) {
        expect(data.label).toBe("CAPITAL APPELE NON VERS");
      }
    });

    test("getlineEntries by number", async() => {
      mockClient = initiateHttpieMockAccount({ getAccountReply: kEntriesAccountReply });

      const data = await myun.accounting.account.getLineEntries({
        accessToken: "test",
        accountingFolderId: 1,
        accountNumber: "101200",
        searchDate: { start_date: "20210101", end_date: "20211231" }
      });

      if ("label" in data) {
        expect(data.total_debit).toBe(0);
      }
    });

    test("getlineEntries by id", async() => {
      mockClient = initiateHttpieMockAccount({ getAccountReply: kEntriesAccountReply });

      const data = await myun.accounting.account.getLineEntries({
        accessToken: "test",
        accountingFolderId: 1,
        accountId: 1,
        searchDate: { start_date: "20210101", end_date: "20211231" }
      });

      if ("label" in data) {
        expect(data.total_debit).toBe(0);
      }
    });
  });
});
