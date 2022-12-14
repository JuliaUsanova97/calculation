export function archivateCampaign() {
  cy.get('[class="sc-12hrgpe-0 sc-cgzfnp-5 bkBocI bdTtHM"]').click();
  cy.wait(1000);
  cy.get('[class="sc-19i9sxu-1 gdvgEv"]').eq(0).should("be.visible"); // role button
  cy.get('[class="sc-933bxs-1 cGsKjp"]').eq(2).should("be.visible").click(); // aria label
  cy.get('[class="modal-content sc-icb63j-1 ccRvgk is-opened"]').should(
    "be.visible" //role dialog
  );
  cy.get('[class="sc-pbn3r-1 kxXfoF"]').contains("Bestätigen"); // contains
  cy.get('[class="sc-pbn3r-0 dRRtnH sc-2rxh1o-2 dqTPSW"]')
    .should("be.visible")
    .click();
  cy.wait(1000);
}
