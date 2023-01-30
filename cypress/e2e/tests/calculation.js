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
    cy.contains("Simulez votre capacité de financement en 5 min");
    cy.contains("button", "Accepter et fermer").click();
    cy.wait(5000);

    cy.get("body").then(($body) => {
      if ($body.find('[id="LOU_PLAYER_MAINFRAME"]').length > 0) {
        getIframeBody().find('[class="sc-gPpHY ilrxnI"]').click();
      }
    });

    cy.wait(1000);
    cy.contains("button", "Réinitialiser").click();
    cy.wait(1000);
  });

  it("Calculation for first case", () => {
    firstStep(
      "Seul",
      "Un investissement locatif",
      "Hébergé gratuitement",
      "Travailleur non salarié",
      "Depuis plus de 3 ans"
    );
    secondStep("5000", "2000", "1000");
    thirdStep("150", "100");
    fourthStep("9000", "20000");
    results1();
  });

  it("Calculation for second case", () => {
    cy.findByText("Seul").click();
    cy.findByText("Votre résidence principale").click();
    cy.findByText("Locataire de votre logement").click();
    cy.findByPlaceholderText("Age").clear().type("22");
    cy.findByText("Non").click();
    cy.findByPlaceholderText("Ex: 28 rue Beautreillis 75004 Paris")
      .clear()
      .type("210");
    cy.get('[role="option"]', { timeout: 1000 }).eq(0).click();
    cy.findByPlaceholderText("Loyer mensuel").type("200");
    cy.findByText("Travailleur non salarié").click();
    cy.findByText("Depuis plus de 3 ans").click({ force: true });
    cy.findByText("Suivant").should("not.be.disabled").click();
    secondStep("10000", "150", "200");
    thirdStep("200", "100");
    fourthStep("9000", "70000");
    results2();
  });

  it("Calculation for third case", () => {
    cy.findByText("Seul").click();
    cy.findByText("Votre résidence principale").click();
    cy.findByText("Hébergé gratuitement").click();
    cy.findByPlaceholderText("Age").clear().type("22");
    cy.findByText("Non").click();
    cy.findByPlaceholderText("Ex: 28 rue Beautreillis 75004 Paris")
      .clear()
      .type("210");
    cy.get('[role="option"]', { timeout: 1000 }).eq(0).click();
    cy.findByText("Salarié du privé").click();
    cy.findByText("En CDI").click();
    cy.findByText("Hors période d'essai").click({ force: true });
    cy.findByText("Suivant").should("not.be.disabled").click();
    secondStep("2000", "1000", "20000");
    thirdStep("500", "100");
    fourthStep("22222", "3000");
    results3();
  });

  it.only("Calculation for fourth case", () => {
    firstStep(
      "Seul",
      "Votre résidence principale",
      "Hébergé gratuitement",
      "Travailleur non salarié",
      "Depuis plus de 3 ans"
    );
    secondStep("2000", "2000", "10000");
    thirdStep("1000", "1500");
    fourthStep("22222", "3000");
    results4();
  });
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

function firstStep(type1, property, situation, situation2, precisely) {
  cy.findByText(type1).click();
  cy.findByText(property).click();
  cy.findByText(situation).click();
  cy.findByPlaceholderText("Age").clear().type("22");
  cy.findByText("Non").click();
  cy.findByPlaceholderText("Ex: 28 rue Beautreillis 75004 Paris")
    .clear()
    .type("200");
  cy.get('[role="option"]', { timeout: 1000 }).eq(0).click();
  cy.findByText(situation2).click();
  cy.findByText(precisely).click({ force: true });
  cy.findByText("Suivant").should("not.be.disabled").click();
}

function secondStep(monthlyNetIncome, bonus1, bonus2) {
  cy.findByPlaceholderText("Revenus nets mensuels")
    .clear()
    .type(monthlyNetIncome);
  cy.findByText("Nb mois").click();
  cy.get('[tabindex="-1"]').eq(0).click();
  cy.findAllByText("Oui").eq(0).click();
  cy.findAllByPlaceholderText("Primes annuelles").eq(0).clear().type(bonus1);
  cy.findAllByPlaceholderText("Primes annuelles").eq(1).clear().type(bonus2);
  cy.findAllByText("Non").eq(1).click();
  cy.findByText("Suivant").should("not.be.disabled").click();
}

function thirdStep(repayment1, repayment2) {
  cy.findAllByText("Oui").eq(0).click();
  cy.findAllByText("Crédit immobilier").click();
  cy.findAllByText("Crédit consommation").click();
  cy.findAllByPlaceholderText("Montant par mois")
    .eq(0)
    .clear()
    .type(repayment1);
  cy.wait(100);
  cy.findAllByPlaceholderText("Montant par mois")
    .eq(1)
    .clear()
    .type(repayment2);
  cy.findAllByText("Non").eq(1).click();
  cy.findByText("Suivant").should("not.be.disabled").click();
}

function fourthStep(netValue, maximumDownpayment) {
  cy.findByText("Montant moyen").click();
  cy.get('[tabindex="-1"]').eq(1).click();
  cy.findByPlaceholderText("Valeur nette").type(netValue);
  cy.findByPlaceholderText("Apport maximum").type(maximumDownpayment);
  cy.findByText("Suivant").should("not.be.disabled").click();
}

function results1() {
  cy.url().should("include", "/mortgage-calculator/result", {
    timeout: 10000,
  });
  cy.get('[class="styles__OverviewCardsContainer-sc-c90lrf-1 hAGWrL"]')
    .eq(0)
    .children()
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
}

function results2() {
  cy.url().should("include", "/mortgage-calculator/result", {
    timeout: 10000,
  });
  cy.get('[class="styles__OverviewCardsContainer-sc-c90lrf-1 hAGWrL"]')
    .eq(0)
    .children()
    .should("have.length", 2);
  cy.get('[class="styles__OverviewCardContainer-sc-o8j682-0 iYckIg"]')
    .eq(0)
    .children()
    .should("have.length", 4);
  cy.get('[class="styles__OverviewCardContainer-sc-o8j682-0 iYckIg"]')
    .eq(1)
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

  cy.get('[class="styles__OverviewRowContainer-sc-xdxkzf-0 bHJvsf"]')
    .eq(3)
    .contains("Votre capacité d’emprunt sur 25 ans");
  cy.get('[class="styles__OverviewRowContainer-sc-xdxkzf-0 bHJvsf"]')
    .eq(4)
    .contains("Votre remboursement d’emprunt");
  cy.get('[class="styles__OverviewRowContainer-sc-xdxkzf-0 bHJvsf"]')
    .eq(5)
    .contains("Votre locataire vous remboursera");
}

function results3() {
  cy.url().should("include", "/mortgage-calculator/result", {
    timeout: 10000,
  });
  cy.get('[class="styles__OverviewCardsContainer-sc-c90lrf-1 hAGWrL"]')
    .eq(0)
    .children()
    .should("have.length", 1);
  cy.get('[class="styles__OverviewCardContainer-sc-o8j682-0 iYckIg"]')
    .eq(0)
    .children()
    .should("have.length", 3);
  cy.get('[class="styles__OverviewRowContainer-sc-xdxkzf-0 bHJvsf"]')
    .eq(0)
    .contains("Votre capacité d’emprunt sur 25 ans");
  cy.get('[class="styles__OverviewRowContainer-sc-xdxkzf-0 bHJvsf"]')
    .eq(1)
    .contains("Votre remboursement d’emprunt");
}

function results4() {
  cy.url().should("include", "/mortgage-calculator/result", {
    timeout: 10000,
  });
  cy.get('[class="styles__RejectCardContainer-sc-a1qy4r-1 ARDvD"]')
    .eq(0)
    .children()
    .should("have.length", 1);
  cy.get('[class="styles__ListOfReasons-sc-a1qy4r-3 kCXPRE"]').contains(
    "Apport insuffisant"
  );
}
