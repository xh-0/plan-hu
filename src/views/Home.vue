<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useIssueCrud } from "../../src/composables/useIssueCrud";
import { searchList, sortByDate, paginate } from "../../src/utils/helpers";

const { getList, createItem, updateItem, deleteItem } = useIssueCrud();

const list = ref<any[]>([]);
const current = ref<any>({});
const keyword = ref("");
const page = ref(1);
const pageSize = 6;
const asc = ref(false);

onMounted(async () => {
  list.value = await getList();
});

const filtered = computed(() => {
  let data = searchList(list.value, keyword.value);
  data = sortByDate(data, asc.value);
  return paginate(data, page.value, pageSize);
});

const selectItem = (item: any) => {
  current.value = { ...item };
};

const saveItem = async () => {
  if (!current.value.id) {
    await createItem(current.value.title, current.value.content);
  } else {
    await updateItem(
      current.value.id,
      current.value.title,
      current.value.content
    );
  }
  list.value = await getList();
};
</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <input v-model="keyword" placeholder="Search..." />
      <button @click="asc = !asc">排序</button>

      <div
        v-for="item in filtered"
        :key="item.id"
        class="card"
        @click="selectItem(item)"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.created_at }}</p>
      </div>
    </div>

    <div class="editor">
      <input v-model="current.title" placeholder="Title" />
      <textarea v-model="current.content" />
      <button @click="saveItem">保存</button>
      <button @click="deleteItem(current.id)">删除</button>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #f7f7f5;
}

.sidebar {
  width: 320px;
  padding: 20px;
  border-right: 1px solid #eaeaea;
  overflow-y: auto;
}

.card {
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: 0.2s;
}

.card:hover {
  background: #f1f1f1;
}

.editor {
  flex: 1;
  padding: 40px;
}

.editor input {
  font-size: 28px;
  border: none;
  outline: none;
  width: 100%;
  margin-bottom: 20px;
  background: transparent;
}

.editor textarea {
  width: 100%;
  height: 60vh;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  background: transparent;
}
</style>