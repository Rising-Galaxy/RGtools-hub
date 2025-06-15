<script lang="ts" setup>
import { ref } from 'vue'

const features = ref([
  {
    icon: '📚',
    title: '文档管理',
    description: '集中管理和展示各种技术文档，支持 Markdown 格式',
  },
  {
    icon: '🔍',
    title: '快速搜索',
    description: '强大的搜索功能，快速找到所需的文档内容',
  },
  {
    icon: '🎨',
    title: '现代界面',
    description: '简洁美观的用户界面，提供良好的阅读体验',
  },
  {
    icon: '📱',
    title: '响应式设计',
    description: '完美适配各种设备，随时随地查看文档',
  },
])

const techStack = ref(['Vue 3', 'TypeScript', 'Vite', 'Vue Router', 'Markdown-it', 'GitHub Pages'])
</script>

<template>
  <div class="about-container">
    <div class="hero-section">
      <h1 class="title">关于 RGtools-hub</h1>
      <p class="subtitle">一个现代化的文档管理和展示平台，专为开发者和技术团队设计</p>
    </div>

    <div class="content-section">
      <div class="description">
        <h2>项目简介</h2>
        <p>
          RGtools-hub 是一个基于 Vue 3 和 TypeScript 构建的文档管理系统。
          它提供了一个简洁、高效的平台来组织、管理和展示各种技术文档。 无论是 API
          文档、使用指南还是技术笔记，都能在这里找到完美的展示方式。
        </p>
      </div>

      <div class="features">
        <h2>核心功能</h2>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <div class="tech-stack">
        <h2>技术栈</h2>
        <div class="tech-tags">
          <span v-for="tech in techStack" :key="tech" class="tech-tag">
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="contact">
        <h2>联系方式</h2>
        <p>如果您有任何问题或建议，欢迎通过 GitHub 与我们联系。 我们期待您的反馈和贡献！</p>
        <a href="https://github.com/Rising-Galaxy/RGtools-hub" target="_blank" class="github-link">
          <span>🔗</span>
          访问 GitHub 仓库
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.description h2,
.features h2,
.tech-stack h2,
.contact h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
  border-bottom: 3px solid #667eea;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.description p,
.contact p {
  font-size: 1.1rem;
  color: #4b5563;
  margin-bottom: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  font-size: 0.95rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.tech-tag {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.tech-tag:hover {
  transform: scale(1.05);
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1f2937;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.github-link:hover {
  background: #374151;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tech-tags {
    justify-content: center;
  }
}
</style>
