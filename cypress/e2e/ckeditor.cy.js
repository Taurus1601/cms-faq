describe('CKEditor Test', () => {
    it('should load the CKEditor and allow typing', () => {
      // Visit the page where the CKEditor is located    
      cy.visit('http://localhost:3000/admin');
    cy.contains("Write a Question").click();
      // Check if the CKEditor exists

      // Check if the placeholder exists and is visible
      cy.get('.question-container p.ck-placeholder').should('exist').and('be.visible');
  
      // Type text into the CKEditor
      cy.get('.question-container .ck-editor__editable').focus().realType('heading 1');

      // Check if the placeholder is no longer visible after typing
      cy.get('p.ck-placeholder').should('not.be.visible');
  
      // Check if the typed text is present in the editor
      cy.get('.ck-blurred.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline').should('contain.text', 'Hello, CKEditor!');
    });
  });