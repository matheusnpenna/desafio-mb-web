import { isValidCNPJ, isValidCPF } from "@/functions/helpers";

export function usePersonComponentConfig(person_type) {
  return {
    config: person_type == "pf" ? 
      {
        type: "Física",
        document: "CPF",
        document_max_length: 11,
        document_validator: isValidCPF,
        name_label: "Nome",
        name_error_text: "um nome válido",
        date_label: "Data de nascimento"
      } : 
      {
        type: "Jurídica",
        document: "CNPJ",
        document_max_length: 15,
        document_validator: isValidCNPJ,
        name_label: "Razão Social",
        name_error_text: "uma razão social válida",
        date_label: "Data de abertura"
      }
    };
}