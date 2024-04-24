<template>
  <div class="form-success-feedback">
    <h1 class="text-center mb-8">Registro concluído</h1>
    <div class="text-center text-primary mb-8">
      <IconCheckCircle />
    </div>
    <FormButton 
      variant="outline-primary"
      class="mr-8"
      fill
      @click="emit('reset')"
    >
      Voltar para o início
    </FormButton>
  </div>
</template>
<script setup>
import IconCheckCircle from "@/components/icons/IconCheckCircle.vue";
const emit = defineEmits(['reset']);
</script>