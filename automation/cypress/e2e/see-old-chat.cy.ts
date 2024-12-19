import {answer, chatInput, displayText, question, questionSuggestion} from '../fixtures/chat/locators';
import {message} from '../fixtures/chat/constants';
import {newChat, oldChat, sidebarToggle} from '../fixtures/sidebar/locators';
import {confirmReset, modalContent} from '../fixtures/dialog/locators';

// todo: Change the before to use api request
describe('See old chat', () => {
  beforeEach(() => {
    cy.getByDataTestId(chatInput)
      .type(`${message}{enter}`)
      .getByDataTestId(question)
      .should('have.text', message)
      .getByDataTestId(answer)
      .should('be.visible');
    cy.getByDataTestId(sidebarToggle)
      .click()
      .getByDataTestId(newChat)
      .click()
      .getByDataTestId(modalContent)
      .should('be.visible')
      .getByDataTestId(confirmReset)
      .click();
    cy.getByDataTestId(questionSuggestion)
      .should('be.visible');
    cy.getByDataTestId(sidebarToggle)
      .click();
  });

  it('Sees an old chat', () => {
    cy.getByDataTestId(sidebarToggle)
      .click()
      .getByDataTestId(oldChat)
      .click()
      .getByDataTestId(displayText)
      .should('be.visible');
  });
});