import { 
    archivateCampaignIfExist,
    submitFirstStepOfCreatingCampaign,
    submitSecondStepOfCreatingCampaign,
    submitThirdStepOfCreatingCampaign,
    submitFourthStepOfCreatingCampaign,
    submitFifthStepOfCreatingCampaign,
    enterCardValues,
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

      archivateCampaignIfExist();

      cy.contains("button", "Neue Kampagne").should("be.not.disabled").click();
      submitFirstStepOfCreatingCampaign();
    });
  
    it("Verify that archivated campaign with status Entwurf is displayed in the Archivierte tab ", () => {
      cy.get('[title="Abbrechen"]').click();
      cy.wait(1000);
      archivateCampaignIfExist();
      cy.get('[role="tab"]').eq(1).click();
      cy.wait(1000);
      cy.get(".ihFAIC").eq(0).should("contain.text",campaignName).and("contain.text", todayDate);

    });

    it.only("Verify that campaign with status In Prüfung can not be archivated", () => {
      submitSecondStepOfCreatingCampaign();
      submitThirdStepOfCreatingCampaign();
      submitFourthStepOfCreatingCampaign();
      submitFifthStepOfCreatingCampaign();
      enterCardValues(validCardNumber);
      cy.contains(
        "Deine Kampagne wurde erfolgreich erstellt und wird jetzt von unserem Team geprüft. Die Buchungsbestätigung erhältst du per E-Mail.",
        { timeout: 15000 }
      );
    });

});