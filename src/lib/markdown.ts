import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import matter from 'gray-matter'

export interface DocumentMetadata {
  id: string
  name: string
  description: string
  tags?: string[]
  category?: string
  rating?: number
  website?: string
  repo?: string
  updatedAt?: string
}

export interface Document {
  metadata: DocumentMetadata
  content: string
  html: string
}

// 处理 markdown 内容（仅用于浏览器端）
export async function processMarkdownContent(markdownContent: string): Promise<{ content: string; html: string; metadata: DocumentMetadata }> {
  const { data, content } = matter(markdownContent)
  
  // 使用 remark 处理 markdown
  const result = await remark()
    .use(remarkGfm) // 支持 GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // 转换为 HTML AST
    .use(rehypeRaw) // 支持原始 HTML
    .use(rehypeSanitize) // 安全处理
    .use(rehypeStringify) // 转换为 HTML 字符串
    .process(content)
  
  return {
    metadata: data as DocumentMetadata,
    content,
    html: String(result)
  }
}

// 如果需要在浏览器端动态处理 markdown，可以使用这个函数
export async function createDocumentFromMarkdown(id: string, markdownContent: string): Promise<Document> {
  const { metadata, content, html } = await processMarkdownContent(markdownContent)
  
  return {
    metadata: {
      ...metadata,
      id  // 将 id 放在展开操作之后，这样会覆盖 metadata 中可能存在的 id
    },
    content,
    html
  }
}