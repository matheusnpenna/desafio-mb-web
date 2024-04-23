<template>
  <form class="form-welcome-component" @submit.prevent="onNext">
    <h1 class="mb-4">Senha de acesso</h1>

    <FormInput
      id="password"
      label="Sua senha"
      type="password"
      v-model="state.form.email"
      :error="state.errors.email"
      class="mb-4"
    />

    <div class="flex items-center justify-between">
      <FormButton 
        variant="outline-primary"
        class="mr-8"
      >
        Voltar
      </FormButton>
      <FormButton 
        type="submit"
        :disabled="!is_valid_fields"
      >
        Continuar
      </FormButton>
    </div>
  </form>
</template>
<script setup>
import { formFields, isValidPassword } from '@/functions/helpers';
import { computed, reactive, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['update:modelValue', 'prev', 'next'])

const state = reactive(
  formFields(["password"], { ...props.modelValue })
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
  if (!state.form.password?.length || !isValidPassword(state.form?.password)) {
    state.errors.password = ["Sua senha deve conter 8 dígitos, com pelo menos 1 número, 1 letra minúscula e 1 letra maiúscula."];
    return;
  }

  emit('next');
}
</script>