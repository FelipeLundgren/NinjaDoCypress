describe("login",() => {
  it("Deve logar com sucesso",() =>{
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000')
    cy.get('#email').type("papito@webdojo.com")
    cy.get('#password').type("katana123")
    cy.contains('button', 'Entrar').click()
    cy.wait(2000)


    cy.get('[data-cy="user-name"]')
    .should("be.visible")
    .and("contain", "Fernando Papito")

    cy.get('[data-cy="welcome-message"]')
    .should("be.visible")
    .and("contain", "Olá QA, esse é o seu Dojo para aprender Automação de Testes.")



  })
  it("Não deve logar com senha invalida",() =>{
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000')
    cy.get('#email').type("papito@webdojo.com")
    cy.get('#password').type("katana321")
    cy.contains('button', 'Entrar').click()
    cy.wait(2000)

    cy.contains("Acesso negado! Tente novamente.")
      .should("be.visible")

    
    

  })
  it("Não deve logar com email invalido",() =>{
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000')
    cy.get('#email').type("papita@webdojo.com")
    cy.get('#password').type("katana123")
    cy.contains('button', 'Entrar').click()
    cy.wait(2000)

    cy.contains("Acesso negado! Tente novamente.")
      .should("be.visible")

    
    

  })
})