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

describe("sign-up page", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-up`);
    cy.get('[class="sc-12hrgpe-0 sc-1l3wqm4-9 bkBocI eyXyno"]')
      .should("have.text", "Auswahl erlauben")
      .click();
  });
  it("Verify that validation appears if email and password field are empty", () => {
    cy.get('[type="email"]').should("have.value", "").click().blur();
    cy.get('[class="sc-dqd7km-1 jXybrt"]').should(
      "have.text",
      "Bitte gebe deine E-Mail-Adresse ein."
    );
    cy.get('[type="password"]').should("have.value", "").click().blur();
    cy.get('[class="sc-12z071v-0 bjNtCf sc-h708rf-7 kZKrLE"]').should(
      "have.text",
      "Dein Passwort muss mindestens 8 Zeichen enthalten."
    );
  });

  it("Verify that validation appears if email is not valid", () => {
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

  it("Verify that validation appears if the password is less than 8 characters", () => {
    PASSWORD_FIELD_TEST_DATA.forEach((value2) => {
      cy.get('[type="password"]').click();
      cy.get('[type="password"]').type(value2).blur();
      cy.get('[class="sc-12z071v-0 bjNtCf sc-h708rf-7 kZKrLE"]')
        .should(
          "have.text",
          "Dein Passwort muss mindestens 8 Zeichen enthalten."
        )
        .and("have.css", "color", "rgba(189, 56, 88, 0.87)");
      cy.get('[type="password"]').clear();
    });
    cy.get('[type="password"]').click().type("12345678");
    cy.get('[class="sc-12z071v-0 ilmPuM sc-h708rf-7 kZKrLE"]')
      .should("have.text", "Dein Passwort muss mindestens 8 Zeichen enthalten.")
      .and("have.css", "color", "rgba(5, 163, 122, 0.87)");
  });

  it("Successfully sign-up", () => {
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-h708rf-9 fIWDFM"')
      .should("have.text", "Registrieren")
      .should("be.disabled");
    cy.get('[type="email"]').click().type(faker.internet.email().toLowerCase());
    cy.get('[type="password"]').click().type("qweqweqwe");
    cy.get('[name="accepted"]').click({ force: true });
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-h708rf-9 fIWDFM"')
      .should("not.be.disabled")
      .click();
    cy.url().should("include", "/dashboard/settings");
  });
});
