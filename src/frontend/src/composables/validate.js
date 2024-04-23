import { removeMask } from '@/functions/helpers';

export function useValidator(config) {

  const validator = (form_data) => {
    const validated_errors = {};
    for (let key in form_data) {
      if (key == "name" && (!form_data[key] || !form_data[key].length)) {
        validated_errors.name = [`Digite ${config.name_error_text}`];
      }

      else if (key == "document" && (!form_data[key] || !form_data[key].length || !config.document_validator(form_data[key]))) {
        console.log(form_data[key], config.document_validator(form_data[key]));
        validated_errors.document = [`Digite um ${config.document} válido`];
      }
    
      else if (key == "birth_date" && (!form_data[key] || !form_data[key].length || removeMask(form_data[key]).length !== 8)) {
        validated_errors.birth_date = [`Digite uma ${config.date_label.toLowerCase()} válida`];
      }
    
      else if (key == "phone" && (!form_data[key] || !form_data[key].length || removeMask(form_data[key]).length != 11)) {
        validated_errors.phone = ["Digite um telefone válido. Ex: (99) 999999999"];
      }
    }

    return { validated_errors };
  }
  
  return { validator };
}