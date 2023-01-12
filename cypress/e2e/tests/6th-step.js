import {
  submitFirstStep,
  submitSecondStep,
  submitThirdStep,
  submitFourthStep,
  submitFifthStep,
  archivateCampaignIfExist,
  futureFirstDate,
  futureSecondDate,
  campaignName,
  capacity,
  numberOfDisplay,
  imageName,
} from "../../../cypress/e2e/lib/functions";
const validCardNumber = "4242424242424242";
const invalidCardNumber = "4000000000009995";
const expDate = "0255";
const cvc = "123";

describe("6th step of creating campaign", () => {
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
    submitSecondStep();
    submitThirdStep();
    submitFourthStep();
    submitFifthStep();
  });

  it("Verify that values are disaplyed correctly and checking failed payment", () => {
    cy.contains("h2", "6 / 6 Kampagnenzusammenfassung").should("exist");

    cy.get('[class="sc-1ubqj8f-2 gwLGzD"]').eq(0).contains(campaignName);
    cy.get('[class="sc-1ubqj8f-2 gwLGzD"]')
      .eq(1)
      .contains(`${futureFirstDate} - ${futureSecondDate}`);
    cy.get('[class="sc-1ubqj8f-2 gwLGzD"]')
      .eq(2)
      .contains(`${numberOfDisplay}`);
    cy.get('[class="sc-1ubqj8f-2 gwLGzD"]').eq(3).contains(`${capacity}%`);
    cy.get('[class="sc-1ubqj8f-2 gwLGzD"]').eq(4).contains(`${imageName}.mp4`);
    cy.get('[class="sc-1ubqj8f-2 gwLGzD"]').eq(5).contains("Video");

    enterCardValues(invalidCardNumber);
    cy.contains("Das Guthaben auf Ihrer Karte ist nicht ausreichend.", {
      timeout: 15000,
    });
  });

  it("Verify successfully payment", () => {
    enterCardValues(validCardNumber);
    cy.contains(
      "Deine Kampagne wurde erfolgreich erstellt und wird jetzt von unserem Team geprüft. Die Buchungsbestätigung erhältst du per E-Mail.",
      { timeout: 15000 }
    );
  });

  function enterCardValues(cardNumber) {
    cy.contains("button", "Kampagne buchen").click();
    cy.get('[role="dialog"]').should("exist");
    cy.contains("button", "Jetzt zahlen").should("be.disabled");
    cy.get('[placeholder="Name des Kreditkartenbesitzers"]')
      .should("not.be.disabled", { timeout: 3000 })
      .click()
      .type("test");
    console.log(123);
    getIframeBody(0).find('input[name="cardnumber"]').type(cardNumber);
    getIframeBody(1).find('input[name="exp-date"]').type(expDate);
    getIframeBody(2).find('input[name="cvc"]').type(cvc);
    cy.contains("button", "Jetzt zahlen").should("not.be.disabled").click();
  }

  function getIframeDocument(i) {
    return cy.get("iframe").eq(i).its("0.contentDocument").should("exist");
  }
  function getIframeBody(i) {
    return getIframeDocument(i)
      .its("body")
      .should("not.be.undefined")
      .then(cy.wrap);
  }
});
