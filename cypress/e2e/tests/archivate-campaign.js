import { 
    archivateCampaign,
    submitFirstStep,
    campaignName
    } from "../../../cypress/e2e/lib/functions";
const dayjs = require("dayjs");
const todayDate = dayjs().format("D.M.YYYY");

describe("Archivate campaign", () => {
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
      cy.get('[title="Abbrechen"]').click();
      cy.wait(1000);
      archivateCampaign();
    });
  
    it("Verify that archivated campaign is displayed in the Archivierte tab ", () => {
      cy.get('[role="tab"]').eq(1).click();
      cy.get(".ihFAIC").eq(0).should("contain.text",campaignName).and("contain.text", todayDate);

    });
});