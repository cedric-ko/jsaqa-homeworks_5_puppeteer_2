module.exports = {
  pickMonday: async function (page, selector) {
    try {
      const mondayDateButton = await page.$(selector); // создаём константу кнопки понедельника
      await mondayDateButton.click(); // нажимаем кнопку даты
    } catch (error) {
      throw new Error(
        `The selector: ${selector} is not found or can not be clicked`,
      );
    }
  },

  pickStalkerSessionTime: async function (page, selector) {
    try {
      const stalkerSessionTime = await page.waitForSelector(selector); // создаём константу кнопки времени сеанса фильма "Сталкер"
      await stalkerSessionTime.click(); // нажимаем кнопку времени сеанса
    } catch (error) {
      throw new Error(
        `The selector: ${selector} is not found or can not be clicked`,
      );
    }
  },
  
  picktheWitcherVipSessionTime: async function (page, selector) {
    try {
      const theWitcherVipSessionTime = await page.waitForSelector(selector); // создаём константу кнопки времени VIP-сеанса сериала "Ведьмак"
      await theWitcherVipSessionTime.click(); // нажимаем кнопку времени сеанса
    } catch (error) {
      throw new Error(
        `The selector: ${selector} is not found or can not be clicked`,
      );
    }
  },
  
  takeFreeSeat: async function (page, selector1, selector2) {
    try {
      await page.waitForSelector(selector1); // ждём появления на странице селектора схемы мест
      const freeSeats = await page.$$(selector2); // создаём массив свободных мест без значения "место занято"
      await freeSeats[0].click(); // нажимаем первое место в массиве свободных мест
    } catch (error) {
      throw new Error(
        `Could not find the selector: ${selector1} or there is no any selector: ${selector2}`,
      );
    }
  },

  takeTwoFreeSeats: async function (page, selector1, selector2) {
    try {
      await page.waitForSelector(selector1); // ждём появления на странице селектора схемы мест
      const freeSeats = await page.$$(selector2); // создаём массив свободных мест без значения "место занято"
      await freeSeats[0].click(); // нажимаем первое место в массиве свободных мест
      await freeSeats[1].click(); // нажимаем второе место в массиве
    } catch (error) {
      throw new Error(
        `Could not find the selector: ${selector1} or there is no any selector: ${selector2}`,
      );
    }
  },
  
  takeTakenSeat: async function (page, selector1, selector2) {
    try {
      await page.waitForSelector(selector1); // ждём появления на странице селектора схемы мест
      const takenSeat = await page.$(selector2); // создаём константу первого же занятого места
      await takenSeat.click(); // нажимаем занятое место
    } catch (error) {
      throw new Error(
        `Could not find the selector: ${selector1} or there is no any selector: ${selector2}`,
      );
    }
  },
  
  clickForBooking: async function (page, selector) {
    try {
      const bookingButton = await page.$(selector); // создаём константу кнопки бронирования
      await bookingButton.click(); // нажимаем кнопку бронирования
    } catch (error) {
      throw new Error(
        `Could not find or click the selector: ${selector}`,
      );
    }
  },
  
  getText: async function (page, selector) {
    try {
      const getCodeButton = await page.waitForSelector(selector); // создаём константу кнопки получения кода
      return await getCodeButton.evaluate((btn) => btn.textContent); // функция возвращает действительный результат: кнопка содержит текст
    } catch (error) {
      throw new Error(
        `Could not get text from selector: ${selector}`,
      );
    }
  },
  
  isDisabled: async function (page, selector) {
    try {
      const bookingButton = await page.$(selector); // создаём константу кнопки бронирования
      return await page.evaluate((btn) => btn.disabled, bookingButton); // функция возвращает действительный результат: кнопка неактивна
    } catch (error) {
      throw new Error(
        `That selector: ${selector} has not "/disabled"`,
      );
    }
  },
};
