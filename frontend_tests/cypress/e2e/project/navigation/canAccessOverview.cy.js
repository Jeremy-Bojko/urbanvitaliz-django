import projects from '../../../fixtures/projects/projects.json';
const currentProject = projects[1];

describe('I can access overview tab in a project as a member', () => {
  beforeEach(() => {
    cy.login('collectivité1');
  });

  it('goes to knowledge page and then overview page of my project', () => {
    cy.visit(`/project/${currentProject.pk}`);
    cy.get("[data-test-id='project-navigation-knowledge']").click({
      force: true,
    });
    cy.url().should('include', '/connaissance');
    cy.contains('Présentation').click({ force: true });
    cy.url().should('include', '/presentation');
  });
});

describe('I can access overview tab in a project as an advisor', () => {
  beforeEach(() => {
    cy.login('conseiller1');
  });

  it('goes to knowledge page and then overview page of my project', () => {
    cy.visit(`/project/${currentProject.pk}`);
    cy.get("[data-test-id='project-navigation-knowledge']").click({
      force: true,
    });
    cy.url().should('include', '/connaissance');
    cy.contains('Présentation').click({ force: true });
    cy.url().should('include', '/presentation');
  });
});
