const Company = require('../models/Company');

class CompanyService {
  constructor(data) {
    this.company = new Company(
      data.name,
      data.email,
      data.legal_nature,
      data.document,
      data.birth_date,
      data.phone,
      data.password,
    );
    this.config = this.getConfig();
  }

  static removeMask(maskedValue) {
    return `${maskedValue}`
      .replace(/\s/g, "")
      .replace(/-/g, "")
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/\D/g, "")
      .trim();
  };
  
  static isValidEmail(email) {
    return email.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i);
  }
  
  static isValidCPF(val) {
    let cpf = CompanyService.removeMask(val);
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
  
  static isValidCNPJ(val) {
    let cnpj = CompanyService.removeMask(val);
  
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
  
  static isValidPassword(val) {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(val);
  }

  getConfig() {
    return  this.company.legal_nature == "pf" ? 
      {
        type: "Física",
        document: "CPF",
        document_max_length: 11,
        document_validator: CompanyService.isValidCPF,
        name_label: "Nome",
        name_error_text: "um nome válido",
        date_label: "Data de nascimento"
      } : 
      {
        type: "Jurídica",
        document: "CNPJ",
        document_max_length: 15,
        document_validator: CompanyService.isValidCNPJ,
        name_label: "Razão Social",
        name_error_text: "uma razão social válida",
        date_label: "Data de abertura"
      }
  }

  validateCompanyData() {
    const errors = {};
    
    for (let key of this.company.get_field_keys()) {
      if (!this.company[key]) {
        errors[key] = [`O campo ${this.company.FIELD_NAME_MAP[key]} não pode ser vazio`];
      }

      else if (key == "name" && this.company[key].length < 3) {
        errors[key] = [`Digite ${this.config.name_error_text}`];
      }

      else if (key == "document" && !this.config.document_validator(this.company[key])) {
        errors[key] = [`Digite um ${this.config.document} válido`];
      }
    
      else if (key == "birth_date" && CompanyService.removeMask(this.company[key]).length !== 8) {
        errors[key] = [`Digite uma ${this.config.date_label.toLowerCase()} válida`];
      }
    
      else if (key == "phone" && CompanyService.removeMask(this.company[key]).length != 11) {
        errors[key] = ["Digite um telefone válido. Ex: (99) 999999999"];
      }

      else if (key == "password" && !CompanyService.isValidPassword(this.company[key])) {
        errors[key] = ["Digite um telefone válido. Ex: (99) 999999999"];
      }
    }

    return errors;
  }
  
}

module.exports = CompanyService;