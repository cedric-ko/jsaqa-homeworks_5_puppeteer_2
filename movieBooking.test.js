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
} = require("./lib/commands");

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

    const expected = "Получить код бронирования"; // ожидаемый результат теста

    await pickMonday(page, "[data-time-stamp='1775422800']"); // нажимаем кнопку понедельника кастомной командой
    await pickStalkerSessionTime(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']",
    ); // нажимаем кнопку времени сеанса "Сталкер" кастомной командой
    await takeTwoFreeSeats(
      page,
      ".buying-scheme__wrapper",
      ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
    ); // выбираем два свободных места кастомной командой
    await clickForBooking(page, ".acceptin-button"); // нажимаем кнопку бронирования кастомной командой

    const actual = await getText(page, "[onclick*='sale_save.php']"); // задаём константу действительного результата кастомной командой

    expect(actual).toContain(expected); // ассерт: проверяем, что действительный результат содержит ожидаемый
  });

  test("Should book a VIP seat", async () => {
    // "Должен забронировать VIP место"

    const expected = "Получить код бронирования"; // ожидаемый результат теста

    await pickMonday(page, "[data-time-stamp='1775422800']"); // нажимаем кнопку понедельника кастомной командой
    await picktheWitcherVipSessionTime(
      page,
      ".movie-seances__time[href='#'][data-seance-id='223']",
    ); // выбираем время VIP-сеанса на "Ведьмак"
    await takeFreeSeat(
      page,
      ".buying-scheme__wrapper",
      ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
    ); // выбираем свободное место кастомной командой
    await clickForBooking(page, ".acceptin-button"); // нажимаем кнопку бронирования кастомной командой

    const actual = await getText(page, "[onclick*='sale_save.php']"); // задаём константу действительного результата кастомной командой

    expect(actual).toContain(expected); // ассерт: проверяем, что действительный результат содержит ожидаемый
  });

  test("Should NOT book a taken seat", async () => {
    // "НЕ следует бронировать занятое место"

    const expected = true;

    await pickMonday(page, "[data-time-stamp='1775422800']"); // нажимаем кнопку понедельника кастомной командой
    await pickStalkerSessionTime(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']",
    ); // нажимаем кнопку времени сеанса "Сталкер" кастомной командой
    await takeTakenSeat(
      page,
      ".buying-scheme__wrapper",
      ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken",
    ); // выбираем занятое место кастомной командой
    
    const actual = await isDisabled(page, ".acceptin-button"); // задаём константу действительного результата кастомной командой

    expect(actual).toBe(expected); // ассерт: ожидаем, что кнопка неактивна, как и ожидалось
  });
});
