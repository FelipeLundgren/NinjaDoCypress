describe("login",() => {
  it("Deve logar com sucesso",() =>{
    cy.start()
    cy.submitLogin("papito@webdojo.com","katana123")
    
    cy.get('[data-cy="user-name"]')
    .should("be.visible")
    .and("contain", "Fernando Papito")

    cy.get('[data-cy="welcome-message"]')
    .should("be.visible")
    .and("contain", "Olá QA, esse é o seu Dojo para aprender Automação de Testes.")
  })
  it("Não deve logar com senha invalida",() =>{
    cy.start()
    cy.submitLogin("papito@webdojo.com","katana321")

    cy.contains("Acesso negado! Tente novamente.")
      .should("be.visible")
  })
  it("Não deve logar com email invalido",() =>{
    cy.start()
    cy.submitLogin("papita@webdojo.com","katana123")

    cy.contains("Acesso negado! Tente novamente.")
      .should("be.visible")
  })
})