<template>
  <div>
    <div class="alert alert-success" role="alert">{{ message }}</div>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlertInfo",
  props: {
    message: String,
  },
});
</script>
