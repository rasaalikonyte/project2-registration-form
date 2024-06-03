describe("Registration Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  // it("should display validation errors for empty fields", () => {
  //   cy.get('button[type="submit"]').click();

  //   cy.get(".error").should("have.length", 4);
  //   cy.contains("Username is required").should("be.visible");
  //   cy.contains("Email is required").should("be.visible");
  //   cy.contains("Password is required").should("be.visible");
  //   cy.contains("Date of Birth is required").should("be.visible");
  // });

  it("should display validation error for invalid email", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('button[type="submit"]').click();

    cy.contains("Email is invalid").should("be.visible");
  });

  it("should display validation error for short password", () => {
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.contains("Password must be at least 6 characters").should("be.visible");
  });

  it("should display validation error for invalid date of birth", () => {
    cy.get('input[name="dob"]').type("invalid-date");
    cy.get('button[type="submit"]').click();

    cy.contains("Date of Birth is invalid").should("be.visible");
  });

  it("should submit the form with valid data", () => {
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="dob"]').type("2000-01-01");
    cy.get('button[type="submit"]').click();

    cy.contains("Submitted Information:").should("be.visible");
    cy.contains("Username: testuser").should("be.visible");
    cy.contains("Email: testuser@example.com").should("be.visible");
    cy.contains("Date of Birth: 2000-01-01").should("be.visible");
    cy.contains("Age: 24").should("be.visible"); // Assuming current year is 2024
  });
});
