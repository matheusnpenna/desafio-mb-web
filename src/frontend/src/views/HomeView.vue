<template>
  <section class="home-view">
    <div v-if="register_success" class="container">
      <FormSuccess @reset="reset" />
    </div>
    <div v-else class="container">
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
  </section>
</template>
<script setup>
import { reactive, ref } from "vue";

import FormPassword from '@/components/forms/FormPassword.vue';
import FormWelcome from '@/components/forms/FormWelcome.vue';
import FormPerson from '@/components/forms/FormPerson.vue';
import FormReview from '@/components/forms/FormReview.vue';

import { formFields } from "@/functions/helpers";
import { useAPI } from "@/composables/api";
import FormSuccess from "@/components/forms/FormSuccess.vue";
const { postRegister } = useAPI();
const register_success = ref(false);
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

const reset = () => {
  for (let k in { ...INITIAL_FORM }) state[k] = INITIAL_FORM[k];
  step_index.value = 1;
}

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
    if (data.status == 200) {
      register_success.value = true;
    } else if (data.status == 400) {
      for (let k in data) 
        state.errors[k] = data[k];
    }
  })
  .finally(() => {
    loading.value = false;
  })
}
</script>