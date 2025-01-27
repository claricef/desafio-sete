import user from '../../fixtures/users/user.json'

describe('Funcionalidade de login', ()=>{
    before(()=>{
       cy.visit('/');
    });

    it('Deve realizar o login com dados válidos ',()=>{
        cy.login(user);
        cy.url().should('include', '/inventory.html');
        cy.get('.app_logo').should('exist').and('be.visible');
        cy.get('[data-test="title"]').should('exist').and('be.visible');
        cy.get('[data-test="product-sort-container"]').should('exist').and('be.visible');
        cy.get('[data-test="shopping-cart-link"]').should('exist').and('be.visible');
    });
});