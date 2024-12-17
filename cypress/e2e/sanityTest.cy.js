/// <reference types="cypress" />

import { selectors } from "../support/selectors";
describe("Sanity Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("params").as("data");
  });
  it("Verify all menu options", function () {
    this.data.menuOptions.forEach((option) => {
      cy.contains(option.name).click();
      cy.url().should("include", option.url);
      const expectedH1 = option.h1 || option.name;
      cy.get("h1").should("contain", expectedH1);
      cy.visit("/");
    });
  });
});
