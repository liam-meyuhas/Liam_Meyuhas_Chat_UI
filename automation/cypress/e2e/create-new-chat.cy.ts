// todo: Change the before to use api request
import {answer, chatInput, question, questionSuggestion} from '../fixtures/chat/locators';
import {message} from '../fixtures/chat/constants';
import {newChat, sidebarToggle} from '../fixtures/sidebar/locators';
import {confirmReset, modalContent} from '../fixtures/dialog/locators';

describe('Create new chat', () => {
  beforeEach(() => {
    cy.getByDataTestId(chatInput)
      .type(`${message}{enter}`)
      .getByDataTestId(question)
      .should('have.text', message)
      .getByDataTestId(answer)
      .should('be.visible');
  });
  it('Creates a new chat', () => {
    cy.getByDataTestId(sidebarToggle)
      .click()
      .getByDataTestId(newChat)
      .click()
      .getByDataTestId(modalContent)
      .should('be.visible')
      .getByDataTestId(confirmReset)
      .click();
  });

  after(() => {
    cy.getByDataTestId(questionSuggestion)
      .should('be.visible');
  });
});