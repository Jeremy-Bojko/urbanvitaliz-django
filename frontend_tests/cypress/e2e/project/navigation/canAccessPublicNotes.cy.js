import projects from '../../../fixtures/projects/projects.json';
const currentProject = projects[1];

describe('I can access public notes tab in a project as a member', () => {
  beforeEach(() => {
    cy.login('collectivité1');
  });

  it('goes to the public note page of my project', () => {
    cy.visit(`/project/${currentProject.pk}`);
    cy.contains('Conversation').click({ force: true });
    cy.url().should('include', '/conversations');
  });
});

describe('I can access public notes tab in a project as an advisor', () => {
  beforeEach(() => {
    cy.login('conseiller1');
  });

  it('goes to the public note page of my project', () => {
    cy.visit(`/project/${currentProject.pk}`);
    cy.contains('Conversation').click({ force: true });
    cy.url().should('include', '/conversations');
  });
});
