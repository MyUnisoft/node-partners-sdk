// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import * as myun from "../../../index";
import { BASE_API_URL, BASE_AUTH_URL } from "../../../constants";
import { IFirmAuthenticateResponse } from "../../firm";

// CONSTANTS
const kMockHttpAgent = new httpie.MockAgent();
const kOriginalHttpDispatcher = httpie.getGlobalDispatcher();
const kHttpReplyHeaders = { headers: { "content-type": "application/json" } };
const kUrlPathname = "/api/v1";

function initiateHttpieMockFirm(authReply: IFirmAuthenticateResponse | { status: string}) {
  const mockClient = kMockHttpAgent.get(BASE_AUTH_URL);

  mockClient
    .intercept({
      path: (url) => url.startsWith("/api/authenticate/firm"),
      method: "POST"
    })
    .reply(200, authReply, kHttpReplyHeaders);

  return mockClient;
}

function initiateHttpieMockSociety() {
  const mockClient = kMockHttpAgent.get(BASE_API_URL);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/key/create`),
      method: "POST"
    })
    .reply(200, {
      id: "1",
      target: 1,
      grantedBy: 1,
      grantedFor: 1,
      value: "token"
    }, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${kUrlPathname}/key/info`),
      method: "GET"
    })
    .reply(200, [
      {
        path: "/api/v1/accounting/export/yooz",
        method: "get"
      },
      {
        path: "/api/v1/society/:id/associate",
        method: "get"
      }
    ], kHttpReplyHeaders);

  return mockClient;
}

function initiateHttpieMockUser(authenticateStatus: string) {
  const mockClient = kMockHttpAgent.get(BASE_AUTH_URL);

  mockClient
    .intercept({
      path: (url) => url.startsWith("/api/authenticate"),
      method: "POST"
    })
    .reply(200, {
      status: authenticateStatus,
      policy: "",
      firm: {
        id: 1,
        label: "Cabinet 1"
      },
      details: {
        token_type: "bearer",
        expire_in: "",
        access_token: "token",
        refresh_token: "refresh"
      }
    }, kHttpReplyHeaders);

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

describe("Access", () => {
  let mockClient;

  afterEach(async() => {
    await mockClient.close();
  });

  describe("firm", () => {
    test("authenticate", async() => {
      mockClient = initiateHttpieMockFirm({
        api_token: "apiToken",
        expiresIn: "expiresIn",
        firm: {
          id: 1,
          label: "Cabinet 1"
        }
      });

      const data = await myun.access.firm.authenticate({
        mail: "test",
        password: "admin"
      });

      expect(data.api_token).toBe("apiToken");
    });

    test("authenticate Error firm-selection", async() => {
      mockClient = initiateHttpieMockFirm({
        status: "firm-selection"
      });

      await expect(myun.access.firm.authenticate({
        mail: "test",
        password: "admin"
      })).rejects.toThrow("You must select a firm to authenticate");
    });
  });

  describe("society", () => {
    test("generateKey", async() => {
      mockClient = initiateHttpieMockSociety();

      const data = await myun.access.society.generateKey({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data.value).toBe("token");
    });

    test("getEndpoints", async() => {
      mockClient = initiateHttpieMockSociety();

      const data = await myun.access.society.getEndpoints({
        accessToken: "test",
        accountingFolderId: 1
      });

      expect(data[0].path).toBe("/api/v1/accounting/export/yooz");
      expect(data[0].method).toBe("get");
    });
  });

  describe("user", () => {
    test("authenticate", async() => {
      mockClient = initiateHttpieMockUser("authenticated");

      const data = await myun.access.user.authenticate({
        mail: "test",
        password: "admin"
      });

      expect(data).toBe("token");
    });

    test("authenticate error status not authenticated", async() => {
      mockClient = initiateHttpieMockUser("test");

      await expect(myun.access.user.authenticate({
        mail: "test",
        password: "admin"
      })).rejects.toThrow("Unable to authenticate user");
    });
  });
});
