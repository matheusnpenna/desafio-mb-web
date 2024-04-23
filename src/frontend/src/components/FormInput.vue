<template>
  <div class="form-group">
    <label :for="id" class="mb-2">{{ props.label }}</label>
    <input 
      :id="id"
      class="form-control" 
      :value="props.modelValue" 
      @input="emit('update:modelValue', $event.target.value)"
      :type="props.type"
    />
  </div>
</template>
<script setup>
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
  }
})
const emit = defineEmits(['update:modelValue'])

</script>