<template>
  <form class="form-welcome-component" @submit.prevent="onNext">
    <h1 class="mb-4">Senha de acesso</h1>

    <FormInput
      id="password"
      label="Sua senha"
      type="password"
      v-model="form.password"
      :error="errors.password"
      class="mb-8"
    />

    <div class="flex items-center justify-between">
      <FormButton 
        variant="outline-primary"
        class="mr-8"
        fill
        @click="emit('prev')"
      >
        Voltar
      </FormButton>
      <FormButton 
        type="submit"
        fill
      >
        Continuar
      </FormButton>
    </div>
  </form>
</template>
<script setup>
import { useForm } from '@/composables/form';
import { isValidPassword } from '@/functions/helpers';
import { watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['update:modelValue', 'prev', 'next'])

const { form, errors, resetErrors } = useForm(
  ["password"], { ...props.modelValue }
);

watch(form, val => {
  emit("update:modelValue", {
    ...props.modelValue,
    ...val
  });
  
  resetErrors();
});

const onNext = () => {
  if (!form.password?.length || !isValidPassword(form?.password)) {
    errors.password = ["Sua senha deve conter 8 dígitos, com pelo menos 1 número, 1 letra minúscula e 1 letra maiúscula."];
    return;
  }

  emit('next');
}
</script>