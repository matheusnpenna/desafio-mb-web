<template>
  <form class="form-welcome-component" @submit.prevent="onSubmit">
    <h1 class="mb-4">
      Revise suas informações
    </h1>


    <FormInput
      id="email"
      label="Endereço de e-mail"
      v-model="form.email"
      :error="errors.email"
      class="mb-4"
    />

    <FormInput
      id="name"
      :label="config.name_label"
      v-model="form.name"
      :error="errors.name"
      class="mb-4"
    />

    <FormInput
      id="cpf"
      :label="config.document"
      v-model="form.document"
      :error="errors.document"
      transform="document"
      class="mb-4"
      :max-length="config.document_max_length"
    />

    <FormInput
      id="birth_date"
      :label="config.date_label"
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
        @click="$emit('prev')"
      >
        Voltar
      </FormButton>
      <FormButton 
        type="submit"
        fill
        :loading="loading"
      >
        Cadastrar
      </FormButton>
    </div>
  </form>
</template>
<script setup>
import { usePersonComponentConfig } from '@/composables/person';
import { useValidator } from '@/composables/validate';
import { useForm } from '@/composables/form';
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['update:modelValue', 'prev', 'submit'])

const { form, errors, resetErrors } = useForm(["email", "name", "document", "birth_date", "phone", "password"], { ...props.modelValue });
const { config } = usePersonComponentConfig(props.modelValue.legal_nature);
const { validator } = useValidator(config);

const loading = ref(false);

watch(form, val => {
  emit("update:modelValue", {
    ...props.modelValue,
    ...val
  });
  
  resetErrors();
});

const onSubmit = () => {
  const { validated_errors } = validator(form);

  for (const k in validated_errors) {
    errors[k] = validated_errors[k];
  }

  if (Object.keys(errors).find(k => !!errors[k].length)) return;

  emit('submit');
}
</script>