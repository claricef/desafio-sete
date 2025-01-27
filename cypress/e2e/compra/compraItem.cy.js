import user from '../../fixtures/users/user.json'

describe('Funcionalidade de compra', ()=>{
    beforeEach(()=>{
       cy.visit('/');
       cy.login(user);
    });

    it('Deve realizar a compra de um item ',()=>{
        //adiciona item ao carrinho e captura o nome do item
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]')
        .invoke('text')
        .then((text)=>{
           const nomeItem = text;
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            //verifica existencia de icone de item no carrinho
            cy.get('[data-test="shopping-cart-badge"]').should('exist').and('be.visible');
            cy.get('[data-test="shopping-cart-link"]').click();
            //valida se o item no carrinho tem o mesmo nome do item adicionado
            cy.get('[data-test="inventory-item-name"]').should('exist').and('have.text', nomeItem);
        });

        cy.get('[data-test="checkout"]').click();
        cy.preencherCheckout();
        cy.get('[data-test="continue"]').click();

        //verifica se a quantidade de itens é igual a um
        cy.get('[data-test="item-quantity"]')
        .invoke('text')
        .then((text)=>{
            const quantidade = parseInt(text);
            expect(quantidade).to.be.eq(1);
        });
        cy.get('[data-test="inventory-item-price"]').should('exist').and('be.visible');
        cy.get('[data-test="finish"]').click();
        //verifica informações da página de confirmação da compra
        cy.get('[data-test="title"]').should('have.text', 'Checkout: Complete!')
        cy.get('[data-test="pony-express"]').should('exist').and('be.visible');
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
        cy.get('[data-test="shopping-cart-badge"]').should('not.be.exist');  
    });

    it('Deve remover item do carrinho',()=>{
        //adiciona item e acessa o carrinho
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();

        //volta para listagem de itens
        cy.get('[data-test="continue-shopping"]').click();

        //verifica botão de remover 
        cy.get('[data-test="remove-sauce-labs-backpack"]')
        .should('have.text', 'Remove');

        //remove item do carrinho
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();

        //verifica se não está mais exibindo o icone de item no carrinho
        cy.get('[data-test="shopping-cart-badge"]').should('not.be.exist');

        //acessa carrinho e verifica se está vazio
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="inventory-item"]').should('not.be.exist');
    });

    it('Deve exibir mensagem de erro ao continuar a compra sem preencher informações de checkout',()=>{
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container')
        .should('be.visible')
        .and('have.text', 'Error: First Name is required');
    });
});