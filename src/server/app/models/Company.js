class Company {
  constructor(
    name,
    email,
    legal_nature,
    document,
    birth_date,
    phone,
    password,
  ) {
    this.name =   name;
    this.email =   email;
    this.legal_nature = legal_nature;
    this.document =   document;
    this.birth_date = birth_date;
    this.phone =   phone;
    this.password =   password;
    this.FIELD_NAME_MAP = {
      name: "nome",
      email: "e-mail",
      legal_nature: "pessoa física ou jurídica",
      document: legal_nature == 'natural' ? "CPF" : "CNPJ",
      birth_date: legal_nature == 'natural' ? "data de nascimento" : "data de abertura",
      phone: "telefone",
      password: "senha",
    }
  }


  get_field_keys() {
    return [
      "name",
      "email",
      "legal_nature",
      "document",
      "birth_date",
      "phone",
      "password",
    ]
  }
}

module.exports = Company;