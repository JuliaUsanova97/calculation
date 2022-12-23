import {
  submitFirstStep,
  submitSecondStep,
} from "../../../cypress/e2e/lib/functions";
import { archivateCampaign } from "../../../cypress/e2e/lib/functions";

describe("3rd step of creating campaign", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-in`);
    cy.get('[type="submit"]').contains("Auswahl erlauben").click();
    cy.get('[type="email"]').type(Cypress.env("EMAIL"));
    cy.get('[type="password"]').type(Cypress.env("PASSWORD"));
    cy.get('[type="submit"]').contains("Anmelden").click();
    cy.url().should("include", "/dashboard/campaigns", { timeout: 10000 });
    cy.contains("button", "Neue Kampagne").should("be.not.disabled").click();

    submitFirstStep();
    submitSecondStep();
  });

  it("Verify that file uploaded correctly to Bilder", () => {
    cy.contains("button", "Weiter").should("be.disabled");
    cy.contains("button", "Bilder").should("be.visible").click();
    cy.contains("button", "Hochladen").should("be.visible").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("button", "Datei auswählen").should("be.visible");
    cy.get("input[type=file]").selectFile("cypress/fixtures/image-step-3.jpg");
    cy.wait(2000);

    //archivateCampaign();
  });
});
