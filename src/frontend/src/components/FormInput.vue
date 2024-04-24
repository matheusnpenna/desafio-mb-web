<template>
  <div class="form-group">
    <label :for="id" class="mb-2">{{ props.label }}</label>
    <input 
      :id="id"
      class="form-control"
      :class="{ 'border-danger': isError }" 
      :value="props.modelValue" 
      :maxLength="props.maxLength"
      @input="emit('update:modelValue', format($event.target.value))"
      :type="!show_password && props.type"
    />
    <small v-if="isError" class="text-danger">{{ props.error[0] }}</small>
    <button v-if="props.type == 'password'" class="btn btn-password-visibility btn-sm" type="button" @click.stop="show_password = !show_password">
      <IconEyeSlash v-if="show_password" />
      <IconEye v-else />
    </button>
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
<style scoped>
.form-group {
  position: relative;
}

.btn-password-visibility {
  position: absolute;
  left: 98%;
  top: 90%;
  transform: translateY(-90%) translateX(-98%);
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    height: 1rem;
    width: 1rem;
  }
}

</style>