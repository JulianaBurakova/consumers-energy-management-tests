/// <reference types="cypress" />

describe("Sanity Test", () => {
  const menuOptions = [
    { name: "Home", url: "/", h1: "Heating and Cooling " },
    {
      name: "About",
      url: "/about-us",
      h1: "About Consumers Energy Management Inc.",
    },
    
    { name: "Products", url: "/products", h1: "Products" },
    { name: "Services", url: "/services", h1: "Services" },
    { name: "Tools", url: "/tools", h1: "Tools & Resources" },
    { name: "Promotions", url: "/promotions", h1: "Promotions" },
    { name: "Careers", url: "/careers", h1: "Careers" },
    { name: "Blog", url: "/blog", h1: "Blog" },
    { name: "FAQs", url: "/faq", h1: "Frequently Asked Questions" },
    { name: "Contact", url: "/contact-us", h1: "Contact Us" },
  ];
  beforeEach(() => {
    cy.visit("/");
  });

  menuOptions.forEach((option) => {
    it(`Verify ${option.name} menu option`, () => {
      cy.contains(option.name).click();
      cy.url().should("include", option.url);
      if (option.h1) {
        cy.get("h1").should("contain", option.h1);
      } else {
        cy.get("h1").should("contain", option.name);
      }
    });
  });
});
