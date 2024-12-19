Cypress.Commands.add('getByDataTestId', (dataTestId, options?) => {
  cy.get(`[data-testid="${dataTestId}"]`, options);
});

export const userActions = {
  button: () => cy.click(),
  input: (text: string) => cy.type(text)
};