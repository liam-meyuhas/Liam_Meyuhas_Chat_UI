Cypress.Commands.add('getByDataTestId', (dataTestId, options?) => {
  cy.get(`[data-testid="${dataTestId}"]`, options);
});