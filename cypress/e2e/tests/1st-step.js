import { random, faker } from "@faker-js/faker";
import { archivateCampaign } from "../../../cypress/e2e/lib/functions";

describe("1st step of creating campaign", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-in`);
    cy.contains("button", "Auswahl erlauben").click();
    cy.get('[type="email"]').type(Cypress.env("EMAIL"));
    cy.get('[type="password"]').type(Cypress.env("PASSWORD"));
    cy.contains("button", "Anmelden").click();
    cy.url().should("include", "/dashboard/campaigns", { timeout: 10000 });
    cy.contains("button", "Neue Kampagne").should("be.not.disabled").click();
  });
  it("Verify pre-filled name and field can not be empty", () => {
    cy.contains("h2", "1 / 6 Kampagnenname");
    cy.contains("button", "Weiter").should("not.be.disabled");
    cy.get('[value^="Neue Kampagne"]').should("exist").clear();
    cy.contains("button", "Weiter").should("be.disabled");
    archivateCampaign();
  });
  it("Verify that name field should not contain more than 255 characters", () => {
    cy.get('[value^="Neue Kampagne"]').should("exist").clear();
    cy.get('[placeholder="Bitte Namen deiner Kampagne eingeben"]').type(
      faker.random.alphaNumeric(256),
      {
        delay: 0,
      }
    );
    cy.get('[placeholder="Bitte Namen deiner Kampagne eingeben"]')
      .invoke("val")
      .its("length")
      .should("eq", 256);
    cy.contains("button", "Weiter").should("be.disabled");
    cy.get('[role="img"]').should("not.exist");
    cy.get('[placeholder="Bitte Namen deiner Kampagne eingeben"]')
      .click()
      .type("{backspace}");
    cy.contains("button", "Weiter").should("be.not.disabled");
    cy.get('[role="img"]').should("exist");
    archivateCampaign();
  });

  it("Redirect to the 2nd step", () => {
    cy.get('[placeholder="Bitte Namen deiner Kampagne eingeben"]')
      .should("exist")
      .clear();
    cy.get('[placeholder="Bitte Namen deiner Kampagne eingeben"]').type(
      faker.name.firstName()
    );
    cy.get('[role="img"]').should("exist");
    cy.contains("button", "Weiter").should("be.not.disabled").click();
    cy.contains("h2", "2 / 6 Kampagnenzeitraum");
    archivateCampaign();
  });
});
