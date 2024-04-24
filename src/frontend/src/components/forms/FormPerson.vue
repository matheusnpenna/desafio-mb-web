<template>
  <form class="form-welcome-component" @submit.prevent="onNext">
    <h1 class="mb-4">
      Pessoa {{ config.type }}
    </h1>

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

    <div class="flex items-center justify-between">
      <FormButton 
        variant="outline-primary"
        class="mr-8"
        fill
        @click="$emit('prev')"
      >
        Voltar
      </FormButton>
      <FormButton fill type="submit">
        Continuar
      </FormButton>
    </div>
  </form>
</template>
<script setup>
import { usePersonComponentConfig } from '@/composables/person';
import { useForm } from '@/composables/form';
import { watch } from 'vue';
import { useValidator } from '@/composables/validate';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
});

const { form, errors, resetErrors } = useForm(
  ["name", "document", "birth_date", "phone"], { ...props.modelValue }
);

const { config } = usePersonComponentConfig(props.modelValue.legal_nature);

const emit = defineEmits(['update:modelValue', 'prev', 'next'])

const { validator } = useValidator(config);


watch(form, val => {
  emit("update:modelValue", {
    ...props.modelValue,
    ...val
  });
  
  resetErrors();
});

const onNext = () => {
  const { validated_errors } = validator(form);

  for (const k in validated_errors) {
    errors[k] = validated_errors[k];
  }

  if (Object.keys(errors).find(k => !!errors[k].length)) return;

  emit('next');
}
</script>