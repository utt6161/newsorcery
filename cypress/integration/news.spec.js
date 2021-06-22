import {sectionsList} from "../../src/store/crucialData";

const sizes = [
    "ipad-2",
    "iphone-x",
    [1280, 720]]

context("News page",()=>{

    before(() => {
        cy.visit(Cypress.config().baseUrl)
    })

    context("has sections",()=>{

        it("composed of fixed number of buttons",()=>{

            cy.get("[data-cy=sections-div]",{timeout: 3000})
                .children()
                .should("have.length", Object.values(sectionsList).length)

        })

        it("we can expand and shink them", ()=>{
            cy.get("[data-cy = expand-btn]")
                .click()
                .wait(1500)
                .click()

            cy.scrollTo("top")

        })

        it("div is scrollable", ()=>{
            cy.get("[data-cy = sections-div]")
                .scrollTo("right", {duration: 1500})
                .scrollTo("left", {duration: 1500})
        })


    })

    context("checking layout ", ()=>{

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

                context("Masonry layout settings can be toggled through modal panel", ()=>{

                    it("go to settings",()=>{

                        cy.get("[data-cy = settings-btn]")
                            .click()
                            .wait(1000)

                    })


                    it("we click on switch", ()=>{
                        cy.get("[data-cy = settings-switch]")
                            .click({force:true})
                    })

                    it("we close the modal by clicking outside of it, i cant select the X button :_^)", ()=>{

                        cy.get("body").click("topRight")

                    })

                    it("masonry layout changes, supposedly", ()=>{
                        cy.wait(1000)
                    })

                    it("return things back", ()=>{
                        cy.get("[data-cy = settings-btn]")
                            .click()

                        cy.get("[data-cy = settings-switch]")
                            .click({force:true})

                        cy.get("body").click("topRight")
                    })

                })

            })

        })
    })

    context("has an infinite scroll of news",()=>{

        before(() => {
            cy.visit(Cypress.config().baseUrl)
        })

        it("which works as intended", ()=>{
            cy.scrollTo("bottom",{duration:3500})
        })

        it("and by now we should have an anchor leading to the top",()=>{
            cy.get("[data-cy = anchor-btn]").click()
        })

        it("now, lets check every section with scrolling",()=>{
            cy.wait(500)
            for(let i = 0; i < Object.values(sectionsList).length; i++){
                cy.get("[data-sectionid = " + i + "]").click()
                cy.wait(500)
                cy.scrollTo("bottom",{duration:2500})
                cy.wait(500)
                cy.get("[data-cy = anchor-btn]").click()
                cy.wait(500)
            }
        })

    })




})
