<template>
  <form class="form-welcome-component" @submit.prevent="onNext">
    <h1 class="mb-4">Pessoa Física</h1>

    <FormInput
      id="name"
      label="Nome"
      v-model="state.form.name"
      :error="state.errors.name"
      class="mb-4"
    />

    <FormInput
      id="cpf"
      label="CPF"
      v-model="state.form.document"
      :error="state.errors.document"
      transform="document"
      class="mb-4"
      :max-length="11"
    />

    <FormInput
      id="birth_date"
      label="Data de nascimento"
      transform="date"
      v-model="state.form.birth_date"
      :error="state.errors.birth_date"
      class="mb-4"
    />

    <FormInput
      id="phone"
      label="Telefone"
      type="tel"
      transform="phone"
      v-model="state.form.phone"
      :error="state.errors.phone"
      :max-length="15"
      class="mb-8"
    />

    <div class="flex items-center justify-between">
      <FormButton 
        variant="outline-primary"
        class="mr-8"
      >
        Cancelar
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
import { formFields, isValidCPF, removeMask } from '@/functions/helpers';
import { computed, reactive, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['update:modelValue', 'next'])

const state = reactive(
  formFields(["name", "document", "birth_date", "phone"], { ...props.modelValue })
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
  if (!state.form.name?.length) {
    state.errors.name = ["Digite um nome válido"];
    return;
  }

  if (!state.form.document?.length || !isValidCPF(state.form.document)) {
    state.errors.document = ["Digite um CPF válido"];
    return;
  }

  if (!state.form.birth_date?.length || removeMask(state.form.birth_date).length !== 8) {
    state.errors.birth_date = ["Digite uma data de nascimento válida"];
    return;
  }

  if (!state.form.phone?.length || removeMask(state.form.phone).length !== 8) {
    state.errors.phone = ["Digite um telefone válido. Ex: (DDD) 9 9999-9999"];
    return;
  }

  emit('next');
}
</script>