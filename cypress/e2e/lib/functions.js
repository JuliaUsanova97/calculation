import { faker } from "@faker-js/faker";
const dayjs = require("dayjs");
const futureFirstDate = dayjs().add(1, "week").format("D.M.YYYY");
const futureSecondDate = dayjs()
  .add(1, "week")
  .add(1, "day")
  .format("D.M.YYYY");

export function archivateCampaign() {
  cy.get('[class="sc-19i9sxu-0 loGHYh"]')
    .eq(0)
    .find('[aria-label="Kampagne archivieren"]')
    .should("be.visible")
    .click();
  cy.get('[role="dialog"]').should("be.visible");
  cy.contains("button", "Bestätigen").should("be.visible").click();
  cy.wait(1000);
}

export function submitFirstStep() {
  cy.get('[name="name"]').clear().type(faker.name.firstName());
  cy.contains("button", "Weiter").should("be.not.disabled").click();
}

export function submitSecondStep() {
  cy.get('[placeholder="dd/mm/yyyy"]').eq(0).click();
  cy.get(`[aria-label='${futureFirstDate}']`).click();
  cy.get(`[aria-label='${futureSecondDate}']`).click();
  cy.get('[aria-label="Sieht richtig aus"]').should("exist");
  cy.contains("button", "Weiter").should("not.be.disabled").click();
}
