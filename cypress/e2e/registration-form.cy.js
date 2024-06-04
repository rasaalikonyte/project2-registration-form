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

describe("Registration form validation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display validation errors if submitted empty fields", () => {
    // Clicks submit button
    cy.contains("button", /submit/i).click();

    cy.get(".error").should("have.length", 4);
    cy.contains("Username is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
    cy.contains("Date of Birth is required").should("be.visible");
  });

  it("should display validation error for invalid email", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.contains("button", /submit/i).click();

    cy.contains("Email is invalid").should("be.visible");
  });

  it("should display validation error for short password", () => {
    cy.get('input[name="password"]').type("123");
    cy.contains("button", /submit/i).click();

    cy.contains("Password must be at least 6 characters").should("be.visible");
  });

  // it("should display validation error for invalid date of birth", () => {
  //   cy.get('input[name="dob"]').type("invalid-date");
  //   cy.contains("button", /submit/i).click();

  //   cy.contains("Date of Birth is invalid").should("be.visible");
  // });
});

describe("Registration form functionality", () => {
  it("Customer is able to fill registration form", () => {
    // Customer goes to the page
    cy.visit("http://localhost:5173/");
    // Fill the form
    cy.get('[name="username"]').type("rasa");
    cy.get('[name="email"]').type("rasa@gmail.com");
    cy.get('[name="password"]').type("1234567", { sensitive: true });
    cy.get('[name="dob"]').type("1994-01-01");
    // submits
    cy.contains("button", /submit/i).click();
  });

  it("Customer is able to see the data after submitting the filled registration form", () => {
    // Customer goes to the page
    cy.visit("http://localhost:5173/");
    // Fill the form
    cy.get('[name="username"]').type("rasa");
    cy.get('[name="email"]').type("rasa@gmail.com");
    cy.get('[name="password"]').type("1234567");
    cy.get('[name="dob"]').type("1994-01-01");
    // submits
    cy.contains("button", /submit/i).click();
    // submitted data
    cy.contains("h3", "Submitted Information:").should("be.visible");
    cy.contains("Username: rasa").should("be.visible");
    cy.contains("Email: rasa@gmail.com").should("be.visible");
    cy.contains("Date of Birth: 1994-01-01").should("be.visible");
    cy.contains("Age: 30").should("be.visible"); // Assuming current year is 2024
  });
});

describe("Is age calculated correctly", () => {
  it("User fills the form and submits the data", () => {
    cy.visit("http://localhost:5173");
    cy.get('[name="username"]').type("rasa");
    cy.get('[name="email"]').type("rasa@gmail.com");
    cy.get('[name="password"]').type("1234567");
    cy.get('[name="dob"]').type("1994-01-01");

    cy.contains("button", /submit/i).click();
  });

  // cy.contains("Age: 30").should("have.value", { expectedAge });
  // cy.get('[name="Age"]').should("have.text", expectedAge.toString());
});
