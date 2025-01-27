Cypress.Commands.add('login', user =>{
    cy.get('[data-test="username"]').type(user.username);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('logout', ()=>{
    cy.get('.header_label').click();
    cy.get('[data-test="logout-sidebar-link"]').click();
});