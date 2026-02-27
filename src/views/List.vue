<template>
  <div class="list-container">
    <div class="header">
      <h1>Notion 风格列表</h1>
      <router-link to="/new" class="add-button">+ 新建</router-link>
    </div>

    <div class="loading" v-if="loading">加载中...</div>

    <div class="empty" v-else-if="items.length === 0">
      暂无内容，点击右上角新建按钮添加
    </div>

    <div class="items" v-else>
      <div v-for="item in items" :key="item.id" class="item">
        <div class="item-content">
          <router-link :to="`/note/${item.id}`" class="item-title">{{
            item.title
          }}</router-link>
          <div class="item-meta">{{ formatDate(item.created_at) }}</div>
        </div>
        <div class="item-actions">
          <button @click="handleDelete(item.id)" class="delete-button">
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from "vue";
import { useIssueCrud } from "../composables/useIssueCrud";
import type { IssueItem } from "../composables/useIssueCrud";
const { getList, deleteItem } = useIssueCrud();

const items = ref<IssueItem[]>([]);
const loading = ref(true);

const loadItems = async () => {
  try {
    loading.value = true;
    console.log("开始加载数据...");
    items.value = await getList();
    console.log("加载数据成功:", items.value);
  } catch (error) {
    console.error("加载数据失败:", error);
    console.error("错误详情:", JSON.stringify(error, null, 2));
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (id: number) => {
  if (confirm("确定要删除这个项目吗？")) {
    try {
      await deleteItem(id);
      // 重新加载列表
      await loadItems();
    } catch (error) {
      console.error("删除失败:", error);
    }
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

onMounted(() => {
  loadItems();
});
</script>

<style scoped lang='less'>
.list-container {
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

    h1 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .add-button {
      background-color: #2ecc71;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background-color: #27ae60;
      }
    }
  }

  .loading {
    text-align: center;
    padding: 40px 0;
    color: #666;
  }

  .empty {
    text-align: center;
    padding: 40px 0;
    color: #999;
    font-size: 16px;
  }

  .items {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      margin-bottom: 12px;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .item-content {
        flex: 1;

        .item-title {
          font-size: 16px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          margin-bottom: 4px;
          display: block;

          &:hover {
            color: #2ecc71;
          }
        }

        .item-meta {
          font-size: 12px;
          color: #999;
        }
      }

      .item-actions {
        .delete-button {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.2s;

          &:hover {
            background-color: #c0392b;
          }
        }
      }
    }
  }
}
</style>
