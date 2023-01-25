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
    cy.visit(`${Cypress.env("WEBSITE_URL")}/mortgage-calculator`);
  });

  it("Calculation for one person", () => {
    cy.contains("Simulez votre capacité de financement en 5 min");
    cy.contains("button", "Accepter et fermer").click();
    cy.wait(3000);

    getIframeBody().find('[class="sc-gPpHY ilrxnI"]').click();

    cy.wait(1000);

    //cy.get("input[id=borrowingType-Seul]").should("not.be.checked");
    cy.findByText("Seul").click();
    cy.findByText("Un investissement locatif").click();
    cy.findByText("Hébergé gratuitement").click();
    cy.findByPlaceholderText("Age").clear().type("22");
    cy.findByText("Non").click();
    cy.findByPlaceholderText("Ex: 28 rue Beautreillis 75004 Paris")
      .clear()
      .type("210");
    cy.get('[role="option"]', { timeout: 1000 }).eq(0).click();
    cy.findByText("Travailleur non salarié").click();
    cy.findByText("Depuis plus de 3 ans").click();
    cy.findByText("Suivant").should("not.be.disabled").click();

    //2step
    cy.findByPlaceholderText("Revenus nets mensuels").clear().type("5000");
    cy.findByText("Nb mois").click();
    cy.get('[tabindex="-1"]').eq(0).click();
    cy.findAllByText("Oui").eq(0).click();
    cy.get('[placeholder="Primes annuelles"]').eq(0).clear().type("2000");
    cy.get('[placeholder="Primes annuelles"]').eq(1).clear().type("1000");
    cy.findAllByText("Non").eq(1).click();
    cy.findByText("Suivant").should("not.be.disabled").click();

    //3step
    cy.findAllByText("Oui").eq(0).click();
    cy.findAllByText("Crédit immobilier").click();
    cy.findAllByText("Crédit consommation").click();
    cy.findByPlaceholderText("Montant par mois", { timeout: 1000 })
      .eq(0)
      .clear()
      .type("200");
    cy.findByPlaceholderText("Montant par mois", { timeout: 1000 })
      .eq(1)
      .clear()
      .type("200");
    cy.findAllByText("Non").eq(1).click();
    cy.findByText("Suivant").should("not.be.disabled").click();
  });

  function getIframeDocument() {
    return cy.get("iframe").its("0.contentDocument").should("exist");
  }
  function getIframeBody() {
    return getIframeDocument()
      .its("body")
      .should("not.be.undefined")
      .then(cy.wrap);
  }
});
