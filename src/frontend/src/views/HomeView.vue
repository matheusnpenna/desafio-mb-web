<template>
  <section class="home-view">
    <div class="container mb-8">
      <p>Etapa <span class="text-primary">{{ step_index }}</span> de {{ step_count }}</p>
      <component 
        :is="form_components[step_index]" 
        v-model="form"
        :errors="errors"
        @prev="prev" 
        @next="next"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from "vue";

import FormPassword from '@/components/forms/FormPassword.vue';
import FormWelcome from '@/components/forms/FormWelcome.vue';
import FormPerson from '@/components/forms/FormPerson.vue';
import FormReview from '@/components/forms/FormReview.vue';

import { useForm } from "@/composables/form";
import { useAPI } from "@/composables/api";
const { postRegister } = useAPI();
const loading = ref(false);
const step_index = ref(1);

const { form } = useForm(
  [
    "name",
    "email",
    "legal_nature",
    "document",
    "birth_date",
    "phone",
    "password"
  ]
);

const form_components = computed(() => ({
  1: FormWelcome,
  2: FormPerson,
  3: FormPassword,
  4: FormReview
}));

const step_count = Object.keys(form_components.value).length;

const next = () => { 
  if (step_index.value < step_count) {
    step_index.value += 1 
  }
};

const prev = () => {
  if (step_index.value > 0) {
    step_index.value -= 1 
  }
};

const onSubmit = () => {
  loading.value = true;

  postRegister(form)
  .then(data => {
    console.log("SUCCESS REQUEST", data);
  })
  .catch(e => {
    console.log("ERROR REQUEST", e);
  })
  .finally(() => {
    loading.value = false;
  })
}
</script>