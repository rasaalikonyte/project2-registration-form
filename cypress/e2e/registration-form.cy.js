describe("Registration form visability", () => {
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

  it("displays submit button; submit button is enabled", () => {
    cy.contains("button", /submit/i)
      .should("be.visible")
      .and("not.be.disabled");
  });
});

describe("Registration form validation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display validation errors if submitted empty fields", () => {
    cy.contains("button", /submit/i).click();

    cy.get(".error")
      .should("be.visible")
      .and("contain", "Username is required")
      .and("contain", "Email is required")
      .and("contain", "Password is required")
      .and("contain", "Date of Birth is required");
  });

  it("should display validation error for invalid email", () => {
    cy.get('[name="email"]').type("invalid-email");
    cy.get('[name="username"]').type("somename");
    cy.get('[name="email"]').type("invalid-email");
    cy.get('[name="password"]').type("1234567");
    cy.get('[name="dob"]').type("1994-01-01");

    cy.contains("button", /submit/i).click();
    cy.get(".error").should("be.visible").and("contain", "Email is invalid");
  });

  it("should display validation error for short password", () => {
    cy.get('[name="email"]').type("invalid-email");
    cy.get('[name="username"]').type("somename");
    cy.get('[name="email"]').type("somename@gmail.com");
    cy.get('[name="password"]').type("123");
    cy.get('[name="dob"]').type("1994-01-01");

    cy.contains("button", /submit/i).click();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "Password must be at least 6 characters");
  });

  it("Date of birth should have input of type 'date'", () => {
    cy.get('[name="dob"]').should("have.attr", "type", "date");
  });
});

describe("Registration form functionality", () => {
  it("Customer is able to fill registration form and to see the data after submitting", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[name="username"]').type("somename");
    cy.get('[name="email"]').type("somename@gmail.com");
    cy.get('[name="password"]').type("1234567");
    cy.get('[name="dob"]').type("1994-01-01");

    cy.contains("button", /submit/i).click();

    cy.contains("Submitted Information:").should("be.visible");
    cy.contains("Username: somename").should("be.visible");
    cy.contains("Email: somename@gmail.com").should("be.visible");
    cy.contains("Date of Birth: 1994-01-01").should("be.visible");
    cy.contains("Age: 30").should("be.visible");
  });

  it("Checking if the age calculated correctly after the user submits the data", () => {
    cy.visit("http://localhost:5173");

    cy.get('[name="username"]').type("somename");
    cy.get('[name="email"]').type("somename@gmail.com");
    cy.get('[name="password"]').type("1234567");
    cy.get('[name="dob"]').type("1994-01-01");

    cy.contains("button", /submit/i).click();

    cy.get('[data-cy="age"]').should("have.text", 30);
  });
});
