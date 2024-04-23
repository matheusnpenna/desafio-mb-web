<template>
  <button 
    :class="`btn btn-${variant} ${classes}`" 
    :aria-describedby="text" 
    :type="type"
    @click.stop="emit('click')"
  >
    <slot>{{ text }}</slot>
  </button>
</template>
<script setup>
const { variant, text, classes, type } = defineProps({
  variant: {
    type: String,
    default: "primary"
  },
  classes: {
    type: String,
    default: ""
  },
  text: String,
  type: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['click'])
</script>