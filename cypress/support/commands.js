Cypress.Commands.add('login', user =>{
    cy.get('[data-test="username"]').type(user.username);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('preencherCheckout',()=>{
    cy.get('[data-test="firstName"]').type('Clarice');
    cy.get('[data-test="lastName"]').type('Oliveira');
    cy.get('[data-test="postalCode"]').type('00000000');
});