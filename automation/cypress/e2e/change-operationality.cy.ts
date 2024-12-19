import {changeOperationality, userIcon} from '../fixtures/user/locators';
import {answer, chatInput, displayText, displayTextOperational, question} from '../fixtures/chat/locators';
import {message} from '../fixtures/chat/constants';

// todo: Change the before to use api request
describe('Change operationality', () => {
  beforeEach(() => {
    cy.getByDataTestId(chatInput)
      .type(`${message}{enter}`)
      .getByDataTestId(question)
      .should('have.text', message)
      .getByDataTestId(answer)
      .should('be.visible');
  });

  it('Changes operationality', () => {
    cy.getByDataTestId(userIcon)
      .click()
      .getByDataTestId(changeOperationality)
      .click()
      .getByDataTestId(displayText)
      .should('have.class', displayTextOperational);
  });
});