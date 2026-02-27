<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";

const props = defineProps<{ content: string }>();

const html = computed(() => marked.parse(props.content || ""));
</script>

<template>
  <div class="markdown" v-html="html"></div>
</template>

<style>
.markdown h1 {
  font-size: 28px;
  margin-bottom: 12px;
}
.markdown p {
  line-height: 1.6;
  margin-bottom: 10px;
}
.markdown code {
  background: #f3f3f3;
  padding: 4px 6px;
  border-radius: 4px;
}
</style>