import { faker } from "@faker-js/faker";

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
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-in`);
    cy.contains('button',"Auswahl erlauben").click();
  });
  it("Verify that validation appears if email and password field are empty", () => {
    cy.get('[type="email"]').should("have.value", "").click().blur();
    cy.contains("Bitte gebe deine E-Mail-Adresse ein.");
    cy.get('[type="password"]').should("have.value", "").click().blur();
    cy.get('[class="sc-dqd7km-1 dGGnzq"]').eq(1).should('have.text',"Dein Passwort");
  });

  it("Verify that validation appears if email isn't valid", () => {
    EMAIL_FIELD_TEST_DATA.forEach((value1) => {
      cy.get('[type="email"]').type(value1).blur();
      cy.get('[class="sc-dqd7km-1 dGGnzq"]').should(
        "have.text",
        "Bitte überprüfe das Format der E-Mail-Adresse."
      );
      cy.get('[type="email"]').clear();
    });
  });

  it("Verify that validation appears if email and password aren't valid", () => {
    cy.contains('button',"Anmelden").should("be.disabled");
    cy.get('[type="email"]').type(faker.internet.email().toLowerCase());
    cy.get('[type="password"]').type("qweqweqwe");
    cy.contains('button',"Anmelden").should("not.be.disabled").click();
    cy.get('[class="sc-hi8gwd-8 iCZMRt"]').should(
      "have.text",
      "Passwort oder E-Mail-Adresse sind ungültig"
    );
  });

  it("Successfully sign-in", () => {
    cy.contains('button',"Anmelden").should("be.disabled");
    cy.get('[type="email"]').type(Cypress.env("EMAIL"));
    cy.get('[type="password"]').click().type(Cypress.env("PASSWORD"));
    cy.contains('button',"Anmelden").should("not.be.disabled").click();
    cy.wait(3000);
    cy.url().should("include", "/dashboard/campaigns");
  });
});
