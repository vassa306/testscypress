class Datepickers {


    handlePCookies(){
        cy.get('#consentBtnall').click()
    }

    navigateToMonth(targetMonth) {
        cy.get('.dhx_calendar-action__show-month').then(($month) => {
            if (!$month.text().includes(targetMonth)) {
                cy.log($month)
                cy.get('button[aria-label="next"]').first().click({ force: true });

                // Add a short wait to ensure UI updates
                cy.wait(500);
                cy.get('.dhx_calendar-action__show-month').then(($month) => {
                    const currentMonth = $month.text().trim();
                    cy.log(`Current Month: ${currentMonth}`);
                });
                // Call the function recursively until the target month is found
                this.navigateToMonth(targetMonth);
            }
        });
    }

    selectCalendarDay(day) {
        cy.get('.dhx_calendar-day') // Select all day elements
          .eq(day)            // Find the day with the matching text
          .should('be.visible')     // Ensure it's visible
          .trigger('on change')
    }

    verifySelectedDate(){
        return cy.get('.date-select__time > .form-item__input').should("have.value", "Pá 4. 4.")
    }

    getMonthAndYea(){
        const date = new Date(2025, 3); // April 2025 (months are 0-indexed)
        const formatter = new Intl.DateTimeFormat('cs-CZ', { month: 'long', year: 'numeric' });
        const formattedDate = formatter.format(date);
        const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        console.log('formatted date' + formattedDate)
        return capitalizedDate
    }



    
}



export default Datepickers;