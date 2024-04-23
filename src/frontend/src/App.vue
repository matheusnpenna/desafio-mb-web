
<template>
  <default-layout>
    <component :is="HomeView"></component>
  </default-layout>
</template>
<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomeView from '@/views/HomeView.vue'
</script>