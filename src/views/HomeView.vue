<template>
  <div class="home-view">
    <h1>文档中心</h1>

    <!-- 搜索和筛选 -->
    <div class="filters">
      <el-input v-model="searchQuery" placeholder="搜索文档..." :prefix-icon="Search" clearable @input="handleSearch" />

      <el-select v-model="selectedCategory" placeholder="选择分类" clearable @change="handleCategoryChange">
        <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
      </el-select>
    </div>

    <div class="document-grid">
      <el-card
        v-for="doc in filteredDocuments"
        :key="doc.metadata.id"
        class="document-card"
        @click="navigateToDocument(doc.metadata.id)"
      >
        <template #header>
          <div class="card-header">
            <span>{{ doc.metadata.name }}</span>
            <el-tag v-if="doc.metadata.category" size="small">
              {{ doc.metadata.category }}
            </el-tag>
          </div>
        </template>

        <p class="description">{{ doc.metadata.description }}</p>

        <div v-if="doc.metadata.tags" class="tags">
          <el-tag v-for="tag in doc.metadata.tags.slice(0, 3)" :key="tag" size="small" type="info">
            {{ tag }}
          </el-tag>
          <span v-if="doc.metadata.tags.length > 3" class="more-tags"> +{{ doc.metadata.tags.length - 3 }} </span>
        </div>

        <div class="card-footer">
          <span v-if="doc.metadata.updatedAt" class="update-time"> 更新于 {{ doc.metadata.updatedAt }} </span>
          <el-rate v-if="doc.metadata.rating" :model-value="doc.metadata.rating" disabled size="small" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { documentService } from '@/lib/documentService'
import type { Document } from '@/generated/documents'

const router = useRouter()
const documents = ref<Document[]>([])
const categories = ref<string[]>([])
const searchQuery = ref('')
const selectedCategory = ref('')

const filteredDocuments = computed(() => {
  let result = documents.value

  // 分类筛选
  if (selectedCategory.value) {
    result = result.filter((doc) => doc.metadata.category === selectedCategory.value)
  }

  // 搜索筛选
  if (searchQuery.value) {
    result = documentService.searchDocuments(searchQuery.value)
    if (selectedCategory.value) {
      result = result.filter((doc) => doc.metadata.category === selectedCategory.value)
    }
  }

  return result
})

const navigateToDocument = (id: string) => {
  router.push(`/docs/${id}`)
}

const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
}

const handleCategoryChange = () => {
  // 分类筛选逻辑已在 computed 中处理
}

onMounted(() => {
  documents.value = documentService.getAllDocuments()
  categories.value = documentService.getCategories()
})
</script>

<style scoped>
.home-view {
  padding: 20px;
}

.filters {
  display: flex;
  gap: 16px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.filters .el-input {
  flex: 1;
  min-width: 200px;
}

.filters .el-select {
  width: 150px;
}

.document-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.document-card {
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.document-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description {
  color: var(--el-text-color-secondary);
  margin: 12px 0;
  line-height: 1.5;
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin: 12px 0;
}

.more-tags {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.update-time {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>
