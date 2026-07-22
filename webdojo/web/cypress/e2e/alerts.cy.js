describe("Validações de Alertas em JavaScript", () => {
    beforeEach(() => {
        cy.login()
        cy.goTo("Alertas JS", "JavaScript Alerts")
    })

    it("Deve validar a mensagem de alerta", () => {
        cy.on("window:alert", (msg) => {
            expect(msg).to.equal("Olá QA, eu sou uma Alert Box!")
        })
        cy.contains("button", "Mostrar Alert").click()
    })

    it("Deve confirmar um dialog e validar a resposta positiva", () => {
        cy.on("window:confirm", (msg) => {
            expect(msg).to.equal("Aperta um botão!")
            return true; // True simula o click no botão OK
        })

        cy.on("window:alert", (msg) => {
            expect(msg).to.equal("Você clicou em Ok!")
        })
        cy.contains("button", "Mostrar Confirm").click()
    })
    
    it("Deve cancelar um dialog e validar a resposta positiva", () => {
        cy.on("window:confirm", (msg) => {
            expect(msg).to.equal("Aperta um botão!")
            return false; // False simula o click no botão Cancel
        })

        cy.on("window:alert", (msg) => {
            expect(msg).to.equal("Você cancelou!")
        })
        cy.contains("button", "Mostrar Confirm").click()
    
    })

    it("Deve interagir com o prompt, inserir um texto e validar a mensagem", () => {
        cy.window().then((win) => {
            cy.stub(win, "prompt").returns("Felipe Lundgren")
        })
        cy.on("window:alert", (msg) => {
            expect(msg).to.equal("Olá Felipe Lundgren! Boas vindas ao WebDojo!")
        })
        cy.contains("button", "Mostrar Prompt").click()
    })
})