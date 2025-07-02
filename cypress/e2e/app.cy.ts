describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('adds and completes a task', () => {
    cy.get('#task-input-jq').type('Tarea E2E');
    cy.get('#add-task-jq').click();

    // Task should appear in React list
    cy.contains('li', 'Tarea E2E')
      .find('input[type="checkbox"]')
      .check();

    cy.get('#task-count').should('contain', '1/1');
  });

  it('shows error for duplicate tasks', () => {
    cy.get('#task-input-jq').type('Duplicada');
    cy.get('#add-task-jq').click();
    
    cy.get('#task-input-jq').clear().type('duplicada');
    cy.get('#add-task-jq').click();
    
    cy.contains('ya existe').should('be.visible');
    cy.get('#task-count').should('contain', '1/0');
  });

  it('deletes a task', () => {
    // Add via React form using the correct placeholder
    cy.get('input[placeholder*="3 series de press banca"]').type('To Delete');
    cy.get('button').contains('Añadir Ejercicio').click();
    
    // Delete the task - updated selector to match improved accessibility
    cy.get('button[aria-label*="Eliminar tarea: To Delete"]').click();
    
    cy.get('#task-count').should('contain', '0/0');
    cy.contains('¡No hay ejercicios! Añade tu primera rutina').should('be.visible');
  });
}); 