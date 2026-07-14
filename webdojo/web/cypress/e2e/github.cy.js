describe("Gerenciamento de Perfis no Github", () => {
    beforeEach(() => {
        cy.login()
        cy.goTo("Tabela", "Perfis do GitHub")
    })

    it("Deve poder cadastrar um novo perfil do github", () => {
        cy.log("todo")

        cy.get('#name').type("Felipe Lundgren")
        cy.get('#username').type("FelipeLundgren")
        cy.get('#profile').type("QA")
        cy.contains("button", "Adicionar Perfil").click()
    })
})
