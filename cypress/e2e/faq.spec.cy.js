describe("FAQ Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin");
  });

  it("should open the question editor when clicking 'Write a Question'", () => {
    cy.contains("Write a Question").click();
    cy.get(".ck-content").should("exist"); // Verify the editor appears
  });

  it("should allow adding a new FAQ", () => {
    cy.contains("Write a Question").click();

    // Type question using realType for a more realistic typing simulation
    cy.get(".question-container .ck-content").first().clear().realType("What is Cypreeeess?");
    // Type answer using realType
    cy.get(".answer-container .ck-content").last().clear().realType("Cypress is aneee end-to-end testing tool.");

    // Submit the FAQ
    cy.contains("Submit").click();
    cy.wait(20000); // Wait for the new FAQ to be saved
    // Verify FAQ appears on the page
    cy.contains("Write a Question").click();

    cy.contains("What is Cypress?").should("exist");

  });

  it("should edit an existing FAQ", () => {
    // Click the Update button for the FAQ
    cy.contains("What is Cypress?").parent().parent().contains("Update").click();

    // Modify question & answer using realType
    cy.get(".ck-content").first().clear().realType("What is updated Cypress?");
    cy.get(".ck-content").last().clear().realType("Updated: Cypress is a powerful testing tool.");

    // Click Update to save the changes
    cy.contains("Update").click();

    // Verify updated FAQ is displayed
    cy.contains("What is updated Cypress?").should("exist");
  });

  it("should delete an FAQ", () => {
    // Click Delete for the FAQ
    cy.contains("What is updated Cypress?").parent().parent().contains("Delete").click();

    // Verify FAQ is removed from the page
    cy.contains("What is updated Cypress?").should("not.exist");
  });
});