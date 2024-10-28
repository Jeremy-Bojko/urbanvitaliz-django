describe('I can go to tasks tab', () => {
  beforeEach(() => {
    cy.login('conseiller1');
    cy.createProject('draft project');
  });

  it('publishes a task', () => {
    cy.visit(`/projects`);
    cy.contains('draft project').first().click({ force: true });
    cy.becomeAdvisor();

    cy.contains('Recommandations').click({ force: true });
    cy.url().should('include', '/actions');

    cy.createTask('draft project');

    cy.get('[data-test-id="list-tasks-switch-button"]').should(
      'have.class',
      'active'
    );
    cy.get('#unpublish-task-button').click({ force: true });
    cy.get('[data-test-id="task-draft-status"]').should('be.visible');
    cy.get('#publish-task-button').click({ force: true });
    cy.get('[data-test-id="task-draft-status"]').should('not.exist');
  });
});
