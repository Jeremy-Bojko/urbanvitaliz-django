import projects from '../../../fixtures/projects/projects.json';
const currentProject = projects[1];

describe('I can access documents tab in a project as a member', () => {
  beforeEach(() => {
    cy.login('collectivité1');
  });

  it('goes to the documents page of my project', () => {
    cy.visit(`/project/${currentProject.pk}`);
    cy.contains('Fichiers et liens').click({ force: true });
    cy.url().should('include', '/documents');
  });
});

describe('I can access documents tab in a project as an advisor', () => {
  beforeEach(() => {
    cy.login('conseiller1');
  });

  it('goes to the documents page of my project', () => {
    cy.visit(`/project/${currentProject.pk}`);
    cy.contains('Fichiers et liens').click({ force: true });
    cy.url().should('include', '/documents');
  });
});
