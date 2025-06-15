import type { Plugin } from 'vite'
import { buildDocuments } from './build-docs'

export function docsPlugin(): Plugin {
  return {
    name: 'docs-plugin',
    buildStart() {
      // 在构建开始时预处理文档
      return buildDocuments()
    },
    handleHotUpdate({ file, server }) {
      // 开发模式下，监听 content 目录的变化
      if (file.includes('content') && file.endsWith('.md')) {
        console.log('Markdown file changed, rebuilding docs...')
        buildDocuments().then(() => {
          // 通知客户端重新加载
          server.ws.send({
            type: 'full-reload'
          })
        })
      }
    }
  }
}