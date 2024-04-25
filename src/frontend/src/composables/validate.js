import { isValidDate, isValidEmail, isValidPassword, removeMask } from '@/functions/helpers';

export function useValidator(config) {

  const validator = (form_data) => {
    const validated_errors = {};
    
    const is_filled = v => v && v.length;

    for (let key in form_data) {
      if (key == "name" && (!form_data[key] || !form_data[key].length)) {
        validated_errors[key] = [`Digite ${config.name_error_text}`];
      }
      
      else if (key == "email" && (!form_data[key] || !isValidEmail(form_data[key]))) {
        validated_errors[key] = [`Digite um e-mail válido`];
      }

      else if (key == "document" && (!is_filled(form_data[key]) || !config.document_validator(form_data[key]))) {
        validated_errors[key] = [`Digite um ${config.document} válido`];
      }
    
      else if (key == "birth_date" && (!is_filled(form_data[key]) || !isValidDate(form_data[key]))) {
        validated_errors[key] = [`Digite uma ${config.date_label.toLowerCase()} válida`];
      }
    
      else if (key == "phone" && (!is_filled(form_data[key]) || removeMask(form_data[key]).length != 11)) {
        validated_errors[key] = ["Digite um telefone válido. Ex: (99) 999999999"];
      }

      else if (key == "password" && (!is_filled(form_data[key]) || !isValidPassword(form_data[key]))) {
        validated_errors[key] = ["Sua senha deve conter 8 dígitos, com pelo menos 1 número, 1 letra minúscula e 1 letra maiúscula."];
      }
    }

    return { validated_errors };
  }
  
  return { validator };
}