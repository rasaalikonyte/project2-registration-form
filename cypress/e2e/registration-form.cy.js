describe("Registration-form visability", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  // all form elements are visable
  it("displays the form with empty fields", () => {
    cy.contains("label", "Username:").should("be.visible");
    cy.get('[name="username"]').should("be.visible").and("have.value", "");

    cy.contains("label", "Email:").should("be.visible");
    cy.get('[name="email"]').should("be.visible").and("have.value", "");

    cy.contains("label", "Password:").should("be.visible");
    cy.get('[name="password"]').should("be.visible").and("have.value", "");

    cy.contains("label", "Date of Birth:").should("be.visible");
    cy.get('[name="dob"]').should("be.visible").and("have.value", "");
  });

  it("displays submit button", () => {
    const element = cy.contains("button", /submit/i);
    element.should("be.visible");
  });
});
describe("Empty registration form validation", () => {
  it("should display validation errors if submitted empty fields", () => {
    // Customer goes to the page
    cy.visit("http://localhost:5173/");

    // Clicks submit button
    cy.contains("button", /submit/i).click();

    cy.get(".error").should("have.length", 4);
    cy.contains("Username is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
    cy.contains("Date of Birth is required").should("be.visible");
  });
});

describe("Registration form functionality", () => {
  it("Customer is able to fill registration form", () => {
    // Customer goes to the page
    cy.visit("http://localhost:5173/");
    // Fill the form
    cy.get('[name="username"]').type("rasa");

    cy.get('[name="email"]').type("rasa@gmail.com");

    cy.get('[name="password"]').type("1234567");

    cy.get('[name="dob"]').type("1994-01-01");
    // submits

    cy.contains("button", /submit/i).click();

    //next test: check if returns all filled data
    // cy.contains(
    //   "Thank you for your message! We will get back to you soon."
    // ).should("be.visible");
  });
});
