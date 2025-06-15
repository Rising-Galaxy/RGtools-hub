import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
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
  _fileHash?: string // 内部使用的文件哈希
}

export interface Document {
  metadata: DocumentMetadata
  content: string
  html: string
}

// 计算文件内容的哈希值
function calculateFileHash(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex')
}

// 格式化日期为 YYYY-MM-DD 格式
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

// 处理单个 markdown 文件
export async function processMarkdown(filePath: string, fileName: string, existingMetadata?: DocumentMetadata): Promise<Document> {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  // 计算当前文件的哈希值
  const currentHash = calculateFileHash(fileContent)
  const id = fileName.replace(/\.md$/, '')
  
  // 检查是否需要更新时间戳
  let updatedAt = data.updatedAt
  const hasChanged = !existingMetadata || existingMetadata._fileHash !== currentHash
  
  if (!updatedAt || hasChanged) {
    updatedAt = formatDate(new Date())
    console.log(`${hasChanged && existingMetadata ? '📝 文件已更改' : '🆕 新文件'}: ${fileName} - 更新时间戳为 ${updatedAt}`)
  }
  
  // 如果文件有变化，需要更新原始文件的 frontmatter
  if (hasChanged && !data.updatedAt) {
    const updatedData = { ...data, updatedAt }
    const updatedFileContent = matter.stringify(content, updatedData)
    fs.writeFileSync(filePath, updatedFileContent)
    console.log(`✅ 已更新 ${fileName} 的 frontmatter`)
  }

  // 使用 remark 处理 markdown
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content)

  return {
    metadata: {
      id,
      ...data,
      updatedAt,
      _fileHash: currentHash
    } as DocumentMetadata,
    content,
    html: String(result),
  }
}

// 构建所有文档
export async function buildDocuments(): Promise<void> {
  const contentDir = path.join(process.cwd(), 'content')
  const outputDir = path.join(process.cwd(), 'src', 'generated')
  const cacheFile = path.join(outputDir, '.build-cache.json')

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 读取缓存的元数据
  let cachedMetadata: Record<string, DocumentMetadata> = {}
  if (fs.existsSync(cacheFile)) {
    try {
      cachedMetadata = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'))
    } catch (error) {
      console.log('⚠️ 无法读取缓存文件，将重新构建所有文档')
    }
  }

  // 读取所有 markdown 文件
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'))

  console.log(`Found ${files.length} markdown files to process...`)

  const documents: Document[] = []
  const documentMap: Record<string, Document> = {}
  const newCachedMetadata: Record<string, DocumentMetadata> = {}

  // 处理每个文件
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const fileId = file.replace(/\.md$/, '')
    console.log(`Processing ${file}...`)

    try {
      const document = await processMarkdown(filePath, file, cachedMetadata[fileId])
      documents.push(document)
      documentMap[document.metadata.id] = document
      newCachedMetadata[fileId] = document.metadata
      console.log(`✓ Processed ${file} -> ${document.metadata.id}`)
    } catch (error) {
      console.error(`✗ Failed to process ${file}:`, error)
    }
  }

  // 保存新的缓存
  fs.writeFileSync(cacheFile, JSON.stringify(newCachedMetadata, null, 2))

  // 生成文档列表文件（移除内部字段）
  const cleanDocuments = documents.map(doc => ({
    ...doc,
    metadata: {
      ...doc.metadata,
      _fileHash: undefined
    }
  }))
  
  const cleanDocumentMap = Object.fromEntries(
    Object.entries(documentMap).map(([key, doc]) => [
      key,
      {
        ...doc,
        metadata: {
          ...doc.metadata,
          _fileHash: undefined
        }
      }
    ])
  )

  const documentsListPath = path.join(outputDir, 'documents.json')
  fs.writeFileSync(documentsListPath, JSON.stringify(cleanDocuments, null, 2))

  // 生成文档映射文件
  const documentsMapPath = path.join(outputDir, 'documents-map.json')
  fs.writeFileSync(documentsMapPath, JSON.stringify(cleanDocumentMap, null, 2))

  // 生成 TypeScript 类型定义
  const typesContent = `
// 自动生成的文档类型定义
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

export declare const documents: Document[]
export declare const documentsMap: Record<string, Document>
export declare function getDocument(id: string): Document | null
export declare function getAllDocuments(): Document[]
export declare function getDocumentsByCategory(category: string): Document[]
export declare function getDocumentsByTag(tag: string): Document[]
`

  const typesPath = path.join(outputDir, 'documents.d.ts')
  fs.writeFileSync(typesPath, typesContent)

  // 生成 JavaScript 模块
  const moduleContent = `
// 自动生成的文档数据
const documentsData = ${JSON.stringify(cleanDocuments, null, 2)}
const documentsMapData = ${JSON.stringify(cleanDocumentMap, null, 2)}

export const documents = documentsData
export const documentsMap = documentsMapData

export function getDocument(id) {
  return documentsMap[id] || null
}

export function getAllDocuments() {
  return documents
}

export function getDocumentsByCategory(category) {
  return documents.filter(doc => doc.metadata.category === category)
}

export function getDocumentsByTag(tag) {
  return documents.filter(doc =>
    doc.metadata.tags && doc.metadata.tags.includes(tag)
  )
}
`

  const modulePath = path.join(outputDir, 'documents.js')
  fs.writeFileSync(modulePath, moduleContent)

  console.log(`\n✓ Successfully processed ${documents.length} documents`)
  console.log(`✓ Generated files in ${outputDir}:`)
  console.log('  - documents.json (文档列表)')
  console.log('  - documents-map.json (文档映射)')
  console.log('  - documents.d.ts (类型定义)')
  console.log('  - documents.js (JavaScript 模块)')
  console.log('  - .build-cache.json (构建缓存)')
}

// 直接运行构建函数
buildDocuments().catch(console.error)
