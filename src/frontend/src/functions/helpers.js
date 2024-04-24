
export const formFields = (fields, initial = {}) => {
  const form = {};
  const errors = {};
  for (const i in fields) {
    const field = fields[i];
    form[field] =
      initial &&
      (initial[field] !== "" ||
        initial[field] !== undefined ||
        initial[field] !== null)
        ? initial[field]
        : "";
    errors[field] = [];
  }
  return { form, errors, loading: false };
};

export const removeMask = maskedValue => {
  return `${maskedValue}`
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/\D/g, "")
    .trim();
};

export const isValidEmail = email => {
  if (!email.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
    return false;
  }
  
  return true;
}

export function isValidCPF(val) {
  let cpf = removeMask(val);
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  cpf = cpf.split("");
  const validator = cpf
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map(el => +el);
  const toValidate = pop =>
    cpf
      .filter((digit, index, array) => index < array.length - pop && digit)
      .map(el => +el);
  const rest = (count, pop) =>
    ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      11) %
    10;
  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

export function isValidCNPJ(val) {
  let cnpj = removeMask(val);

  const format = value => value.replace(/[^\d]+/g, "");
  const isValidNumber = (value, count) =>
    format(value).length === count && !format(value).match(/(\d)\1{10}/);
  const sum = (array, start) =>
    array.reduce((total, el, i) => total + el * (start - i), 0);
  const rest = value => value % 11;

  const validator = value =>
    format(value)
      .split("")
      .splice(format(value).length - 2)
      .map(el => +el);

  const toValidate = (value, end, start = 0) =>
    format(value)
      .split("")
      .filter((digit, index) => index >= start && index <= end && digit)
      .map(el => +el);

  const validate = (firstDigit, lastDigit, validator) =>
    firstDigit === validator[0] && lastDigit === validator[1];

  if (!isValidNumber(cnpj, 14)) return false;

  const digit = sum => (rest(sum) < 2 ? 0 : 11 - rest(sum));

  const firstDigit = digit(
    sum(toValidate(cnpj, 3), 5) + sum(toValidate(cnpj, 11, 4), 9)
  );
  const lastDigit = digit(
    sum(toValidate(cnpj, 4), 6) + sum(toValidate(cnpj, 12, 5), 9)
  );

  return validate(firstDigit, lastDigit, validator(cnpj));
}

export const isValidDate = date => {
  return !isNaN(
    new Date(
      `${date}`.split("/").reverse().join("/")
    )
  );
}

export const formatCnpjCpf = value => {
  if (!value && value == "-") return "-";

  const document = value.replace(/\D/g, "");

  if (document.length === 11) {
    return document
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  return document.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    "$1.$2.$3/$4-$5"
  );
};

export const formatPhone = n => `${n}`
  .replace(/\D/g, "")
  .replace(/(\d{2})(\d)/, "($1) $2")
  .replace(/(\d{5})(\d)/, "$1-$2")
  .replace(/(-\d{4})(\d+?)$/, "$1");


export const formatDate = val => {
  return `${val}`
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
}

export const isValidPassword = val => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(val);