<script setup lang="ts">
</script>

<template>
  <FadeSlideTransition>
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
  </FadeSlideTransition>
</template>

<script lang="ts">
import FadeSlideTransition from "@/components/FadeSlideTransition.vue";
export default { components: { FadeSlideTransition } };
</script>

<style scoped>
body {
  background: #f7f7f5;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

input {
  border: none;
  background: transparent;
  font-size: 32px;
  font-weight: 600;
}

textarea {
  border: none;
  background: transparent;
  font-size: 16px;
  line-height: 1.8;
}
</style>