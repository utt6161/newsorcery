
context("News page",()=>{

    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    context("has sections",()=>{

        it("composed of div with 24 buttons",()=>{

            cy.get("[data-cy=sections-div]",{timeout: 3000})
                .children()
                .should("have.length", 24)

        })

    })

})
