describe('CKEditor Test', () => {
  it('should interact with CKEditor', () => {
    // Visit the page containing the CKEditor
    cy.visit('http://localhost:3000/admin');
    cy.contains("Write a Question").click();
    // Wait for the contenteditable div to be available
    cy.get('.question-container div[contenteditable="true"][role="textbox"]')
      .should('exist')
      .and('be.visible')
      .then(($div) => {
        // Trigger focus to ensure interaction with the div
        cy.wrap($div).focus();

        // Wait for CKEditor to initialize
        cy.window().should('have.property', 'CKEDITOR').then((win) => {
          // Wait a bit to ensure CKEditor is fully initialized (useful for slow loads)
          cy.wait(500);  // Adjust the delay if necessary

          // Check if CKEditor instance is available on the window
          if (win.CKEDITOR && win.CKEDITOR.instances) {
            const editor = win.CKEDITOR.instances[Object.keys(win.CKEDITOR.instances)[0]];
            if (editor) {
              // Use the editor instance to insert content
              editor.setData('What is Cypress?');
            }
          }
        });
        cy.window().then((win) => {
          if (win.CKEDITOR && win.CKEDITOR.instances) {
            const editor = win.CKEDITOR.instances[Object.keys(win.CKEDITOR.instances)[0]];
            console.log(editor);  // Check the editor instance in the console
            if (editor) {
              editor.setData('What is Cypress?');
            }
          }
        });
      });
  });
});