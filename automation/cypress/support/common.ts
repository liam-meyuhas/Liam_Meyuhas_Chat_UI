Cypress.Commands.add('getByDataTestId', (dataTestId, options?) => {
  cy.get(`[data-cy="${dataTestId}"]`, options).click();
});

export const userActions = {
  button: () => cy.click(),
  input: (text: string) => cy.type(text)
};