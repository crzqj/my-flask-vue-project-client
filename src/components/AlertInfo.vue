<template>
    <div>
      <div class="alert alert-success" role="alert">{{ message }}</div>
      <br/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    message: string;
  }>();
  </script>
