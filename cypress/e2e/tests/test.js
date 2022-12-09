import faker from "faker";
let i = 5;
const b = i;
const EMAIL_FIELD_TEST_DATA = [
  "123",
  "123@",
  "12345@q",
  "15151515@.r",
  "!@#$%^&*()_",
];
const PASSWORD_FIELD_TEST_DATA = [
  "1",
  "12",
  "123",
  "1234",
  "12345",
  "123456",
  "1234567",
];

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
    cy.get('[type="text"]').click().type(`${faker.name.firstName()}{enter}`);
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
  cy.get("input[type=file]").attachFile("sea3.jpg");
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

describe("sign-up page", () => {
  beforeEach(() => {
    cy.visit("https://thefuture:ofadvertising@app.curryfresh.de/sign-up");
    cy.get('[class="sc-12hrgpe-0 sc-1l3wqm4-9 bkBocI eyXyno"]')
      .should("have.text", "Auswahl erlauben")
      .click();
  });
  it("Verify that validation appears if email and password field are empty", () => {
    cy.get('[type="email"]').should("have.value", "").click().clickOutside();
    cy.get('[class="sc-dqd7km-1 jXybrt"]').should(
      "have.text",
      "Bitte gebe deine E-Mail-Adresse ein."
    );
    cy.get('[type="password"]').should("have.value", "").click().clickOutside();
    cy.get('[class="sc-12z071v-0 bjNtCf sc-h708rf-7 kZKrLE"]').should(
      "have.text",
      "Dein Passwort muss mindestens 8 Zeichen enthalten."
    );
  });

  it("Verify that validation appears if email isn't valid", () => {
    EMAIL_FIELD_TEST_DATA.forEach((value1) => {
      cy.get('[type="email"]').click();
      cy.get('[type="email"]').type(value1).clickOutside();
      cy.get('[class="sc-dqd7km-1 jXybrt"]').should(
        "have.text",
        "Bitte überprüfe das Format der E-Mail-Adresse."
      );
      cy.get('[type="email"]').clear();
    });
  });

  it("Verify that validation appears if the password is less than 8 characters", () => {
    PASSWORD_FIELD_TEST_DATA.forEach((value2) => {
      cy.get('[type="password"]').click();
      cy.get('[type="password"]').type(value2).clickOutside();
      cy.get('[class="sc-12z071v-0 bjNtCf sc-h708rf-7 kZKrLE"]')
        .should(
          "have.text",
          "Dein Passwort muss mindestens 8 Zeichen enthalten."
        )
        .and("have.css", "color", "rgba(189, 56, 88, 0.87)");
      cy.get('[type="password"]').clear();
    });
    cy.get('[type="password"]').click().type("12345678");
    cy.get('[class="sc-12z071v-0 ilmPuM sc-h708rf-7 kZKrLE"]')
      .should("have.text", "Dein Passwort muss mindestens 8 Zeichen enthalten.")
      .and("have.css", "color", "rgba(5, 163, 122, 0.87)");
  });

  it("Successfully sign-up", () => {
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-h708rf-9 fIWDFM"')
      .should("have.text", "Registrieren")
      .should("be.disabled");
    cy.get('[type="email"]').click().type("new.email@kodep.ru");
    cy.get('[type="password"]').click().type("qweqweqwe");
    cy.get('[name="accepted"]').click({ force: true });
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-h708rf-9 fIWDFM"')
      .should("not.be.disabled")
      .click();
    cy.url().should("include", "https://app.curryfresh.de/dashboard/settings");
  });
});

describe.only("sign-in page", () => {
  beforeEach(() => {
    cy.visit("https://thefuture:ofadvertising@app.curryfresh.de/sign-in");
    cy.get('[class="sc-12hrgpe-0 sc-1l3wqm4-9 bkBocI eyXyno"]')
      .should("have.text", "Auswahl erlauben")
      .click();
  });
  it("Verify that validation appears if email and password field are empty", () => {
    cy.get('[type="email"]').should("have.value", "").click().clickOutside();
    cy.get('[class="sc-dqd7km-1 jXybrt"]')
      .eq(0)
      .should("have.text", "Bitte gebe deine E-Mail-Adresse ein.");
    cy.get('[type="password"]').should("have.value", "").click().clickOutside();
    cy.get('[class="sc-dqd7km-1 jXybrt"]')
      .eq(1)
      .should("have.text", "Dein Passwort");
  });

  it("Verify that validation appears if email isn't valid", () => {
    EMAIL_FIELD_TEST_DATA.forEach((value1) => {
      cy.get('[type="email"]').click();
      cy.get('[type="email"]').type(value1).clickOutside();
      cy.get('[class="sc-dqd7km-1 jXybrt"]').should(
        "have.text",
        "Bitte überprüfe das Format der E-Mail-Adresse."
      );
      cy.get('[type="email"]').clear();
    });
  });

  it("Verify that validation appears if email and password aren't valid", () => {
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-hi8gwd-7 egnZdD"]')
      .should("have.text", "Anmelden")
      .should("be.disabled");
    cy.get('[type="email"]').click().type("not-existing-email@kodep.ru");
    cy.get('[type="password"]').click().type("qweqweqwe");
    cy.get('[class="sc-pbn3r-1 kxXfoF"]').should("not.be.disabled").click();
    cy.get('[class="sc-hi8gwd-8 jfBdzO"]').should(
      "have.text",
      "Passwort oder E-Mail-Adresse sind ungültig"
    );
  });

  it("Successfully sign-in", () => {
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-hi8gwd-7 egnZdD"]')
      .should("have.text", "Anmelden")
      .should("be.disabled");
    cy.get('[type="email"]').click().type("mihagof219@cnogs.com");
    cy.get('[type="password"]').click().type("qweqweqwe");
    cy.get('[class="sc-pbn3r-0 dRRtnH sc-hi8gwd-7 egnZdD"')
      .should("not.be.disabled")
      .click();
    cy.url().should("include", "https://app.curryfresh.de/dashboard/settings");
  });
});
