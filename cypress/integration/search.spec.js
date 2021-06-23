context("search page",()=>{

    it("searching for something",()=>{

        cy.visit(Cypress.config().baseUrl)

        cy.get("[data-cy = search-input]")
            .clear()
            .type("apple company")

        cy.get("[data-cy = search-btn]")
            .click()

    })

    it("try searching with section being on",()=>{

        cy.visit(Cypress.config().baseUrl)

        cy.get("[data-cy = search-input]")
            .clear()
            .type("apple company")

        // second section is a business
        cy.get("[data-sectionid = 1]").click()

        cy.get("[data-cy = search-btn]")
            .click()

    })

    it("try changing section once we done searching",()=>{
        cy.visit(Cypress.config().baseUrl)

        cy.get("[data-cy = search-input]")
            .clear()
            .type("apple company")

        cy.get("[data-cy = search-btn]")
            .click()

        cy.wait(3000)
        // second section is a business
        cy.get("[data-sectionid = 1]").click()

    })

    it("check for infinite scroll", ()=>{
        cy.visit(Cypress.config().baseUrl)
        cy.get("[data-cy = search-input]")
            .clear()
            .type("apple company")

        cy.get("[data-cy = search-btn]")
            .click()

        cy.wait(500)
        cy.scrollTo("bottom",{duration:2500})
        cy.wait(500)
        cy.get("[data-cy = anchor-btn]").click()
        cy.wait(500)
    })

    it("check for url params",()=>{
        // searching for an apple
        cy.visit(Cypress.config().baseUrl + "search?&q=apple")
        cy.wait(2000)
        // searching for an apple with business section
        cy.visit(Cypress.config().baseUrl + "search?&q=apple&sectionId=business")
        cy.wait(2000)
        // attempt to search with empty q param
        cy.visit(Cypress.config().baseUrl + "search?&q=&sectionId=business")
        cy.wait(2000)
        // attempt to search without anything yet params are present
        cy.visit(Cypress.config().baseUrl + "search?&q=&sectionId=")
        cy.wait(2000)
        // attempt to search with broken section param
        cy.visit(Cypress.config().baseUrl + "search?&q=&sectionId=hahasection")
        cy.wait(2000)
        // attempt to search without query param section param and haha section
        cy.visit(Cypress.config().baseUrl + "search?&sectionId=hahasection")
        cy.wait(2000)
        // attempt to search without anything
        cy.visit(Cypress.config().baseUrl + "search")
        cy.wait(2000)
    })
})
