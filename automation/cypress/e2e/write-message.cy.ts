import {answer, chatInput, question} from '../fixtures/chat/locators';
import {message} from '../fixtures/chat/constants';

describe('Write message', () => {
  it('Writes a message', () => {
    cy.getByDataTestId(chatInput)
      .type(`${message}{enter}`)
      .getByDataTestId(question)
      .should('have.text', message)
      .getByDataTestId(answer)
      .should('be.visible');
  });
});