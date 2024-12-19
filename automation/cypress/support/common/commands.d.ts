declare namespace Cypress {
  interface Chainable {
    getByDataTestId(dataTestId: string, options?: Partial<object>): Chainable;
  }
}