<template>
  <div class="form-group">
    <label :for="id" class="mb-2">{{ props.label }}</label>
    <input 
      :id="id"
      class="form-control"
      :class="{ 'border-danger': isError }" 
      :value="props.modelValue" 
      @input="emit('update:modelValue', $event.target.value)"
      :type="props.type"
    />
    <small v-if="isError" class="text-danger">{{ props.error[0] }}</small>
  </div>
</template>
<script setup>
import { computed } from 'vue';

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
  }
})
const emit = defineEmits(['update:modelValue'])
const isError = computed(() => props.error && props.error?.length > 0);
</script>