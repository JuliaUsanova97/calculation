import {
  submitFirstStep,
  submitSecondStep,
  submitThirdStep,
  submitFourthStep,
  submitFifthStep,
} from "../../../cypress/e2e/lib/functions";
import { archivateCampaign } from "../../../cypress/e2e/lib/functions";

const randomNumber = Math.floor(Math.random() * (90 - 10)) + 10;

describe("5th step of creating campaign", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-in`);
    cy.get('[type="submit"]').contains("Auswahl erlauben").click();
    cy.get('[type="email"]').type(Cypress.env("EMAIL"));
    cy.get('[type="password"]').type(Cypress.env("PASSWORD"));
    cy.get('[type="submit"]').contains("Anmelden").click();
    cy.url().should("include", "/dashboard/campaigns", { timeout: 10000 });

    cy.get('[class="sc-1jlncfu-1 loqbsV"]')
      .eq(0)
      .invoke("text")
      .then((text) => {
        if (text === "Entwurf") {
          archivateCampaign();
        }
      });

    cy.contains("button", "Neue Kampagne").should("be.not.disabled").click();

    submitFirstStep();
    submitSecondStep();
    submitThirdStep();
    submitFourthStep();
    submitFifthStep();
  });

  it("Verify that values are disaplyed correctly", () => {
    cy.contains("h2", "6 / 6 Kampagnenzusammenfassung").should("exist");

    cy.get('[title="Abbrechen"]').click();
    cy.wait(1000);
    archivateCampaign();
  });
});
