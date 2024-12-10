/// <reference types="cypress" />

describe("Saving Calculator - Heat Prices Calculations", () => {
  beforeEach(() => {
    cy.visit("savings-calculator/");
  });

  it("Populate all fields with test data", () => {
    const gasTherm = 1.2;
    const propaneGal = 4.0;
    const oilGal = 4.25;
    const summerKwh = 0.14;
    const winterKwh = 0.1;

    cy.get("[name=gastherm]").clear().type(`${gasTherm}{enter}`);
    cy.get("[name=propaneGas]").clear().type(`${propaneGal}{enter}`);
    cy.get("[name=oilgal]").clear().type(`${oilGal}{enter}`);
    cy.get("[name=skwhr]").clear().type(`${summerKwh}{enter}`);
    cy.get("[name=wkwhr]").clear().type(`${winterKwh}{enter}`);

    cy.get("[name=gastherm]").should("have.value", gasTherm);
    cy.get("[name=propaneGas]").should("have.value", propaneGal);
    cy.get("[name=oilgal]").should("have.value", oilGal);
    cy.get("[name=skwhr]").should("have.value", summerKwh);
    cy.get("[name=wkwhr]").should("have.value", winterKwh);
  });

  it("Verify Current Heating Cost changes with each Current Heating type", () => {
    const currentHeatingTypes = [
      "Natural Gas",
      "Propane",
      "Oil",
      "Electric",
      "Heat Pump",
    ];

    currentHeatingTypes.forEach((type) => {
      cy.get("[name=heattype]").select(type);
      cy.get("#CHC").invoke("text").should("not.be.empty");
    });
  });

  it("Verify New Heating Cost changes with each New Heating type", () => {
    const newHeatingTypes = [
      "Natural Gas",
      "Propane",
      "Oil",
      "Electric",
      "Heat Pump",
    ];

    newHeatingTypes.forEach((type) => {
      cy.get("[name=heatingtype]").select(type);
      cy.get("#NHC").invoke("text").should("not.be.empty");
    });
  });

  it("Verify savings are displayed when new and old types are chosen", () => {
    const currentHeatingTypes = [
      "Natural Gas",
      "Propane",
      "Oil",
      "Electric",
      "Heat Pump",
    ];
    const newHeatingTypes = [
      "Natural Gas",
      "Propane",
      "Oil",
      "Electric",
      "Heat Pump",
    ];

    cy.get("[name=heattype]").select(currentHeatingTypes[0]);
    cy.get("[name=heatingtype]").select(newHeatingTypes[0]);

    cy.get("#AHS").invoke("text").should("not.be.empty");
  });

  it("Verify total savings are updated when new and old types are chosen", () => {
    const currentHeatingTypes = [
      "Natural Gas",
      "Propane",
      "Oil",
      "Electric",
      "Heat Pump",
    ];
    const newHeatingTypes = [
      "Natural Gas",
      "Propane",
      "Oil",
      "Electric",
      "Heat Pump",
    ];

    cy.get("[name=heattype]").select(currentHeatingTypes[0]);
    cy.get("[name=heatingtype]").select(newHeatingTypes[0]);

    cy.get("#CHC")
      .invoke("text")
      .then((currentCost) => {
        cy.get("#NHC")
          .invoke("text")
          .then((newCost) => {
            const currentHeatingCost = parseFloat(
              currentCost.replace(/[$,]/g, "")
            );
            const newHeatingCost = parseFloat(newCost.replace(/[$,]/g, ""));
            const expectedSavings = currentHeatingCost - newHeatingCost;

            cy.get("#AHS")
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
