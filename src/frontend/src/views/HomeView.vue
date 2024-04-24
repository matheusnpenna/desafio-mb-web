<template>
  <section class="home-view">
    <div class="container mb-8">
      <p>Etapa <span class="text-primary">{{ step_index }}</span> de {{ step_count }}</p>
      <component 
        :is="FORM_COMPONENT_MAP[step_index]" 
        v-model="state.form"
        :errors="state.errors"
        :loading="loading"
        @prev="prev" 
        @next="next"
        @onSubmit="onSubmit"
      />
    </div>
    {{ state.form }}
  </section>
</template>
<script setup>
import { reactive, ref, watch } from "vue";

import FormPassword from '@/components/forms/FormPassword.vue';
import FormWelcome from '@/components/forms/FormWelcome.vue';
import FormPerson from '@/components/forms/FormPerson.vue';
import FormReview from '@/components/forms/FormReview.vue';

import { useAPI } from "@/composables/api";
import { formFields } from "@/functions/helpers";
const { postRegister } = useAPI();
const loading = ref(false);
const step_index = ref(1);

const INITIAL_FORM = formFields(
  [
    "name",
    "email",
    "legal_nature",
    "document",
    "birth_date",
    "phone",
    "password"
  ])

const state = reactive(INITIAL_FORM);

const FORM_COMPONENT_MAP = {
  1: FormWelcome,
  2: FormPerson,
  3: FormPassword,
  4: FormReview
};

const step_count = Object.keys(FORM_COMPONENT_MAP).length;

watch(state.form, v => {
  console.log("FORM CHANGES", v);
})

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
  postRegister(state.form)
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