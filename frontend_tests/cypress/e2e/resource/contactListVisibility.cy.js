import resources from '../../fixtures/resources/resources.json';
import contacts from '../../fixtures/addressbook/contacts.json';

const currentResource = resources[1];

describe('I can see the resource contact list if im logged', () => {
  beforeEach(() => {
    cy.login('collectivité1');
  });

  it('see the contact list', () => {
    cy.visit(`/ressource/${currentResource.pk}/`);

    cy.contains(contacts[1].fields.first_name);
    cy.contains(contacts[2].fields.first_name);
    cy.contains(contacts[3].fields.first_name);
  });
});
