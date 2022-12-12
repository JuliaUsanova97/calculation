import { faker } from '@faker-js/faker';

let i = 5;
const b = i;


it("CONTACT US", () => {
  cy.visit("http://webdriveruniversity.com/Contact-Us/contactus.html");

  cy.get('[type="submit"]').should("have.value", "SUBMIT").click();
  cy.url().should(
    "include",
    "http://webdriveruniversity.com/Contact-Us/contact_us.php"
  );
  cy.contains("Error: all fields are required");
  cy.contains("Error: Invalid email address");
  cy.go("back");
  cy.url().should(
    "include",
    "http://webdriveruniversity.com/Contact-Us/contactus.html"
  );
  cy.get('[name="first_name"]').type(faker.name.firstName());
  cy.get('[name="last_name"]').type(faker.name.lastName());
  cy.get('[name="email"]').type(faker.name.firstName());
  cy.get('[name="message"]').type("text message");
  cy.get('[type="submit"]').click();
  cy.url().should(
    "include",
    "http://webdriveruniversity.com/Contact-Us/contact_us.php"
  );
  cy.contains("Error: Invalid email address");
  cy.go("back");
  cy.url().should(
    "include",
    "http://webdriveruniversity.com/Contact-Us/contactus.html"
  );
  cy.get('[name="email"]').type(faker.internet.email());
  cy.get('[type="submit"]').should("have.value", "SUBMIT").click();
  cy.url().should(
    "include",
    "http://webdriveruniversity.com/Contact-Us/contact-form-thank-you.html"
  );
  cy.contains("Thank You for your Message!");
});

it("To do list", () => {
  cy.visit("http://webdriveruniversity.com/To-Do-List/index.html");
  cy.get('[type="text"]').should("be.visible");
  cy.get('[class="fa fa-plus"]').should("be.visible").click();
  cy.get('[type="text"]').should("not.be.visible");
  cy.get("li")
    .should("have.length", 3)
    .each(($li) => {
      cy.get($li).click();
      cy.get($li).should("have.class", "completed");
    });
  cy.get("li")
    .should("have.length", 3)
    .each(($li) => {
      cy.get($li).click();
      cy.get($li).should("have.class", "");
    });
  cy.get('[class="fa fa-plus"]').should("be.visible").click();

  for (i; i > 0; i--) {
    cy.get('[type="text"]').click().type(`${'name'}{enter}`);
  }
  cy.get("li").should("have.length", 3 + b);
  cy.get("li").last();
  cy.get('[class="fa fa-trash"]').last().click({ force: true });
  cy.get("li").should("have.length", 3 + b - 1);
});

it("failed Upload", () => {
  cy.visit("http://webdriveruniversity.com/File-Upload/index.html");
  cy.get('[type="submit"]').click();
  cy.on("window:alert", (text) => {
    expect(text).to.contains("You need to select a file to upload!");
  });
});

it("success Upload", () => {
  cy.visit("http://webdriveruniversity.com/File-Upload/index.html");
  cy.get("input[type=file]").selectFile("cypress/fixtures/image1.jpg");
  cy.get('[type="submit"]').click();
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Your file has now been uploaded!");
  });
});

it("add and remove elements", () => {
  cy.visit("http://the-internet.herokuapp.com/add_remove_elements/");
  cy.contains("Add/Remove Elements");
  cy.get('[onclick="addElement()"]').should("have.text", "Add Element");
  for (let a = 10; a > 0; a--) {
    cy.get('[onclick="addElement()"]').click();
  }
  cy.get('[class="added-manually"]')
    .should("have.length", 10)
    .each(($class) => {
      cy.get($class).click();
      cy.get($class).should("not.exist");
    });
});

it("Basic auth", () => {
  cy.visit("https://thefuture:ofadvertising@app.curryfresh.de/sign-in");
  cy.get('[class="sc-12hrgpe-0 sc-1l3wqm4-9 bkBocI eyXyno"]').click();
  cy.get('[name="email"]').should(
    "have.attr",
    "placeholder",
    "Deine E-Mail-Adresse"
  );
  cy.get('[name="password"]').should(
    "have.attr",
    "placeholder",
    "Dein Passwort"
  );
  cy.get('[name="email"]')
    .should("have.value", "")
    .click()
    .type("yomemi1831@turuma.com");
  cy.get('[name="password"]')
    .should("have.value", "")
    .click()
    .type("qweqweqwe");
});

it("Checkboxes", () => {
  cy.visit("http://the-internet.herokuapp.com/checkboxes");
  cy.contains("Checkboxes");
  cy.get('[type="checkbox"]').eq(1).should("be.checked").click();
  cy.get('[type="checkbox"]').eq(1).should("not.be.checked");
  cy.get('[type="checkbox"]').eq(0).should("not.be.checked").click();
  cy.get('[type="checkbox"]').should("be.checked");
});



