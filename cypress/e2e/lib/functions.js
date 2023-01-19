import { faker } from "@faker-js/faker";
const dayjs = require("dayjs");
export const futureFirstDate = dayjs().add(1, "week").format("D.M.YYYY");
export const futureSecondDate = dayjs()
  .add(1, "week")
  .add(1, "day")
  .format("D.M.YYYY");
const randomNumber = Math.floor(Math.random() * (90 - 10)) + 10;
export const campaignName = faker.name.firstName();
export const capacity = 10;
export const numberOfDisplay = 1;
export const imageName = "image-step-3";

export function archivateCampaignIfExist() {
  cy.get('[class="sc-1jlncfu-1 loqbsV"]')
  .eq(0)
  .invoke("text")
  .then((text) => {
    if (text === "Entwurf") {
      cy.get('[class="sc-19i9sxu-0 loGHYh"]')
      .eq(0)
      .find('[aria-label="Kampagne archivieren"]')
      .should("be.visible")
      .click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("button", "Bestätigen").should("be.visible").click();
    cy.contains(campaignName).should('not.exist');}
  });
}

export function submitFirstStepOfCreatingCampaign() {
  cy.get('[name="name"]').clear().type(campaignName).should('have.value',campaignName);
  cy.contains("button", "Weiter").should("be.not.disabled").click();
}

export function submitSecondStepOfCreatingCampaign() {
  cy.get('[placeholder="dd/mm/yyyy"]').eq(0).click();
  cy.get(`[aria-label='${futureFirstDate}']`).click();
  cy.get(`[aria-label='${futureSecondDate}']`).click();
  cy.get('[aria-label="Sieht richtig aus"]').should("exist");
  cy.contains("button", "Weiter").should("not.be.disabled").click();
}

export function submitThirdStepOfCreatingCampaign() {
  cy.contains("button", "Bilder").click();
  cy.contains("button", "Hochladen").click();
  cy.get("input[type=file]").selectFile(`cypress/fixtures/${imageName}.jpg`, {
    force: true,
  });
  cy.contains("button", "Fertig",{ timeout: 7000 }).should("not.be.disabled").click();
  cy.contains("button", "Weiter").click();
}

export function submitFourthStepOfCreatingCampaign() {
  cy.get("select").select(
    `Ziel ${capacity}&nbsp;% der Spielzeit aller ausgewählten Ad Units`
  );
  cy.contains("button", "Weiter").should("not.be.disabled").click();
}

export function submitFifthStepOfCreatingCampaign() {
  cy.contains("button", "0 Ad Units ausgewählt").click();
  cy.get('[role="dialog"]').should("be.visible");
  cy.wait(1000);
  cy.get('[aria-label="grid"]').scrollTo("0%", `${randomNumber}%`);
  cy.wait(1000);
  cy.get('[class="sc-ky7p6x-2 kdeYuM"]')
    .first()
    .find('[class="sc-l2ahyy-2 bpSloI"]')
    .click({ force: true });
  cy.contains("button", `${numberOfDisplay} Ad Unit ausgewählt`, { timeout: 1000 });
  cy.contains("button", "Zur Kampagne hinzufügen").click();
  cy.contains("button", "Weiter").should("not.be.disabled").click();
  cy.contains("h2", "6 / 6 Kampagnenzusammenfassung", { timeout: 15000 }).should("exist");
}

