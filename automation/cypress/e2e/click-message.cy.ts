import {chatInput, questionSuggestion} from '../fixtures/chat/locators';

// Should not work yet. After changing the chat logic should delete the "skip"
describe.skip('Click on message', () => {
  it('Clicks on a message button', () => {
    cy.getByDataTestId(questionSuggestion)
      .click()
      .getByDataTestId(chatInput)
      .invoke('val')
      .should('have.length.greaterThan', 0);
  });
});