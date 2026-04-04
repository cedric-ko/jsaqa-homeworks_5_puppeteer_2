let page;

describe("Go to the cinema booking tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  afterEach(() => {
    page.close();
  });

  test.only("Should book three seats", async () => {
    const dateButton = await page.$("[data-time-stamp='1775336400']");
    await dateButton.click();
    const stalkerSessionTime = await page.waitForSelector(
      ".movie-seances__time[href='#'][data-seance-id='217']",
    );
    await stalkerSessionTime.click();
    await page.waitForSelector(".buying-scheme__wrapper");
    const freeSeats = await page.$$(
      ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
    );
    expect(freeSeats.length).toBeGreaterThanOrEqual(2);

    // Кликаем по первому и второму свободному креслу
    await freeSeats[0].click();
    await freeSeats[1].click();

    // Ждём, когда кнопка станет активной
    const bookingButton = await page.waitForSelector(
      ".acceptin-button:not([disabled])",
    );
    const buttonText = await page.evaluate(
      (el) => el.textContent,
      bookingButton,
    );

    expect(buttonText).toBe("Забронировать");
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 50000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 50000);
});
