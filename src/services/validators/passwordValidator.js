export function isValidPassword(password) {

  // Проверка сложности пароля (наличие строчных и прописных букв, цифр и специальных символов)
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[^a-zA-Z0-9]/;

    return [
      { name: "Наличие строчных букв.", status: !lowercaseRegex.test(password) },
      { name: "Наличие заглавных букв.", status: !uppercaseRegex.test(password) },
      { name: "Наличие цифр.", status: !digitRegex.test(password) },
      { name: "Наличие спец. символов (!@#$%^&*.)", status: !specialCharRegex.test(password) },
      { name: "Длина не менее 8 символов.", status: password.length < 8 },
    ];
}
