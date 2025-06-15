<template>
  <div class="document-viewer">
    <div v-if="error" class="error">
      <el-icon><WarningFilled /></el-icon>
      {{ error }}
    </div>
    
    <div v-else-if="document" class="document-content">
      <!-- 文档元数据 -->
      <div class="document-header">
        <h1>{{ document.metadata.name }}</h1>
        <p class="description">{{ document.metadata.description }}</p>
        
        <div class="metadata">
          <div v-if="document.metadata.tags" class="tags">
            <el-tag v-for="tag in document.metadata.tags" :key="tag" size="small">
              {{ tag }}
            </el-tag>
          </div>
          
          <div class="links">
            <el-button 
              v-if="document.metadata.website" 
              :icon="Link" 
              size="small" 
              @click="openLink(document.metadata.website!)"
            >
              官网
            </el-button>
            <el-button 
              v-if="document.metadata.repo" 
              :icon="Link" 
              size="small" 
              @click="openLink(document.metadata.repo!)"
            >
              仓库
            </el-button>
          </div>
        </div>
      </div>
      
      <!-- 文档内容 -->
      <div class="markdown-content" v-html="document.html"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { WarningFilled, Link } from '@element-plus/icons-vue'
import { documentService } from '@/lib/documentService'
import type { Document } from '@/generated/documents'

const route = useRoute()
const error = ref('')
const document = ref<Document | null>(null)

const loadDocument = (id: string) => {
  error.value = ''
  
  try {
    const doc = documentService.getDocument(id)
    if (!doc) {
      error.value = '文档未找到'
      document.value = null
    } else {
      document.value = doc
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载文档失败'
    document.value = null
  }
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}

onMounted(() => {
  const id = route.params.id as string
  if (id) {
    loadDocument(id)
  }
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadDocument(newId as string)
    }
  }
)
</script>

<style scoped>
/* 样式保持不变 */
.document-viewer {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.error {
  text-align: center;
  padding: 40px;
  color: var(--el-color-danger);
}

.document-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color);
}

.document-header h1 {
  margin: 0 0 10px 0;
  color: var(--el-text-color-primary);
}

.description {
  color: var(--el-text-color-secondary);
  font-size: 16px;
  margin: 0 0 20px 0;
}

.metadata {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.links {
  display: flex;
  gap: 10px;
}

.markdown-content {
  line-height: 1.6;
}

/* Markdown 样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin: 24px 0 16px 0;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid var(--el-border-color);
  padding-bottom: 8px;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid var(--el-border-color-lighter);
  padding-bottom: 6px;
}

.markdown-content :deep(p) {
  margin: 16px 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.markdown-content :deep(li) {
  margin: 4px 0;
}

.markdown-content :deep(blockquote) {
  margin: 16px 0;
  padding: 0 16px;
  border-left: 4px solid var(--el-color-primary);
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-secondary);
}

.markdown-content :deep(code) {
  background-color: var(--el-fill-color-light);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: var(--el-fill-color-light);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
}
</style>