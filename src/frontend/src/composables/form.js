import { formFields } from "@/functions/helpers";
import { reactive } from "vue";

export function useForm(fields, defaults) {
  const INITIAL_FORM = formFields(fields, { ...defaults });

  const form = reactive(INITIAL_FORM.form);
  const errors = reactive(INITIAL_FORM.errors);

  const resetErrors = () => {
    for(let k in errors) {
      errors[k] = INITIAL_FORM.errors[k];
    }
  }

  return { form, errors, resetErrors };
}