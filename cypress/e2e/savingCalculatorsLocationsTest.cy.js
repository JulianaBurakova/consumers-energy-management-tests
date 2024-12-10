/// <reference types="cypress" />

import { canadianProvinces } from "../fixtures/params.json";

describe("Saving Calculators - Locations Test", () => {
  beforeEach(() => {
    cy.visit("savings-calculator/");
  });

  it("Verify all Canadian provinces are on the state list and can be chosen", () => {
    const stateSelect = cy.get('select[name="nastates"]');

    canadianProvinces.forEach((province) => {
      stateSelect.should("contain", province);
    });

    canadianProvinces.forEach((province) => {
      stateSelect.select(province).should("contain", province);
    });
  });

  it("Verify each Canadian province has at least one city to choose", () => {
    const stateSelect = cy.get('select[name="nastates"]');
    const citySelect = cy.get('select[name="stage2"]');

    canadianProvinces.forEach((province) => {
      stateSelect.select(province);
      cy.wait(1000);
      citySelect.should("have.length.at.least", 1);
      citySelect.should("not.contain", "Select State First");
    });
  });
});
