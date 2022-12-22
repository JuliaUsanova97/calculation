export function archivateCampaign() {
  cy.get('[title="Abbrechen"]').click();
  cy.wait(1000);
  cy.get('[class="sc-19i9sxu-0 loGHYh"]')
    .eq(0)
    .find('[aria-label="Kampagne archivieren"]')
    .should("be.visible")
    .click();
  cy.get('[role="dialog"]').should("be.visible");
  cy.contains("button", "Bestätigen").should("be.visible").click();
  cy.wait(1000);
}
