let page;

describe("Go to the cinema booking tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  afterEach(() => {
    page.close();
  });

  test("Should book two seats", async () => {
    // "Должен забронировать два места"
    const dateButton = await page.$("[data-time-stamp='1775336400']"); // создаём константу кнопки даты
    await dateButton.click(); // нажимаем кнопку даты
    const stalkerSessionTime = await page.waitForSelector(
      // создаём константу кнопки времени сеанса фильма "Сталкер"
      ".movie-seances__time[href='#'][data-seance-id='217']",
    );
    await stalkerSessionTime.click(); // нажимаем кнопку времени сеанса

    await page.waitForSelector(".buying-scheme__wrapper"); // ждём появления на странице селектора схемы мест
    const freeSeats = await page.$$(
      // создаём массив свободных мест без значения "место занято"
      ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
    );
    await freeSeats[0].click(); // нажимаем первое свободное место в массиве
    await freeSeats[1].click(); // нажимаем второе место в массиве
    const bookingButton = await page.$(".acceptin-button"); // создаём константу кнопки бронирования
    await bookingButton.click(); // нажимаем кнопку бронирования

    const getCodeButton = await page.waitForSelector(
      // создаём константу кнопки получения кода
      "[onclick*='sale_save.php']",
    );

    const actual = await getCodeButton.evaluate((btn) => btn.textContent); // константа действительного результата: кнопка содержит текст

    expect(actual).toContain("Получить код бронирования"); // ассерт: проверяем, что ожидаемый результат включает указанный текст
  });

  test("Should book a VIP seat", async () => {
    // "Должен забронировать VIP место"
    const dateButton = await page.$("[data-time-stamp='1775336400']"); // создаём константу кнопки даты
    await dateButton.click(); // нажимаем кнопку даты
    const theWitcherVipSessionTime = await page.waitForSelector(
      // создаём константу кнопки времени сеанса фильма "Сталкер"
      ".movie-seances__time[href='#'][data-seance-id='223']",
    );
    await theWitcherVipSessionTime.click(); // нажимаем кнопку времени сеанса

    await page.waitForSelector(".buying-scheme__wrapper"); // ждём появления на странице селектора схемы мест
    const freeSeats = await page.$$(
      // создаём массив свободных мест без значения "место занято"
      ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
    );
    await freeSeats[0].click(); // нажимаем первое свободное место в массиве
    const bookingButton = await page.$(".acceptin-button"); // создаём константу кнопки бронирования
    await bookingButton.click(); // нажимаем кнопку бронирования

    const getCodeButton = await page.waitForSelector(
      // создаём константу кнопки получения кода
      "[onclick*='sale_save.php']",
    );

    const actual = await getCodeButton.evaluate((btn) => btn.textContent); // константа действительного результата: кнопка содержит текст

    expect(actual).toContain("Получить код бронирования"); // ассерт: проверяем, что ожидаемый результат включает указанный текст
  });

  test("Should NOT book a taken seat", async () => {
    // "НЕ следует бронировать занятое место"
    const dateButton = await page.$("[data-time-stamp='1775422800']"); // создаём константу кнопки даты
    await dateButton.click(); // нажимаем кнопку даты
    const stalkerSessionTime = await page.waitForSelector(
      // создаём константу кнопки времени сеанса фильма "Сталкер"
      ".movie-seances__time[href='#'][data-seance-id='217']",
    );
    await stalkerSessionTime.click(); // нажимаем кнопку времени сеанса

    await page.waitForSelector(".buying-scheme__wrapper"); // ждём появления на странице селектора схемы мест
    const takenSeat = await page.$(
      // создаём константу занятого места
      ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken",
    );
    await takenSeat.click(); // нажимаем занятое место
    const bookingButton = await page.$(".acceptin-button"); // создаём константу кнопки бронирования

    const isDisabled = await page.evaluate(
      (btn) => btn.disabled,
      bookingButton,
    ); // константа действительного результата: кнопка неактивна

    expect(isDisabled).toBe(true); // ассерт: ожидаем, что кнопка действительно неактивна
  });
});
