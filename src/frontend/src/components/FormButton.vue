<template>
  <button 
    class="btn"
    :class="classObj" 
    :aria-describedby="text" 
    :type="type"
    @click.stop="emit('click')"
  >
    <LoadingSpinner v-if="loading" />
    <slot v-else>{{ text }}</slot>
  </button>
</template>
<script setup>
import { computed } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';

const { variant, text, fill, loading, type } = defineProps({
  variant: {
    type: String,
    default: "primary"
  },
  text: String,
  type: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fill: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['click'])
const classObj = computed(() => ({
  [`btn-${variant}`]: true,
  'btn-fill': fill
}))
</script>