<template>
  <form class="form-welcome-component" @submit.prevent="onNext">
    <h1 class="mb-4">Seja bem vindo(a)</h1>

    <FormInput
      id="email"
      label="Endereço de e-mail"
      v-model="state.form.email"
      :error="state.errors.email"
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
    <FormButton 
      type="submit"
      :disabled="!is_valid_fields"
    >
      Continuar
    </FormButton>
  </form>
</template>
<script setup>
import { formFields, isValidEmail } from '@/functions/helpers';
import { computed, reactive, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['update:modelValue', 'next'])

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

const is_valid_fields = computed(() => !!state?.form?.email?.length && !!state?.form?.legal_nature?.length);

const onNext = () => {
  console.log("TRIGGE")
  if (!state.form.email?.length || !isValidEmail(state.form?.email)) {
    state.errors.email = ["Digite um e-mail válido"];
    return;
  }

  emit('next');
}
</script>