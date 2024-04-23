<template>
  <div class="form-welcome-component">
    <h1 class="mb-4">Seja bem vindo(a)</h1>

    <FormInput
      id="email"
      label="Endereço de e-mail"
      v-model="state.form.email"
      :errors="state.errors.email"
      class="mb-4"
    />
    <FormRadioGroup 
      v-model="state.form.legal_nature" 
      class="mb-4"
      :options="[
        { label: 'Pessoal física', value: 'natural' },
        { label: 'Pessoal jurídica', value: 'legal' }
      ]" 
    />
    <form-button>Continuar</form-button>
  </div>
</template>
<script setup>
import { formFields } from '@/functions/helpers';
import { reactive, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['update:modelValue'])

const state = reactive(
  formFields(["email", "legal_nature"], { ...props.modelValue })
);

watch(state.form, val => {
  emit("update:modelValue", {
    ...props.modelValue,
    ...val
  });
  state.errors = { email: "", legal_nature: "" };
});

</script>