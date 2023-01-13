import {
  archivateCampaignIfExist,
  submitFirstStepOfCreatingCampaign,
  submitSecondStepOfCreatingCampaign,
  submitThirdStepOfCreatingCampaign,
  submitFourthStepOfCreatingCampaign,
} from "../../../cypress/e2e/lib/functions";

const randomNumber = Math.floor(Math.random() * (90 - 10)) + 10;

describe("5th step of creating campaign", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-in`);
    cy.get('[type="submit"]').contains("Auswahl erlauben").click();
    cy.get('[type="email"]').type(Cypress.env("EMAIL"));
    cy.get('[type="password"]').type(Cypress.env("PASSWORD"));
    cy.get('[type="submit"]').contains("Anmelden").click();
    cy.url().should("include", "/dashboard/campaigns", { timeout: 10000 });

    archivateCampaignIfExist();

    cy.contains("button", "Neue Kampagne").should("be.not.disabled").click();

    submitFirstStepOfCreatingCampaign();
    submitSecondStepOfCreatingCampaign();
    submitThirdStepOfCreatingCampaign();
    submitFourthStepOfCreatingCampaign();
  });

  it("Verify that user can add random ad unit from the list", () => {
    cy.contains("button", "Weiter").should("be.disabled");
    cy.contains("button", "Zurück").should("not.be.disabled").click();
    cy.contains("h2", "4 / 6 Kapazität").should("exist");
    cy.contains("button", "Weiter").click();
    cy.contains("button", "0 Ad Units ausgewählt").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.wait(1000);
    cy.get('[aria-label="grid"]').scrollTo("0%", `${randomNumber}%`);
    cy.wait(1000);
    cy.get('[class="sc-ky7p6x-2 kdeYuM"]')
      .first()
      .find('[class="sc-l2ahyy-2 bpSloI"]')
      .click({ force: true });
    cy.contains("button", "Zur Kampagne hinzufügen").click();
    cy.get('[role="dialog"]').should("not.exist");
    cy.contains("button", "1 Ad Unit ausgewählt");
    cy.get('[aria-label="Sieht richtig aus"]').should("exist");
    cy.contains("button", "Weiter").should("not.be.disabled").click();
    cy.contains("h2", "6 / 6 Kampagnenzusammenfassung", { timeout: 15000 }).should("exist");
  });
});
