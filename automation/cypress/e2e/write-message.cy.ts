import {chatInput} from '../fixtures/chat/locators';

describe('write message', () => {
  before(() => {
    cy.login();
  })
  it('visit', () => {
    cy.getByDataTestId(chatInput)
      .type('bbbbbbbbb{enter}')
  })
})