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

    /*     cy.get("body").then($body => {
      if ($body.find("button[data-cy=appDrawerOpener]").length > 0) {   
          //evaluates as true
      }
  }); */

    /*   cy.get('[id="LOU_PLAYER_MAINFRAME"]').then($frame => {
    const content = $frame.contents();
    if(content.find('.my-button').length){
      content.find('.my-button').click();
    }
  }); */

    getIframeBody().find('[class="sc-gPpHY ilrxnI"]').click();

    cy.wait(1000);

    cy.contains("button", "Réinitialiser").click();
    cy.wait(1000);

    //1st step

    firstStep(
      "Seul",
      "Un investissement locatif",
      "Hébergé gratuitement",
      "Travailleur non salarié"
    );

    //2step

    secondStep("Revenus nets mensuels", "Primes annuelles", "Primes annuelles");

    //3step

    thirdStep("Montant par mois", "Montant par mois");
    //4step

    fourthStep("Valeur nette", "Apport maximum");

    //results
    cy.url().should("include", "/mortgage-calculator/result", {
      timeout: 10000,
    });
    cy.get('[class="styles__OverviewCardsContainer-sc-c90lrf-1 hAGWrL"]')
      .eq(0)
      .should("have.length", 1);
    cy.get('[class="styles__OverviewCardContainer-sc-o8j682-0 iYckIg"]')
      .eq(0)
      .children()
      .should("have.length", 4);
    cy.get('[class="styles__OverviewRowContainer-sc-xdxkzf-0 bHJvsf"]')
      .eq(0)
      .contains("Votre capacité d’emprunt sur 20 ans");
    cy.get('[class="styles__OverviewRowContainer-sc-xdxkzf-0 bHJvsf"]')
      .eq(1)
      .contains("Votre remboursement d’emprunt");
    cy.get('[class="styles__OverviewRowContainer-sc-xdxkzf-0 bHJvsf"]')
      .eq(2)
      .contains("Votre locataire vous remboursera");
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

function firstStep(type1, property, situation, situation2) {
  cy.findByText(type1).click();
  cy.findByText(property).click();
  cy.findByText(situation).click();
  cy.findByPlaceholderText("Age").clear().type("22");
  cy.findByText("Non").click();
  cy.findByPlaceholderText("Ex: 28 rue Beautreillis 75004 Paris")
    .clear()
    .type("210");
  cy.get('[role="option"]', { timeout: 1000 }).eq(0).click();
  cy.findByText(situation2).click();
  cy.findByText("Depuis plus de 3 ans").click();
  cy.findByText("Suivant").should("not.be.disabled").click();
}

function secondStep(monthlyNetIncome, bonus1, bonus2) {
  cy.findByPlaceholderText(monthlyNetIncome).clear().type("5000");
  cy.findByText("Nb mois").click();
  cy.get('[tabindex="-1"]').eq(0).click();
  cy.findAllByText("Oui").eq(0).click();
  cy.get(bonus1).eq(0).clear().type("2000");
  cy.get(bonus2).eq(1).clear().type("1000");
  cy.findAllByText("Non").eq(1).click();
  cy.findByText("Suivant").should("not.be.disabled").click();
}

function thirdStep(repayment1, repayment2) {
  cy.findAllByText("Oui").eq(0).click();
  cy.findAllByText().click();
  cy.findAllByText("Crédit consommation").click();
  cy.findAllByPlaceholderText(repayment1).eq(0).clear().type("150");
  cy.wait(100);
  cy.findAllByPlaceholderText(repayment2).eq(1).clear().type("100");
  cy.findAllByText("Non").eq(1).click();
  cy.findByText("Suivant").should("not.be.disabled").click();
}

function fourthStep(netValue, maximumDownpayment) {
  cy.findByText("Montant moyen").click();
  cy.get('[tabindex="-1"]').eq(1).click();
  cy.findByPlaceholderText(netValue).type("9000");
  cy.findByPlaceholderText(maximumDownpayment).type("20000");
  cy.findByText("Suivant").should("not.be.disabled").click();
}
