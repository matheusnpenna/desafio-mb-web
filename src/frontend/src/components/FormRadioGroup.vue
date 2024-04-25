<template>
  <div>
    <fieldset> 
      <div
        v-for="({ value, label }, i) in props.options"
        :key="`${i}`"
        class="flex items-center"
        :class="{ 'text-danger': isError }"
      > 
        <FormRadio :id="`${props.id}-${i}`" v-model="model" :label="label" :value="value" name="group1" class="mr-2" />
      </div>
    </fieldset>
    <small v-if="isError" class="text-danger">{{ props.error[0] }}</small>
  </div>
</template>
<script setup>
import FormRadio from './FormRadio.vue';
import { computed, watch } from 'vue';

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
  },
  error: {
    type: Array,
    default: undefined
  }
})
const emit = defineEmits(["update:modelValue"]);
const model = defineModel();
watch(model, v => emit("update:modelValue", v))
const isError = computed(() => props.error && props.error?.length > 0);
</script>
<style scoped>
fieldset {
  border: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
}
</style>