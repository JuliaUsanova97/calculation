import { faker } from '@faker-js/faker';

const EMAIL_FIELD_TEST_DATA = [
    "123",
    "123@",
    "12345@q",
    "15151515@.r",
    "!@#$%^&*()_",
  ];
  const PASSWORD_FIELD_TEST_DATA = [
    "1",
    "12",
    "123",
    "1234",
    "12345",
    "123456",
    "1234567",
  ];
  
describe("sign-in page", () => {
    beforeEach(() => {
      cy.visit("https://thefuture:ofadvertising@app.curryfresh.de/sign-in");
      cy.get('[class="sc-12hrgpe-0 sc-1l3wqm4-9 bkBocI eyXyno"]')
        .should("have.text", "Auswahl erlauben")
        .click();
    });
    it("Verify that validation appears if email and password field are empty", () => {
      cy.get('[type="email"]').should("have.value", "").click().blur();
      cy.get('[class="sc-dqd7km-1 jXybrt"]')
        .eq(0)
        .should("have.text", "Bitte gebe deine E-Mail-Adresse ein.");
      cy.get('[type="password"]').should("have.value", "").click().blur();
      cy.get('[class="sc-dqd7km-1 jXybrt"]')
        .eq(1)
        .should("have.text", "Dein Passwort");
    });
  
    it("Verify that validation appears if email isn't valid", () => {
      EMAIL_FIELD_TEST_DATA.forEach((value1) => {
        cy.get('[type="email"]').click();
        cy.get('[type="email"]').type(value1).blur();
        cy.get('[class="sc-dqd7km-1 jXybrt"]').should(
          "have.text",
          "Bitte überprüfe das Format der E-Mail-Adresse."
        );
        cy.get('[type="email"]').clear();
      });
    });
  
    it("Verify that validation appears if email and password aren't valid", () => {
      cy.get('[class="sc-pbn3r-0 dRRtnH sc-hi8gwd-7 egnZdD"]')
        .should("have.text", "Anmelden")
        .should("be.disabled");
      cy.get('[type="email"]').click().type(faker.internet.email());
      cy.get('[type="password"]').click().type("qweqweqwe");
      cy.get('[class="sc-pbn3r-1 kxXfoF"]').should("not.be.disabled").click();
      cy.get('[class="sc-hi8gwd-8 jfBdzO"]').should(
        "have.text",
        "Passwort oder E-Mail-Adresse sind ungültig"
      );
    });
  
    it("Successfully sign-in", () => {
      cy.get('[class="sc-pbn3r-0 dRRtnH sc-hi8gwd-7 egnZdD"]')
        .should("have.text", "Anmelden")
        .should("be.disabled");
      cy.get('[type="email"]').click().type("mihagof219@cnogs.com");
      cy.get('[type="password"]').click().type("qweqweqwe");
      cy.get('[class="sc-pbn3r-0 dRRtnH sc-hi8gwd-7 egnZdD"')
        .should("not.be.disabled")
        .click();
        cy.wait(4000);
      cy.url().should("include", "https://app.curryfresh.de/dashboard/campaigns");
    });
  });