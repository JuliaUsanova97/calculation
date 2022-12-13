import { random, faker } from "@faker-js/faker";

describe("1st step of creating campaign", () => {
  beforeEach(() => {
    cy.visit("https://thefuture:ofadvertising@app.curryfresh.de/sign-in");
    cy.get('[class="sc-12hrgpe-0 sc-1l3wqm4-9 bkBocI eyXyno"]')
      .should("have.text", "Auswahl erlauben")
      .click();
    cy.get('[type="email"]').click().type("mihagof219@cnogs.com");
    cy.get('[type="password"]').click().type("qweqweqwe");
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-hi8gwd-7 egnZdD"').click();
    cy.wait(3000);
    cy.url().should("include", "https://app.curryfresh.de/dashboard/campaigns");
    cy.get('[class="sc-pbn3r-0 dRRtnH"]')
      .should("have.text", "Neue Kampagne")
      .should("be.not.disabled")
      .click();
  });
  it("Verify pre-filled name and field can not be empty", () => {
    cy.get('[class="sc-cgzfnp-4 hDUHhW"]').should(
      "have.text",
      "1 / 6 Kampagnenname"
    );
    //cy.get("[input.sc-1q8thk9-0.lgPsCv]").should("contain", "Neue Kampagne");
    cy.get('[class="sc-pbn3r-0 dRRtnH"]').should("not.be.disabled");
    cy.get('[class="sc-pbn3r-1 kxXfoF"]').contains("Weiter");
    cy.get('[class="sc-1q8thk9-0 lgPsCv"]').should("exist").clear();
    cy.get('[class="sc-pbn3r-0 dRRtnH"]').should("be.disabled");
    archivateCampaign();
  });
  it("Verify that name field should not contain more than 255 characters", () => {
    cy.get('[class="sc-1q8thk9-0 lgPsCv"]').should("exist").clear();
    cy.get('[class="sc-1q8thk9-0 lgPsCv"]').type(
      faker.random.alphaNumeric(256),
      {
        delay: 0,
      }
    );
    cy.get('[class="sc-1q8thk9-0 lgPsCv"]')
      .invoke("val")
      .its("length")
      .should("eq", 256);
    cy.get('[class="sc-pbn3r-0 dRRtnH"]').should("be.disabled");
    cy.get('[class="sc-1duzzy5-0 heFnBy enter-done"]').should("not.exist");
    cy.get('[class="sc-1q8thk9-0 lgPsCv"]').click().type("{backspace}");
    cy.get('[class="sc-pbn3r-0 dRRtnH"]').should("be.not.disabled");
    cy.get('[class="sc-1duzzy5-0 heFnBy enter-done"]').should("exist");
    archivateCampaign();
  });

  it.only("Verify that name field should not contain more than 255 characters", () => {
    cy.get('[class="sc-1q8thk9-0 lgPsCv"]').should("exist").clear();
    cy.get('[class="sc-1q8thk9-0 lgPsCv"]').type("testtest");
    cy.get('[class="sc-1duzzy5-0 heFnBy enter-done"]').should("exist");
    cy.get('[class="sc-pbn3r-0 dRRtnH"]')
      .eq(1)
      .should("be.not.disabled")
      .click();
    cy.get('[class="sc-cgzfnp-4 hDUHhW"]').should(
      "have.text",
      "2 / 6 Kampagnenzeitraum"
    );
    archivateCampaign();
  });
});

function archivateCampaign() {
  cy.get('[class="sc-12hrgpe-0 sc-cgzfnp-5 bkBocI bdTtHM"]').click();
  cy.wait(1000);
  cy.get('[class="sc-19i9sxu-1 gdvgEv"]').eq(0).should("be.visible");
  cy.get('[class="sc-933bxs-1 cGsKjp"]').eq(2).should("be.visible").click();
  cy.get('[class="modal-content sc-icb63j-1 ccRvgk is-opened"]').should(
    "be.visible"
  );
  cy.get('[class="sc-pbn3r-1 kxXfoF"]').contains("Bestätigen");
  cy.get('[class="sc-pbn3r-0 dRRtnH sc-2rxh1o-2 dqTPSW"]')
    .should("be.visible")
    .click();
  cy.wait(2000);
}
