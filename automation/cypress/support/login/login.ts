import {app, splashScreen} from '../../fixtures/login/locators';

Cypress.Commands.add('login', () => {
  cy.visit('/')
    .getByDataTestId(app)
    .should('be.visible')
    .getByDataTestId(splashScreen, {timeout: 10000})
    .should('not.exist');
});