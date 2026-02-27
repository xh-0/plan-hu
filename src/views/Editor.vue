<template>
  <div class="editor-container">
    <div class="header">
      <router-link to="/" class="back-button">← 返回列表</router-link>
      <button @click="handleSave" class="save-button" :disabled="loading">
        {{ loading ? "保存中..." : "保存" }}
      </button>
    </div>

    <div class="loading" v-if="loading && !isLoadingContent">保存中...</div>

    <div class="loading" v-else-if="isLoadingContent">加载中...</div>

    <div class="form" v-else>
      <input
        v-model="title"
        type="text"
        class="title-input"
        placeholder="输入标题..."
      />
      <textarea
        v-model="content"
        class="content-input"
        placeholder="输入内容..."
        rows="10"
      ></textarea>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useIssueCrud } from "../composables/useIssueCrud";
import type { IssueItem } from "../composables/useIssueCrud";

const router = useRouter();
const route = useRoute();
const { createItem, updateItem, getList } = useIssueCrud();

const id = route.params.id as string;
const isNew = !id;

const title = ref("");
const content = ref("");
const loading = ref(false);
const isLoadingContent = ref(false);

const loadContent = async () => {
  if (!isNew) {
    try {
      isLoadingContent.value = true;
      const items = await getList();
      const item = items.find((i: IssueItem) => i.id === parseInt(id));
      if (item) {
        title.value = item.title;
        content.value = item.content;
      }
    } catch (error) {
      console.error("加载内容失败:", error);
    } finally {
      isLoadingContent.value = false;
    }
  }
};

const handleSave = async () => {
  if (!title.value.trim()) {
    alert("请输入标题");
    return;
  }

  try {
    loading.value = true;
    if (isNew) {
      await createItem(title.value, content.value);
    } else {
      await updateItem(parseInt(id), title.value, content.value);
    }
    // 保存成功后返回列表
    router.push("/");
  } catch (error) {
    console.error("保存失败:", error);
    alert("保存失败，请重试");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadContent();
});
</script>

<style scoped lang='less'>
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    .back-button {
      color: #333;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;

      &:hover {
        color: #2ecc71;
      }
    }

    .save-button {
      background-color: #2ecc71;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover:not(:disabled) {
        background-color: #27ae60;
      }

      &:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
      }
    }
  }

  .loading {
    text-align: center;
    padding: 40px 0;
    color: #666;
  }

  .form {
    .title-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #2ecc71;
        box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.1);
      }

      &::placeholder {
        color: #999;
      }
    }

    .content-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.6;
      outline: none;
      resize: vertical;
      transition: border-color 0.2s;
      font-family: inherit;

      &:focus {
        border-color: #2ecc71;
        box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.1);
      }

      &::placeholder {
        color: #999;
      }
    }
  }
}
</style>
