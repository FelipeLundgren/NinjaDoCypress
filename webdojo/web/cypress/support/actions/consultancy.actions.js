Cypress.Commands.add("fillConsultancyForm", (form) => {
    cy.get('#name').type(form.name)

    cy.get('input[placeholder="Digite seu email"]').type(form.email)

    cy.get('input[placeholder="(00) 00000-0000"]').type(form.phone)
    //.should("have.value", "(11) 98765-4321")

    cy.get('#consultancyType').select(form.consultancyType)

    if (form.personType === "cpf") {
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
            .type(form.document)
        //.should("have.value", "123.456.789-00")
    }

    if (form.personType === "cnpj") {
        cy.contains("label", "Pessoa Jurídica")
            .find('input')
            .click()
            .should("be.checked")

        cy.contains("label", "Pessoa Física")
            .find('input')
            .should("be.not.checked")

        cy.contains("label", "CNPJ")
            .parent()
            .find('input')
            .type(form.document)
    }






    form.discoveryChannels.forEach(channel => {
        cy.contains("label", channel)
            .find('input')
            .check()
            .should("be.checked")
    })

    cy.get('input[type="file"]').selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)



    form.tech.forEach(tech => {
        cy.get('#technologies')
            .type(tech + "{enter}")

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should("be.visible")
    })

    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should("be.checked")
    }
})
Cypress.Commands.add("submitConsultancyForm", () => {
    cy.contains('button', 'Enviar formulário').click()
})
Cypress.Commands.add("validateConsultancyModal", () => {
    cy.get('.modal', { timeout: 70000 })
        .should("be.visible")
        .find('.modal-content p')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})