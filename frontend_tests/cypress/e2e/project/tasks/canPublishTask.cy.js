describe('I can go to tasks tab and publish task', () => {
  it('publishes a task', () => {
    cy.login('jean');
    cy.createProject('project to publish task').then((projectUrl) => {
      const projectId = projectUrl.slice(projectUrl.indexOf('summary/') + 8);
      cy.visit(`/project/${projectId}/actions`);
      cy.becomeAdvisor();
      cy.visit(`/project/${projectId}/actions`);
      cy.get('[data-test-id="submit-task-button"]').click();
      cy.get('#id_project-button').should(
        'contains.text',
        'project to publish task'
      );
      cy.get('#push-noresource').click();
      cy.get('#intent').type('reco test ', { force: true });
      cy.get('textarea')
        .type(`reco test from action description`, { force: true })
        .should('have.value', `reco test from action description`);
      cy.get('[type=submit]').click({ force: true });
      cy.url().should('include', '/actions');
    });
  });
});
