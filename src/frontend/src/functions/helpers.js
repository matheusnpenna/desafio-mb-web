
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
  return maskedValue
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/\D/g, "")
    .trim();
};

export function isValidCPF(cpf) {
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

export function isValidCNPJ(cnpj) {
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

export const formatCnpjCpf = value => {
  if (!value && value == "-") return "-";

  const cnpjCpf = value.replace(/\D/g, "");

  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }

  return cnpjCpf.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    "$1.$2.$3/$4-$5"
  );
};

export const formatPhone = number => {
  if (!number && number == "-") return "-";

  // for pattern: +5599999999999
  const cleaned = ("" + number).replace(/\D/g, "");
  // for pattern: 5599999999999
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{4}|\d{5})(\d{4})$/);
  // for pattern: 55 99 99999 9999
  if (match) 
    return ["(", match[2], ")", match[3], "-", match[4]].join("");
  
  // for pattern: (99) 99999-9999
  return "";
};