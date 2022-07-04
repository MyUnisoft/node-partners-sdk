/* eslint-disable max-nested-callbacks */
// Require Internal Dependencies
import * as myun from "../../index";
import { firmAccessThrowWithoutSociety, throwIfIsNotFirm } from "../../constants";
import { configure } from "../../index";


describe("Root", () => {
  describe("Contants", () => {
    afterEach(() => {
      myun.getters.accessType.set("society");
    });

    test("firmAccessThrowWithoutSociety", () => {
      expect.assertions(0);
      myun.getters.accessType.set("firm");
      firmAccessThrowWithoutSociety({
        accessToken: "token",
        accountingFolderId: 1
      });
    });

    test("firmAccessThrowWithoutSociety Error", () => {
      myun.getters.accessType.set("firm");
      expect(() => {
        firmAccessThrowWithoutSociety({ accessToken: "token" });
      }).toThrow("accountingFolderId is missing (mandatory for a firm access).");
    });

    test("throwIfIsNotFirm Error", () => {
      expect(() => {
        throwIfIsNotFirm();
      }).toThrow("This endpoint only works with a cabinet (firm) access.");
    });
  });

  describe("index", () => {
    test("configure", () => {
      configure({
        userAgent: "test",
        secretKey: "SECRET"
      });

      expect(myun.getters.secret.get()).toBe("SECRET");
    });
  });
});
