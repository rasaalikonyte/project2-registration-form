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

describe("Registration form functionality", () => {
  let correctUsername = "somename";
  let correctEmail = "somename@gmail.com";
  let correctPassword = "1234567";
  let correctDob = "1994-01-01";
  let expectedAge = "30";

  it("Customer is able to fill registration form and to see the data after submitting", () => {
    cy.fillFormAndSubmit(
      correctUsername,
      correctEmail,
      correctPassword,
      correctDob
    );

    cy.contains("Submitted Information:").should("be.visible");
    cy.contains("Username: somename").should("be.visible");
    cy.contains("Email: somename@gmail.com").should("be.visible");
    cy.contains("Date of Birth: 1994-01-01").should("be.visible");
    cy.contains("Age: 30").should("be.visible");
  });

  it("Checking if the age calculated correctly after the user submits the data", () => {
    cy.fillFormAndSubmit(
      correctUsername,
      correctEmail,
      correctPassword,
      correctDob
    );

    cy.get('[data-cy="age"]').contains(`${expectedAge}`);
  });
});

describe("Registration form validation", () => {
  let correctUsername = "somename";
  let correctEmail = "somename@gmail.com";
  let correctPassword = "1234567";
  let correctDob = "1994-01-01";

  it("should display validation errors if submitted empty fields", () => {
    cy.fillFormAndSubmit("", "", "", "");

    cy.get(".error")
      .should("be.visible")
      .and("contain", "Username is required")
      .and("contain", "Email is required")
      .and("contain", "Password is required")
      .and("contain", "Date of Birth is required");
  });

  it("should display validation error for invalid email", () => {
    cy.fillFormAndSubmit(
      correctUsername,
      "invalid-email",
      correctPassword,
      correctDob
    );
    cy.get(".error").should("be.visible").and("contain", "Email is invalid");
  });

  it("should display validation error for short password", () => {
    cy.fillFormAndSubmit(correctUsername, correctEmail, "123", correctDob);

    cy.get(".error")
      .should("be.visible")
      .and("contain", "Password must be at least 6 characters");
  });

  it("should inspect if date of birth should have input of type 'date'", () => {
    cy.fillFormAndSubmit(
      correctUsername,
      correctEmail,
      correctPassword,
      correctDob
    );
    cy.get('[name="dob"]').should("have.attr", "type", "date");
  });
});
