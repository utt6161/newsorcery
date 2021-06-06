/// <reference types="cypress" />

const sizes = [
    // "ipad-2",
    // "iphone-x",
    [1280, 720]]

context("Shared layout", () => {

    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    sizes.forEach((size)=>{

        context(`on ${size} resolution`, () => {

            beforeEach(() => {
                if (Cypress._.isArray(size)) {
                    cy.viewport(size[0], size[1])
                } else {
                    cy.viewport(size)
                }
            })

            context("Has brand link", () => {

                it("that is present", () => {


                    cy.get("[data-cy=brand-link]")
                        .should("have.text", "NEWSorcery")
                        .should("have.attr", "href", "/")

                })

                it("and leads us to main page", () => {
                    cy.url()
                        .should((text) => {
                            expect(text).equal(Cypress.config().baseUrl)
                        })

                })

            })

            context("Has search input field", ()=>{

                it("in which you can type", ()=>{

                    cy.get("[data-cy = search-input]")
                        .clear()
                        .type("here is the text that we type")
                        .should((element)=>{
                            expect(element.val()).equal("here is the text that we type")
                        })
                        .clear()

                })

            })

            context("Has search button", ()=>{

                it("Which has a corresponding text", () => {

                    cy.get("[data-cy = search-btn]")
                        .should((element)=>{
                            expect(element.text()).equal("Search")
                        })

                })

            })

        })

    })
})

