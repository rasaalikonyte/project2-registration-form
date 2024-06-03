describe("Registration-form display", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

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

describe("Contact us functionality", () => {
  it("Customer is able to fill registration form", () => {
    // Customer goes to the page
    cy.visit("http://localhost:5173/");
    // Fill the form
    cy.get('[name="username"]').type("rasa");

    cy.get('[name="email"]').type("rasa@gmail.com");

    cy.get('[name="password"]').type("1234567");

    cy.get('[name="dob"]').type("01-01-1994");

    cy.contains("button", /submit/i).click();

    //next test: check if returns all filled data
    // cy.contains(
    //   "Thank you for your message! We will get back to you soon."
    // ).should("be.visible");
  });
});
