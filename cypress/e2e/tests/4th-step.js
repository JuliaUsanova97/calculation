import {
  archivateCampaignIfExist,
  submitFirstStep,
  submitSecondStep,
  submitThirdStep,
} from "../../../cypress/e2e/lib/functions";
const i = 5;

describe("4th step of creating campaign", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-in`);
    cy.get('[type="submit"]').contains("Auswahl erlauben").click();
    cy.get('[type="email"]').type(Cypress.env("EMAIL"));
    cy.get('[type="password"]').type(Cypress.env("PASSWORD"));
    cy.get('[type="submit"]').contains("Anmelden").click();
    cy.url().should("include", "/dashboard/campaigns", { timeout: 10000 });

    archivateCampaignIfExist();

    cy.contains("button", "Neue Kampagne").should("be.not.disabled").click();

    submitFirstStep();
    submitSecondStep();
    submitThirdStep();
  });

  it("Verify that user can select any value for field and check redirect to the 5th step", () => {
    cy.contains("button", "Weiter").should("be.disabled");
    cy.contains("button", "Zurück").should("not.be.disabled").click();
    cy.contains("h2", "3 / 6 Medien-Datei").should("exist");
    cy.contains("button", "Weiter").click();
    cy.contains(
      "option",
      "Wie viel Displaykapazität möchtest du buchen?"
    ).should("exist");

    for (let i = 0; i < 5; i++) {
      cy.get("select").select(`${i}`);
      cy.contains(`${i + 1}0 %`);
    }
    cy.get("select").select(`0`);
    cy.get('[aria-label="Sieht richtig aus"]').should("exist");
    cy.contains("button", "Weiter").should("not.be.disabled").click();
    cy.contains("h2", "5 / 6 Displays").should("exist");
  });
});
