<template>
  <div class="transit-page">
    <div class="loading-spinner"></div>
    <p class="loading-text">正在跳转...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const router = useRouter()
    const route = useRoute()

    /** 检测是否为移动端 */
    const isMobile = (): boolean => {
      const ua = navigator.userAgent
      return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        ua,
      )
    }

    onMounted(() => {
      // 保留 URL 上的所有 query 参数（如 scene）
      const query = { ...route.query }

      if (isMobile()) {
        router.replace({ path: '/detail', query })
      } else {
        window.location.href = 'https://web.babytime.top/courselist'
      }
    })
  },
})
</script>

<style scoped>
.transit-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e5e5e5;
  border-top-color: #ff69b4;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 16px;
  font-size: 14px;
  color: #999;
}
</style>
