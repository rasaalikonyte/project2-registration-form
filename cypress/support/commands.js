Cypress.Commands.add(
  "fillFormAndSubmit",
  (username = "", email = "", password = "", dateOfBirth = "") => {
    cy.visit("http://localhost:5173/");

    if (username) {
      cy.get('[name="username"]').type(username);
    }

    if (email) {
      cy.get('[name="email"]').type(email);
    }

    if (password) {
      cy.get('[name="password"]').type(password);
    }

    if (dateOfBirth) {
      cy.get('[name="dob"]').type(dateOfBirth);
    }

    cy.contains("button", /submit/i).click();
  }
);

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
