<template>
  <label class="form-radio-component form-radio-control" :data-test-id="`radio-input-${props.value}`">
    {{ label }}
    <input 
      :value="props.value" 
      @input="emit('update:modelValue', $event.target.value)" 
      type="radio" 
      :name="props.name" 
    />
    <div class="form-radio-indicator"></div>
  </label>
</template>
<script setup>
const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    default: ""
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(['update:modelValue'])
</script>
<style scoped>
.form-radio-component {
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 5px;
  padding-top: 1px;
  cursor: pointer;
}

.form-radio-component input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.form-radio-indicator {
  position: absolute;
  top: 6px;
  left: 0;
  height: 15px;
  width: 15px;
  border: 1px solid var(--black);
}

.form-radio-component input:checked~.form-radio-indicator {
  background: transparent;
}


.form-radio-component input:disabled~.form-radio-indicator {
  background: transparent;
  opacity: 0.6;
  pointer-events: none;
}

.form-radio-indicator:after {
  box-sizing: unset;
  content: '';
  position: absolute;
}

.form-radio-component input:checked~.form-radio-indicator:after {
  display: block;
  background-color: var(--black);
}

.form-radio-control .form-radio-indicator {
  border-radius: 50%;
}

.form-radio-control .form-radio-indicator:after {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid var(--black);
}

.form-radio-control input:disabled~.form-radio-indicator:after {
  background: #7b7b7b;
}

.form-radio-control .form-radio-indicator::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 4.5rem;
  height: 4.5rem;
  margin-left: -1.3rem;
  margin-top: -1.3rem;
  background: #000;
  border-radius: 3rem;
  opacity: 0.6;
  z-index: 99999;
  transform: scale(0);
}
</style>