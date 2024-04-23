<template>
  <form class="form-welcome-component" @submit.prevent="onNext">
    <h1 class="mb-4">Seja bem vindo(a)</h1>

    <FormInput
      id="email"
      label="Endereço de e-mail"
      v-model="form.email"
      :error="errors.email"
      class="mb-4"
    />
    <FormRadioGroup 
      v-model="form.legal_nature" 
      :error="errors.legal_nature"
      class="mb-4"
      :options="[
        { label: 'Pessoal física', value: 'natural' },
        { label: 'Pessoal jurídica', value: 'legal' }
      ]" 
    />
    <FormButton 
      type="submit"
    >
      Continuar
    </FormButton>
  </form>
</template>
<script setup>
import { isValidEmail } from '@/functions/helpers';
import { useForm } from '@/composables/form';
import { watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['update:modelValue', 'next'])

const { form, errors, resetErrors } = useForm(
  ["email", "legal_nature"], { ...props.modelValue }
);

watch(form, val => {
  emit("update:modelValue", {
    ...props.modelValue,
    ...val
  });
  
  resetErrors();
});

const onNext = () => {
  if (!form.email?.length || !isValidEmail(form?.email)) {
    errors.email = ["Digite um e-mail válido"];
    return;
  }

  if (!form.legal_nature?.length) {
    errors.legal_nature = ["Escolha o tipo de pessoa"];
    return;
  }

  emit('next');
}
</script>