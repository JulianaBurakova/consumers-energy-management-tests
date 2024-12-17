/// <reference types="cypress" />
import { canadianProvinces } from "../fixtures/params.json";
import { selectors } from "../support/selectors";

describe("Saving Calculators - Locations Test", () => {
  beforeEach(() => {
    cy.visit("savings-calculator/");
  });

  it("Verify all Canadian provinces are on the state list and can be chosen", () => {
    const stateSelect = cy.get(selectors.stateSelect);
    canadianProvinces.forEach((province) => {
      stateSelect.should("contain", province);
      cy.selectAndVerify(selectors.stateSelect, province);
    });
  });

  it("Verify each Canadian province has at least one city to choose", () => {
    const stateSelect = cy.get(selectors.stateSelect);
    const citySelect = cy.get(selectors.citySelect);

    canadianProvinces.forEach((province) => {
      stateSelect.select(province);
      cy.wait(1000); // Consider using a more robust wait mechanism if possible
      citySelect.should("have.length.at.least", 1);
      citySelect.should("not.contain", "Select State First");
    });
  });
});
