describe('Links abrindo nova guia/janela', () => {
    it('Validando o atributo do Instagram', () => {
        cy.login()

        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')
    })

    it('Acessa link de termos de uso removendo o atributo target blank', () => {
        cy.login()
        cy.goTo("Formulários", "Consultoria")
        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.')
            .should('be.visible')

    })

})