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
      :type="props.type"
    />
    <small v-if="isError" class="text-danger">{{ props.error[0] }}</small>
  </div>
</template>
<script setup>
import { computed } from 'vue';
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
const isError = computed(() => props.error && props.error?.length > 0);
const format = val => {
  if (typeof props.transform == "function") return props.transform(val);

  else if (props.transform == "phone") return formatPhone(val);

  else if (props.transform == "document") return formatCnpjCpf(val);

  else if (props.transform == "date") return formatDate(val);
  
  return val;
}
</script>