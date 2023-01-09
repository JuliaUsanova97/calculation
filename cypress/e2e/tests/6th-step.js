import {
  submitFirstStep,
  submitSecondStep,
  submitThirdStep,
  submitFourthStep,
  submitFifthStep,
  archivateCampaign,
  futureFirstDate,
  futureSecondDate,
  campaignName,
  capacity,
  numberOfDisplay,
  imageName,
} from "../../../cypress/e2e/lib/functions";


describe("6th step of creating campaign", () => {
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
    submitFifthStep();
  });

  it("Verify that values are disaplyed correctly", () => {
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
  });

    it("Successfully payment with credit card", () => {
      cy.contains('button','Kampagne buchen').click();
      cy.wait(5000);
      cy.get('[role="dialog"]').should('exist');
      cy.contains('button','Jetzt zahlen').should('be.disabled');
      cy.get('[placeholder="Name des Kreditkartenbesitzers"]').click().type('test');
      getIframeBody(0).find('input[name="cardnumber"]').type('4242424242424242');
      getIframeBody(1).find('input[name="exp-date"]').type('0255');
      getIframeBody(2).find('input[name="cvc"]').type('123');
      cy.contains('button','Jetzt zahlen').should('not.be.disabled').click();
      cy.wait(15000);
      cy.contains('Deine Kampagne wurde erfolgreich erstellt und wird jetzt von unserem Team geprüft. Die Buchungsbestätigung erhältst du per E-Mail.');

  });

  it.only("Failed payment with credit card", () => {
    cy.contains('button','Kampagne buchen').click();
    cy.wait(5000);
    cy.get('[role="dialog"]').should('exist');
    cy.contains('button','Jetzt zahlen').should('be.disabled');
    cy.get('[placeholder="Name des Kreditkartenbesitzers"]').click().type('test');
    getIframeBody(0).find('input[name="cardnumber"]').type('4000000000009995');
    getIframeBody(1).find('input[name="exp-date"]').type('0255');
    getIframeBody(2).find('input[name="cvc"]').type('123');
    cy.contains('button','Jetzt zahlen').should('not.be.disabled').click();
    cy.wait(15000);
    cy.contains('Das Guthaben auf Ihrer Karte ist nicht ausreichend.');

});



function getIframeDocument(i) {
    return cy.get('iframe').eq(i).its('0.contentDocument').should('exist');
  }
  function getIframeBody(i){
    return getIframeDocument(i)
      .its('body')
      .should('not.be.undefined')
      .then(cy.wrap);
  }



});