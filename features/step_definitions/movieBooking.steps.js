const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");

const {
  pickMonday,
  pickStalkerSessionTime,
  picktheWitcherVipSessionTime,
  takeFreeSeat,
  takeTwoFreeSeats,
  takeTakenSeat,
  clickForBooking,
  getText,
  isDisabled,
} = require("../../lib/commands");

setDefaultTimeout(70000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});
After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on the cinema page", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 10000,
  });
});

When("user clicks on Monday button", async function () {
  return await pickMonday(this.page, "[data-time-stamp='1775422800']");
});

When("user clicks on Stalker session time", async function () {
  return await pickStalkerSessionTime(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='217']",
  );
});

When("user clicks on two free seats", async function () {
  return await takeTwoFreeSeats(
    this.page,
    ".buying-scheme__wrapper",
    ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
  );
});

When("user clicks on the booking button", async function () {
  return await clickForBooking(this.page, ".acceptin-button");
});

Then("user sees {string} button", async function (string) {
  const actual = await getText(this.page, "[onclick*='sale_save.php']");
  const expected = string;
  expect(actual).contains(expected);
});


When("user clicks on The Witcher VIP session time", async function () {
  return await picktheWitcherVipSessionTime(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='223']",
  );
});

When("user clicks on a free seat", async function () {
  return await takeFreeSeat(
    this.page,
    ".buying-scheme__wrapper",
    ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
  );
});


When("user clicks on a taken seat", async function () {
  return await takeTakenSeat(
        this.page,
        ".buying-scheme__wrapper",
        ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken",
      );
});

Then("booking button is disabled", async function () {
  const actual = await isDisabled(this.page, ".acceptin-button");
  const expected = true;
  expect(actual).to.equal(expected);
});