describe("Gerenciamento de Perfis no Github", () => {
    beforeEach(() => {
        cy.login()
        cy.goTo("Tabela", "Perfis do GitHub")
    })

    it("Deve poder cadastrar um novo perfil do github", () => {
        cy.get('#name').type("Felipe Lundgren")
        cy.get('#username').type("FelipeLundgren123")
        cy.get('#profile').type("QA")
        cy.contains("button", "Adicionar Perfil").click()

        cy.get('#name').type("Felipe Lundgren")
        cy.get('#username').type("FelipeLundgren")
        cy.get('#profile').type("QA")
        cy.contains("button", "Adicionar Perfil").click()

        cy.contains("table tbody tr", "FelipeLundgren")
            .should("be.visible")
            .as("trProfile")

        cy.get("@trProfile")
            .contains("td", "Felipe Lundgren")
            .should("be.visible")

        cy.get("@trProfile")
            .contains("td", "QA")
            .should("be.visible")
    })
    it("Deve poder remover um perfil do github", () => {

        const profile = {
            name: "Felipe Lundgren",
            username: "FelipeLundgren123",
            profile: "QA"
        }
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)
        cy.contains("button", "Adicionar Perfil").click()
        cy.contains("table tbody tr", profile.username)
            .should("be.visible")
            .as("trProfile")
        cy.get("@trProfile").find("button[title='Remover perfil']").click()

        cy.contains("table tbody", profile.username).should("not.exist")
    })

    it("Deve validar o link do github", () => {

        const profile = {
            name: "Felipe Lundgren",
            username: "FelipeLundgren",
            profile: "QA"
        }
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)

        cy.contains("button", "Adicionar Perfil").click()

        cy.contains("table tbody tr", profile.username)
            .should("be.visible")
            .as("trProfile")

        cy.get("@trProfile").find("a").should("have.attr", "href", `https://github.com/${profile.username}`)
        .and("have.attr", "target", "_blank")
    })
})
