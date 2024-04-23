<template>
  <form class="form-welcome-component" @submit.prevent="onNext">
    <h1 class="mb-4">
      Pessoa {{ person_info.type }}
    </h1>

    <FormInput
      id="name"
      :label="person_info.name_label"
      v-model="form.name"
      :error="errors.name"
      class="mb-4"
    />

    <FormInput
      id="cpf"
      :label="person_info.document"
      v-model="form.document"
      :error="errors.document"
      transform="document"
      class="mb-4"
      :max-length="11"
    />

    <FormInput
      id="birth_date"
      :label="person_info.date_label"
      transform="date"
      v-model="form.birth_date"
      :error="errors.birth_date"
      :max-length="10"
      class="mb-4"
    />

    <FormInput
      id="phone"
      label="Telefone"
      type="tel"
      transform="phone"
      v-model="form.phone"
      :error="errors.phone"
      :max-length="15"
      class="mb-8"
    />

    <div class="flex items-center justify-between">
      <FormButton 
        variant="outline-primary"
        class="mr-8"
        @click="$emit('prev')"
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

const person_info = computed(() => 
  props.modelValue.legal_nature == "natural" ? 
  {
    type: "Física",
    document: "CPF",
    name_label: "Nome",
    date_label: "Data de nascimento"
  } : 
  {
    type: "Jurídica",
    document: "CNPJ",
    name_label: "Razão Social",
    date_label: "Data de abertura"
  }
);

const emit = defineEmits(['update:modelValue', 'prev', 'next'])

const INITIAL_FORM = formFields(["name", "document", "birth_date", "phone"], { ...props.modelValue });

const form = reactive(INITIAL_FORM.form);
const errors = reactive(INITIAL_FORM.errors);

watch(form, val => {
  emit("update:modelValue", {
    ...props.modelValue,
    ...val
  });
  
  for (let k in errors) {
    errors[k] = INITIAL_FORM.errors[k];
  };
});

const is_valid_fields = computed(() => !!form?.email?.length && !!form?.legal_nature?.length);

const onNext = () => {
  if (!form.name?.length) {
    errors.name = ["Digite um nome válido"];
    return;
  }

  if (!form.document?.length || !isValidCPF(form.document)) {
    errors.document = ["Digite um CNPJ válido"];
    return;
  }

  if (!form.birth_date?.length || removeMask(form.birth_date).length !== 8) {
    errors.birth_date = ["Digite uma data de abertura válida"];
    return;
  }

  if (!form.phone?.length || removeMask(form.phone).length !== 8) {
    errors.phone = ["Digite um telefone válido. Ex: (DDD) 9 9999-9999"];
    return;
  }

  emit('next');
}
</script>