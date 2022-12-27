import {
  submitFirstStep,
  submitSecondStep,
  submitThirdStep,
  submitFourthStep,
} from "../../../cypress/e2e/lib/functions";
import { archivateCampaign } from "../../../cypress/e2e/lib/functions";

const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;

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
  });

  it("Verify that user can add random ad unit from the list", () => {
    cy.contains("button", "Weiter").should("be.disabled");
    cy.contains("button", "Zurück").should("not.be.disabled").click();
    cy.contains("h2", "4 / 6 Kapazität").should("exist");
    cy.contains("button", "Weiter").click();
    cy.contains("button", "0 Displays ausgewählt").click();
    cy.wait(1000);
    cy.get('[aria-label="grid"]')
      .scrollTo("0%", `${randomNumber}%`)
      .then(() => {
        cy.get("[class$=is-selectable]")
          .eq(0)
          .find('[type="checkbox"]', { force: true })
          .click();
      });

    /* 
    cy.get('[class="sc-l2ahyy-3 jcMZwx"]')
      .invoke("text")
      .then(($text) => {
        cy.get(
          `[data-index="${
            Math.floor(Math.random() * (parseInt($text) - 0 + 1)) + 0
          }"]`
        ).click();
      }); */

    /*     cy.get('[title="Abbrechen"]').click();
    cy.wait(1000);
    archivateCampaign(); */
  });
});
