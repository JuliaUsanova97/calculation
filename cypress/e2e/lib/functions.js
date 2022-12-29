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

export function submitThirdStep() {
  cy.contains("button", "Bilder").click();
  cy.contains("button", "Hochladen").click();
  cy.get("input[type=file]").selectFile("cypress/fixtures/image-step-3.jpg", {
    force: true,
  });
  cy.wait(5000);
  cy.contains("button", "Fertig").click();
  cy.contains("button", "Weiter").click();
}

export function submitFourthStep() {
  cy.get("select").select(`0`);
  cy.contains("button", "Weiter").should("not.be.disabled").click();
}

export function submitFifthStep() {
  cy.contains("button", "0 Displays ausgewählt").click();
  cy.wait(1000);
  cy.get('[aria-label="grid"]').scrollTo("0%", `${randomNumber}%`);
  cy.wait(1000);
  cy.get('[role="rowgroup"]').children().first().scrollIntoView();
  cy.wait(1000);

  cy.get('[class="sc-l2ahyy-2 bpSloI"]').eq(4).click();
  cy.wait(1000);
  cy.contains("button", "Zur Kampagne hinzufügen").click();
  cy.contains("button", "Weiter").click();
  cy.wait(10000);
}
