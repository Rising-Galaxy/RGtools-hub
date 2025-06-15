import type { Document } from '@/generated/documents'
import {
  documentsMap,
  documents,
  getDocument,
  getAllDocuments,
  getDocumentsByCategory,
  getDocumentsByTag,
} from '@/generated/documents'

// 预处理的文档服务
class DocumentService {
  // 获取单个文档
  getDocument(id: string): Document | null {
    return getDocument(id)
  }

  // 获取所有文档
  getAllDocuments(): Document[] {
    return getAllDocuments()
  }

  // 根据分类获取文档
  getDocumentsByCategory(category: string): Document[] {
    return getDocumentsByCategory(category)
  }

  // 根据标签获取文档
  getDocumentsByTag(tag: string): Document[] {
    return getDocumentsByTag(tag)
  }

  // 搜索文档
  searchDocuments(query: string): Document[] {
    const lowerQuery = query.toLowerCase()
    return documents.filter(
      (doc) =>
        doc.metadata.name.toLowerCase().includes(lowerQuery) ||
        doc.metadata.description.toLowerCase().includes(lowerQuery) ||
        doc.content.toLowerCase().includes(lowerQuery) ||
        (doc.metadata.tags && doc.metadata.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))),
    )
  }

  // 获取所有分类
  getCategories(): string[] {
    const categories = new Set<string>()
    documents.forEach((doc) => {
      if (doc.metadata.category) {
        categories.add(doc.metadata.category)
      }
    })
    return Array.from(categories).sort()
  }

  // 获取所有标签
  getTags(): string[] {
    const tags = new Set<string>()
    documents.forEach((doc) => {
      if (doc.metadata.tags) {
        doc.metadata.tags.forEach((tag) => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }
}

export const documentService = new DocumentService()
