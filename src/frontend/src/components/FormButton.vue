<template>
  <button :class="`btn btn-${variant} ${classes}`" :aria-describedby="text" @click.stop="emit('click')">
    <slot>{{ text }}</slot>
  </button>
</template>
<script setup>
const { variant, text, classes } = defineProps({
  variant: {
    type: String,
    default: "primary"
  },
  class: String,
  text: String
})
const emit = defineEmits(['click'])
</script>