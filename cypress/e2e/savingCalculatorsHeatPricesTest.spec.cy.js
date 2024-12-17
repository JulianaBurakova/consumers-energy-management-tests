// <reference types="cypress" />

import { selectors } from "../support/selectors";

describe("Saving Calculator - Heat Prices Calculations", () => {
  beforeEach(() => {
    cy.visit("savings-calculator/");
    cy.fixture("params").as("data");
  });

  it("Populate all fields with test data", () => {
    cy.get("@data").then((data) => {
      cy.clearAndType(selectors.gasTherm, data.testData.gasTherm);
      cy.clearAndType(selectors.propaneGas, data.testData.propaneGal);
      cy.clearAndType(selectors.oilGal, data.testData.oilGal);
      cy.clearAndType(selectors.summerKwh, data.testData.summerKwh);
      cy.clearAndType(selectors.winterKwh, data.testData.winterKwh);
    });
  });

  it("Verify new heating cost changes with each new heating type", () => {
    cy.get("@data").then((data) => {
      data.heatingTypes.forEach((type) => {
        cy.selectAndVerify(selectors.heatingType, type);
        cy.get(selectors.newHeatingCost).invoke("text").should("not.be.empty");
      });
    });
  });
  it("Verify savings are displayed when new and old types are chosen", () => {
    cy.get("@data").then((data) => {
      cy.selectAndVerify(selectors.heatType, data.heatingTypes[0]);
      cy.selectAndVerify(selectors.heatingType, data.heatingTypes[0]);
      cy.get(selectors.totalSavings).invoke("text").should("not.be.empty");
    });
  });
  it("Verify total savings are updated when new and old types are chosen", () => {
    cy.get("@data").then((data) => {
      cy.selectAndVerify(selectors.heatType, data.heatingTypes[0]);
      cy.selectAndVerify(selectors.heatingType, data.heatingTypes[0]);
      cy.get(selectors.currentHeatingCost)
        .invoke("text")
        .then((currentCost) => {
          cy.get(selectors.newHeatingCost)
            .invoke("text")
            .then((newCost) => {
              const currentHeatingCost = parseFloat(
                currentCost.replace(/[$,]/g, "")
              );
              const newHeatingCost = parseFloat(newCost.replace(/[$,]/g, ""));
              const expectedSavings = currentHeatingCost - newHeatingCost;
              cy.get(selectors.totalSavings)
                .invoke("text")
                .then((savings) => {
                  expect(parseFloat(savings.replace(/[$,]/g, ""))).to.equal(
                    expectedSavings
                  );
                });
            });
        });
    });
  });
});
