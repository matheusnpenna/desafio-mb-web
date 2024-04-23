<template>
  <fieldset>
    <div
      v-for="({ value, label }, i) in props.options"
      :key="`${i}`"
      class="flex items-center"
    >
      <input
        :id="`${props.id}-${i}`"
        v-model="model" 
        type="radio" 
        :value="value"
        name="group1"
        class="mr-2"
      />
      <label :for="`${props.id}-${i}`">{{ label }}</label>
    </div>
  </fieldset>
</template>
<script setup>
import { watch } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: "radio-group-input-id"
  },
  modelValue: {
    type: String,
    default: ""
  },
  options: {
    type: Array,
    default: () => [],
    validators: list => !list.find(o => !o.value || !o.label)
  }
})
const emit = defineEmits(["update:modelValue"]);
const model = defineModel();
watch(model, v => emit("update:modelValue", v))
</script>
<style scoped>
fieldset {
  border: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
}
</style>