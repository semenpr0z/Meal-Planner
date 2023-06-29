export  function isValidRussianName(name) {
  const russianLettersRegex = /^[а-яА-ЯёЁ]+$/;
  // Проверка длины имени
  if (name.length < 2) {
    return false;
  }

  // Проверка наличия только букв русского алфавита
  if (!russianLettersRegex.test(name)) {
    return false;
  }

  // Дополнительные проверки на правильность написания можно добавить по необходимости

  return true;
}
