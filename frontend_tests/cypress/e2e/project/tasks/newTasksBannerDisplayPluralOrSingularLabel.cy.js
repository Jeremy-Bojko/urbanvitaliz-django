import projects from '../../../fixtures/projects/projects.json';

const currentProject = projects[10];

describe('I can go to tasks tab', () => {
  it('creates a single task', () => {
    cy.login('jean');
    cy.visit(`/project/${currentProject.pk}/actions`);
    cy.becomeAdvisorOnProject(currentProject.pk);
    cy.createTask(1);
  });

  it('display a singular label for new tasks banner', () => {
    cy.login('bob');
    cy.visit(`/project/${currentProject.pk}/actions`);
    cy.contains('Vous avez 1 recommandation non lue');
  });

  it('display an icon on new tasks banner', () => {
    cy.login('bob');
    cy.visit(`/project/${currentProject.pk}/actions`);
    cy.get('[data-test-id="banner-new-tasks"]')
      .find('[data-test-id="img-presentation"]')
      .testImage('img-presentation', 'svg');
  });

  it('display a plural label for new tasks banner', () => {
    cy.login('jean');
    cy.visit(`/project/${currentProject.pk}/actions`);
    cy.createTask(2);
    cy.logout();
    cy.login('bob');
    cy.visit(`/project/${currentProject.pk}/actions`);
    cy.contains('Vous avez 2 recommandations non lues');
  });
});
