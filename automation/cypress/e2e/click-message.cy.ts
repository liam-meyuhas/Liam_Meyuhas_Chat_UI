import {chatInput, questionSuggestion} from '../fixtures/chat/locators';

// Should not work yet
describe('Click on message', () => {
  it('Clicks on a message button', () => {
    cy.getByDataTestId(questionSuggestion)
      .click()
      .getByDataTestId(chatInput)
      .invoke('val')
      .should('have.length.greaterThan', 0);
  });
});