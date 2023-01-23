describe("1st calculation case", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-in`);
    cy.wait(1000);
    cy.contains("button", "Se connecter").click();
    cy.get('[name="email"]').type(Cypress.env("EMAIL"));
    cy.get('[name="password"]').type(Cypress.env("PASSWORD"));
    cy.contains("button", "Se connecter").click();
    cy.wait(3000);
    // cy.url().should("include", "/investment-properties", { timeout: 10000 });
    cy.visit(`${Cypress.env("WEBSITE_URL")}/mortgage-calculator`);
  });

  it("Calculation for one person", () => {
    cy.contains("Simulez votre capacité de financement en 5 min");
    cy.contains("button", "Accepter et fermer").click();
    cy.wait(5000);
    cy.get('[class="draft-components-rich-text-editor"]').should("exist");
    cy.get(".ilrxnI").should("exist").click();
    cy.get("input[id=borrowingType-Seul]").should("not.be.checked").click();
  });
});
