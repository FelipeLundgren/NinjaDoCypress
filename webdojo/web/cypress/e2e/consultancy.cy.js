describe("Formulario de Consultoria", () => {

    beforeEach(() => {
        cy.login()
        cy.goTo("Formulários", "Consultoria")

        cy.fixture("consultancy").as("consultacyData")
    })
    it("Deve solicitar consultoria individual", function () {

        const consultancyForm = this.consultacyData.personal

        cy.get('#name').type(consultancyForm.name)

        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)

        cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone)
        //.should("have.value", "(11) 98765-4321")

        cy.get('#consultancyType').select(consultancyForm.consultancyType)

        if (consultancyForm.personType === "cpf") {
            cy.contains("label", "Pessoa Física")
                .find('input')
                .click()
                .should("be.checked")

            cy.contains("label", "Pessoa Jurídica")
                .find('input')
                .should("be.not.checked")
        }

        if (consultancyForm.personType === "cnpj") {
            cy.contains("label", "Pessoa Jurídica")
                .find('input')
                .click()
                .should("be.checked")

            cy.contains("label", "Pessoa Física")
                .find('input')
                .should("be.not.checked")
        }



        cy.contains("label", "CPF")
            .parent()
            .find('input')
            .type(consultancyForm.document)
        //.should("have.value", "123.456.789-00")




        consultancyForm.discoveryChannels.forEach(channel => {
            cy.contains("label", channel)
                .find('input')
                .check()
                .should("be.checked")
        })

        cy.get('input[type="file"]').selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)



        consultancyForm.tech.forEach(tech => {
            cy.get('#technologies')
                .type(tech + "{enter}")

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should("be.visible")
        })

        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
                .should("be.checked")
        }

        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', { timeout: 70000 })
            .should("be.visible")
            .find('.modal-content p')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    })

    it("Deve solicitar consultoria In Company", function () {

        const consultancyForm = this.consultacyData.company

        cy.get('#name').type(consultancyForm.name)

        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)

        cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone)
        //.should("have.value", "(11) 98765-4321")

        cy.get('#consultancyType').select(consultancyForm.consultancyType)

        if (consultancyForm.personType === "cpf") {
            cy.contains("label", "Pessoa Física")
                .find('input')
                .click()
                .should("be.checked")

            cy.contains("label", "Pessoa Jurídica")
                .find('input')
                .should("be.not.checked")
        }

        if (consultancyForm.personType === "cnpj") {
            cy.contains("label", "Pessoa Jurídica")
                .find('input')
                .click()
                .should("be.checked")

            cy.contains("label", "Pessoa Física")
                .find('input')
                .should("be.not.checked")
        }



        cy.contains("label", "CNPJ")
            .parent()
            .find('input')
            .type(consultancyForm.document)
        //.should("have.value", "123.456.789-00")




        consultancyForm.discoveryChannels.forEach(channel => {
            cy.contains("label", channel)
                .find('input')
                .check()
                .should("be.checked")
        })

        cy.get('input[type="file"]').selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)



        consultancyForm.tech.forEach(tech => {
            cy.get('#technologies')
                .type(tech + "{enter}")

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should("be.visible")
        })

        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
                .should("be.checked")
        }

        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', { timeout: 70000 })
            .should("be.visible")
            .find('.modal-content p')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    })

    it("Deve verificar os campos obrigatórios", () => {

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
