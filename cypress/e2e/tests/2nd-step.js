import { archivateCampaignIfExist,submitFirstStep } from "../../../cypress/e2e/lib/functions";

const dayjs = require("dayjs");
const i = 18;
const futureFirstDate = dayjs().add(1, "week").format("D.M.YYYY");
const futureSecondDate = dayjs()
  .add(1, "week")
  .add(1, "day")
  .format("D.M.YYYY");

describe("2nd step of creating campaign", () => {
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
  });

  it("Verify that start/end date are empty and button is disabled", () => {
    cy.get('[placeholder="dd/mm/yyyy"]').eq(0).should("be.empty");
    cy.get('[placeholder="dd/mm/yyyy"]').eq(1).should("be.empty");
    cy.contains("button", "Weiter").should("be.disabled");
    cy.contains("button", "Zurück").should("not.be.disabled").click();
    cy.contains("h2", "1 / 6 Kampagnenname").should("exist");
  });

  it("Verify date is the past and more than 18 months are disabled in calendar", () => {
    cy.get('[placeholder="dd/mm/yyyy"]').eq(0).click();
    cy.get('[data-focus-lock-disabled="false"]').should("be.visible");

    cy.get(`[aria-label='${dayjs().format("D.M.YYYY")}']`)
      .parent()
      .then(($div) => {
        const idx = $div.index();
        for (let i = 0; i <= idx; i++) {
          cy.get(
            `[aria-label='${dayjs().subtract(i, "day").format("D.M.YYYY")}']`
          ).should("be.disabled");
        }
      });

    for (let i = 0; i < 18; i++) {
      cy.get('[aria-label=">"]').click();
    }

    cy.get(
      `[aria-label='${dayjs()
        .add(18, "month")
        .add(2, "day")
        .format("D.M.YYYY")}']`
    ).should("be.disabled");

    cy.get(
      `[aria-label='${dayjs()
        .add(18, "month")
        .add(1, "day")
        .format("D.M.YYYY")}']`
    ).should("not.be.disabled");

    cy.get('[title="Abbrechen"]').click();
  });

  it("Verify selected dates are displayed correcly in the field and redirect to the 3rd step", () => {
    cy.get('[placeholder="dd/mm/yyyy"]').eq(0).click();
    cy.get('[data-focus-lock-disabled="false"]').should("be.visible");
    cy.get(`[aria-label='${futureFirstDate}']`).click();
    cy.get(`[aria-label='${futureSecondDate}']`).click();
    cy.get('[placeholder="dd/mm/yyyy"]')
      .eq(0)
      .should("have.value", futureFirstDate);
    cy.get('[placeholder="dd/mm/yyyy"]')
      .eq(1)
      .should("have.value", futureSecondDate);
    cy.get('[aria-label="Sieht richtig aus"]').should("exist");

    cy.contains("button", "Weiter").should("not.be.disabled").click();
    cy.contains("h2", "3 / 6 Medien-Datei").should("exist");
  });
});

