import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import DocumentViewer from '@/components/DocumentViewer.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/about',
    component: AboutView,
  },
  {
    path: '/docs/:id',
    component: DocumentViewer,
    props: true
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
