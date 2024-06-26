<template>
  <div class="form-group">
    <label :for="id" class="mb-2">{{ props.label }}</label>
    <div class="form-input-wrapper">
      <input 
        :id="id"
        class="form-control"
        :class="{ 'border-danger': isError }" 
        :value="props.modelValue" 
        :maxLength="props.maxLength"
        :autocomplete="props.autocomplete"
        @input="emit('update:modelValue', format($event.target.value))"
        :type="!show_password && props.type"
      />
      <button v-if="props.type == 'password'" class="btn btn-sm" type="button" @click.stop="show_password = !show_password">
        <IconEyeSlash v-if="show_password" />
        <IconEye v-else />
      </button>
    </div>
    <small v-if="isError" class="text-danger">{{ props.error[0] }}</small>
  </div>
</template>
<script setup>
import IconEye from "./icons/IconEye.vue";
import IconEyeSlash from "./icons/IconEyeSlash.vue";

import { computed, ref } from 'vue';
import { formatPhone, formatCnpjCpf, formatDate } from '@/functions/helpers';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ""
  },
  id: {
    type: String,
    default: "form-input-id",
    required: true
  },
  label: {
    type: String,
    default: "",
  },
  maxLength: {
    type: Number,
    default: 524288
  },
  autocomplete: {
    type: [String, Boolean],
    default: false
  },
  type: {
    type: String,
    default: "text",
    validator: val => [
      "text",
      "tel",
      "number",
      "password",
      "email",
    ].includes(val)
  },
  error: {
    type: Array,
    default: undefined
  },
  transform: {
    type: [String, Function],
    default: "",
  }
})
const emit = defineEmits(['update:modelValue'])
const show_password = ref(false);
const isError = computed(() => props.error && props.error?.length > 0);

const format = val => {
  if (typeof props.transform == "function") return props.transform(val);

  else if (props.transform == "phone") return formatPhone(val);

  else if (props.transform == "document") return formatCnpjCpf(val);

  else if (props.transform == "date") return formatDate(val);
  
  return val;
}
</script>