<template>
  <section class="home-view">
    <div class="container mb-8">
      <p>Etapa <span class="text-primary">{{ step_index }}</span> de {{ step_count }}</p>
      <component 
        :is="form_components[step_index]" 
        v-model="state.form"
        @prev="prev" 
        @next="next"
      />
    </div>
  </section>
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import FormPassword from '@/components/forms/FormPassword.vue';
import FormWelcome from '@/components/forms/FormWelcome.vue';
import FormPerson from '@/components/forms/FormPerson.vue';
import FormReview from '@/components/forms/FormReview.vue';

import { formFields } from "@/functions/helpers";

const state = reactive(formFields([
  "name",
  "email",
  "legal_nature",
  "document",
  "birth_date",
  "phone",
  "corporate_reason",
  "password",
]));

const form_components = computed(() => ({
  1: FormWelcome,
  2: FormPerson,
  3: FormPassword,
  4: FormReview
}));

const step_index = ref(1);

const step_count = Object.keys(form_components.value).length;

const next = () => { 
  if (step_index.value < step_count - 1) {
    step_index.value += 1 
  }
};
const prev = () => {
  if (step_index.value > 0) {
    step_index.value -= 1 
  }
};
</script>