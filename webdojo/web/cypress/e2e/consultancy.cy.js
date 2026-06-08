describe("Formulario de Consultoria",() => {
    it("Deve solicitar consultoria individual",() =>{
        cy.start()
        cy.submitLogin("papito@webdojo.com", "katana123")

        cy.goTo("Formulários", "Consultoria")

        cy.get('#name').type("Felipe Lundgren")

        cy.get('input[placeholder="Digite seu email"]').type('felipe@webdojo.com')

        cy.get('input[placeholder="(00) 00000-0000"]').type('11 98765-4321')
            .should("have.value", "(11) 98765-4321")

        cy.get('#consultancyType').select("In Company")

        cy.contains("label", "Pessoa Física")
            .find('input')
            .click()
            .should("be.checked")

        cy.contains("label", "Pessoa Jurídica")
            .find('input')
            .should("be.not.checked")

        cy.contains("label", "CPF")
            .parent()
            .find('input')
            .type('12345678900')
            .should("have.value", "123.456.789-00")

        
        
        const discoveryChannels = 
        ["Instagram", "LinkedIn", "Udemy", "YouTube", "Indicação de Amigo"]
        
        discoveryChannels.forEach(channel => {
            cy.contains("label", channel)
                .find('input')
                .check()
                .should("be.checked")
        })

        cy.get('input[type="file"]').selectFile("./cypress/fixtures/Document.pdf", { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type("Gostaria de uma consultoria para minha empresa, focada em automação de testes.")

        const techs = ["Cypress", "Selenium", "Playwright"]
        
        techs.forEach(tech => {
            cy.get('#technologies')
            .type(tech + "{enter}")

        cy.contains('label','Tecnologias')
            .parent()
            .contains('span', tech)
            .should("be.visible")})

        cy.contains('label','termos de uso' )
            .find('input')
            .check()
            .should("be.checked")

        cy.contains('button', 'Enviar formulário').click()

        cy.contains("Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.")
            .should("be.visible")
            
    })

    it("Deve verificar os campos obrigatórios",() =>{
        cy.start()
        cy.submitLogin("papito@webdojo.com", "katana123")
        cy.goTo("Formulários", "Consultoria")
        cy.contains('button', 'Enviar formulário').click()

        cy.contains('label', 'Nome Completo *')
        .parent()
        .find('p')
        .should("be.visible")
        .should('contain.text', 'Campo obrigatório')
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)")
        
        
        cy.contains('label', 'Email *')
        .parent()
        .find('p')
        .should("be.visible")
        .should('contain.text', 'Campo obrigatório')
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)")
         
        cy.contains('label', 'termos de uso *')
        .parent()
        .find('p')
        .should("be.visible")
        .should('contain.text', 'Você precisa aceitar os termos de uso')
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)")

    })
})
