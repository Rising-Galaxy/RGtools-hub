<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { HomeFilled, InfoFilled } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const route = useRoute()
const activeIndex = ref(route.path.split('/').pop() || 'home')
const menus = [
  {
    index: '/',
    icon: HomeFilled,
    label: '首页',
  },
  {
    index: 'about',
    icon: InfoFilled,
    label: '关于',
  },
]
const isDark = useDark()
</script>

<template>
  <el-container>
    <el-header>
      <el-menu class="header-menu" :default-active="activeIndex" mode="horizontal" router ellipsis="false">
        <div class="logo-container">
          <h1>RGtools-hub</h1>
        </div>
        <div class="menu-right">
          <el-menu-item :index="menu.index" v-for="menu in menus" :key="menu.index">
            <component :is="menu.icon" />
            {{ menu.label }}
          </el-menu-item>
          <transition name="switch-move">
            <el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" class="theme-switch" />
          </transition>
        </div>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.header-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-right {
  display: flex;
  align-items: center;
}
</style>
