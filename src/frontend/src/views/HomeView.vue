<template>
  <section class="home-view">
    <div class="container">
      <p>Etapa <span class="text-primary">{{ step_index }}</span> de {{ step_count }}</p>
      <component 
        :is="form_components[step_index]" 
        v-model="form"
        @prev="prev" 
        @next="next"
      />
    </div>
  </section>
</template>
<script setup>
import { reactive, ref } from "vue";
import FormLegalPerson from '@/components/forms/FormLegalPerson.vue';
import FormNaturalPerson from '@/components/forms/FormNaturalPerson.vue';
import FormPassword from '@/components/forms/FormPassword.vue';
import FormWelcome from '@/components/forms/FormWelcome.vue';
import FormReview from '@/components/forms/FormReview.vue';

import { formFields } from "@/functions/helpers";


const form_components = {
  1: FormWelcome,
  2: FormLegalPerson,
  3: FormNaturalPerson,
  4: FormPassword,
  5: FormReview
};

const form = reactive(formFields([
  "name",
  "email",
  "legal_nature",
  "document",
  "birth_date",
  "phone",
  "corporate_reason",
  "password",
]));

const step_index = ref(1);

const step_count = Object.keys(form_components).length;

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

<style scoped>
.home-view {}
</style>