import { random, faker } from "@faker-js/faker";
const dayjs = require("dayjs");
const i = 18;
const date1 = dayjs().add(1, "week").format("D.M.YYYY");
const date2 = dayjs().add(1, "week").add(1, "day").format("D.M.YYYY");

describe("2nd step of creating campaign", () => {
  beforeEach(() => {
    cy.visit("https://thefuture:ofadvertising@app.curryfresh.de/sign-in");
    cy.get('[class="sc-12hrgpe-0 sc-1l3wqm4-9 bkBocI eyXyno"]')
      .should("have.text", "Auswahl erlauben")
      .click();
    cy.get('[type="email"]').click().type("mihagof219@cnogs.com");
    cy.get('[type="password"]').click().type("qweqweqwe");
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-hi8gwd-7 egnZdD"').click();
    cy.wait(1000);
    cy.url().should("include", "https://app.curryfresh.de/dashboard/campaigns");
    cy.get('[class="sc-pbn3r-0 dRRtnH"]')
      .should("have.text", "Neue Kampagne")
      .should("be.not.disabled")
      .click();
    submitFirstStep();
  });

  it("Verify that start/end date are empty and button is disabled", () => {
    cy.get('[class="sc-12lin5r-2 lkaMXz"]').eq(0).should("be.empty");
    cy.get('[class="sc-12lin5r-2 lkaMXz"]').eq(1).should("be.empty");
    cy.get('[class="sc-pbn3r-0 dRRtnH"]').eq(2).should("be.disabled");
    cy.get('[class="sc-pbn3r-1 kxXfoF"]').eq(2).should("have.text", "Weiter");
    cy.get('[class="sc-pbn3r-0 dRRtnH"]').eq(1).should("not.be.disabled");
    cy.get('[class="sc-pbn3r-1 kxXfoF"]')
      .eq(1)
      .should("have.text", "Zurück")
      .click();
    cy.get('[class="sc-cgzfnp-4 hDUHhW"]').should(
      "have.text",
      "1 / 6 Kampagnenname"
    );
    archivateCampaign();
  });

  it("Verify date is the past and more than 18 months are disabled in calendar", () => {
    cy.get('[class="sc-12lin5r-2 lkaMXz"]').eq(0).click();
    cy.get('[class="sc-y60c69-0 gnEKny"]').should("be.visible");
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
      cy.get('[class="sc-12hrgpe-0 sc-1b7onhl-2 bkBocI cPfMjv"]').eq(1).click();
    }

    cy.get(
      `[aria-label='${dayjs()
        .add(18, "month")
        .add(2, "day")
        .format("D.M.YYYY")}']`
    ).should("be.disabled");

    archivateCampaign();
  });

  it("Verify selected date is displayed correcly in the field", () => {
    cy.get('[class="sc-12lin5r-2 lkaMXz"]').eq(0).click();
    cy.get('[class="sc-y60c69-0 gnEKny"]').should("be.visible");
    cy.get(`[aria-label='${date1}']`).click();
    cy.get(`[aria-label='${date2}']`).click();
    cy.get('[class="sc-12lin5r-2 lkaMXz"]').eq(0).should("have.value", date1);
    cy.get('[class="sc-12lin5r-2 lkaMXz"]').eq(1).should("have.value", date2);
    cy.get('[class="sc-1duzzy5-0 heFnBy enter-done"]').should("exist");

    archivateCampaign();
  });

  it("Redirect to the 3rd step", () => {
    cy.get('[class="sc-12lin5r-2 lkaMXz"]').eq(0).click();
    cy.get('[class="sc-y60c69-0 gnEKny"]').should("be.visible");
    cy.get(`[aria-label='${date1}']`).click();
    cy.get(`[aria-label='${date2}']`).click();
    cy.get('[class="sc-1duzzy5-0 heFnBy enter-done"]').should("exist");
    cy.get('[class="sc-pbn3r-0 dRRtnH"]')
      .eq(2)
      .should("not.be.disabled")
      .should("have.text", "Weiter")
      .click();
    cy.get('[class="sc-cgzfnp-4 hDUHhW"]').should(
      "have.text",
      "3 / 6 Medien-Datei"
    );

    archivateCampaign();
  });
});

function submitFirstStep() {
  cy.get('[class="sc-1q8thk9-0 lgPsCv"]').should("exist").clear();
  cy.get('[class="sc-1q8thk9-0 lgPsCv"]').type("testtest");
  cy.get('[class="sc-pbn3r-0 dRRtnH"]').eq(1).should("be.not.disabled").click();
}
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
