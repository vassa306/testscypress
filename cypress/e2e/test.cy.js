import Datepickers from "../../support/page_objects/Datepickers.spec";

describe('Handle Web Elements', () => {

    let webPage = null;

    beforeEach(() => {
        cy.fixture("testdata").then((data) => {
            webPage = data;
        });

    });

    const datePicker = new Datepickers();

    it("Handle Date Pickers", () => {

        cy.visit("http://www.webdriveruniversity.com")
        cy.get('#datepicker').invoke('removeAttr', 'target').click({ force: true })
        let date = new Date();
        date.setDate(date.getDate() + 4);//get yesterday
        var futureDay = date.getDate();


        let date2 = new Date();
        date2.setDate(date2.getDate() + 4)
        cy.log(date2.getDate())

        var date3 = new Date()
        date3.setDate(date3.getDate() + 4)
        var nextYear = date3.getFullYear() + 1;
        var futureMonth = date3.toLocaleString("default", { month: "long" });
        cy.log("Future month to select " + futureMonth)
        cy.log("Future year to select " + nextYear)

        function selectMonthAndYear() {
            cy.get('#datepicker').click()
            cy.get('.datepicker-dropdown .datepicker-switch').first().should('be.visible').then(() => {
                cy.get('.datepicker-dropdown .datepicker-switch')
                    .first()
                    .invoke('text')
                    .then(currentDate => {
                        if (!currentDate.includes(nextYear)) {
                            cy.get('.next').first().click();
                            // Use a loop-like structure with Cypress's retry mechanism
                            selectMonthAndYear()

                        }

                    });
            }).then(() => {
                cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                    if (!currentDate.text().includes(futureMonth)) {
                        cy.get('.next').first().click();
                        selectMonthAndYear()

                    }
                    cy.get('#datepicker').click()
                })
            })
        }

        function selectFutureDay() {
            cy.get('[class="day"]').contains(futureDay).click();
        }
        selectMonthAndYear();
        //
        selectFutureDay();


    })


    it('Handle another picker', () => {
        cy.visit('https://phptravels.net/')
        cy.xpath('//input[@name="from"]').type("LHE");
        cy.xpath('//input[@name="to"]').type("DXB");
        

        // cy.get('#departure').then(($input) => {
        //     ; // Access the DOM element
        //     input.click(); // Programmatically trigger the click
        //   });

          cy.get('#departure').click()
          .clear().type('2025-04-20') // Adjust the format based on your application
          .trigger('change');
        
        cy.xpath('//button[@id="flights-search"]').click()
        cy.xpath('//div[@class="stacked-color"]', {timeout: 10000}).should("be.visible")


        
        const expectedValues = [231.00, 231.00, 279.00];
        cy.get('h6.order-sm-1').each(($el, index) => {
            // Extract the price text from the <strong> tag
            cy.wrap($el).within(() => {
              cy.get('strong').invoke('text').then((text) => {
                // Extract the numeric value (e.g., "USD 201.00" -> "201.00")
                const numericValue = parseFloat(text.match(/\d+\.\d+/)[0]); // Extracts the first number with decimals
                
                // Log for debugging
                cy.log(`Order ${index + 1}: Extracted Value = ${numericValue}, Expected Value = ${expectedValues[index]}`);
                // Compare with the expected value
                expect(numericValue).to.equal(expectedValues[index]);
              });
            });
        });
    });
});