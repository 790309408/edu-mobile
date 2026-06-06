<template>
  <div class="detail-page">
    <!-- Main Content -->
    <main class="detail-content">
      <!-- Card -->
      <div class="card-container" @click="handleOpen">
        <div class="card">
          <div class="card-icon">
            <img src="/logo.png" alt="icon" />
          </div>
          <h2 class="card-title">宝宝星盒</h2>
          <p class="card-tag">
            <span class="tag-icon">🔗</span>
            小程序
          </p>
        </div>
      </div>

      <!-- Description -->
      <div class="description">
        <p>儿童英文启蒙学习应用，通过动画形式让孩子轻松学习英文。</p>
      </div>
    </main>

    <!-- Bottom Button -->
    <footer class="detail-footer">
      <button class="btn-primary" @click="handleOpen">打开小程序</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant'
import { getChannelLink, type ChannelLinkData } from '@/api/channel'

export default defineComponent({
  name: 'DetailPage',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const loading = ref(false)
    const channelData = ref<ChannelLinkData | null>(null)
    const errorMsg = ref('')

    // 从 URL 中获取 scene 参数，默认值为 ''
    const sceneValue = (route.query.scene as string) || ''

    // 页面加载时查询渠道链接信息
    const fetchChannelLink = async () => {
      if (!sceneValue) {
        errorMsg.value = '缺少场景值参数'
        return
      }

      loading.value = true
      try {
        const res = await getChannelLink(sceneValue)
        if (res.code === 200) {
          channelData.value = res.data
        } else {
          errorMsg.value = res.msg || '获取渠道信息失败'
        }
      } catch {
        errorMsg.value = '网络请求失败，请稍后重试'
      } finally {
        loading.value = false
      }
    }

    const handleClose = () => {
      router.back()
    }

    const handleOpen = () => {
      if (!channelData.value?.miniProgramLink) {
        Toast('暂无小程序链接')
        return
      }
      // 通过 URL Scheme 跳转到微信小程序
      window.location.href = channelData.value.miniProgramLink
    }

    onMounted(() => {
      fetchChannelLink()
    })

    return {
      handleClose,
      handleOpen,
      loading,
      channelData,
      errorMsg,
    }
  },
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.detail-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #fef5f9 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

/* Header */
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.95);
  font-size: 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
}

.btn-close,
.btn-more {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 4px 8px;
  color: #333;
  transition: opacity 0.2s;
  border-radius: 4px;
  flex-shrink: 0;
}

.btn-close:hover,
.btn-more:hover {
  background: #f0f0f0;
}

.btn-close:active,
.btn-more:active {
  opacity: 0.6;
}

/* Content */
.detail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  width: 100%;
  overflow-x: hidden;
}

.card-container {
  margin-bottom: 30px;
  animation: slideUp 0.5s ease-out;
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  cursor: pointer;
  background: white;
  border-radius: 20px;
  padding: 40px 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 280px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:active {
  transform: scale(0.97);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
}

.card-icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  letter-spacing: -0.3px;
}

.card-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #999;
  margin: 0;
  padding: 6px 12px;
  border-radius: 12px;
}

.tag-icon {
  font-size: 13px;
}

/* Description */
.description {
  text-align: center;
  padding: 0 16px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
}

.description p {
  font-size: 14px;
  color: #555;
  line-height: 1.8;
  margin: 0;
  font-weight: 500;
}

/* Footer */
.detail-footer {
  padding: 0 16px 40px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.btn-primary {
  width: 100%;
  max-width: 260px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #ff69b4 0%, #ff85c0 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(255, 105, 180, 0.3);
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255, 105, 180, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.3);
}

@media (max-width: 480px) {
  .detail-content {
    padding: 30px 16px;
  }

  .card {
    padding: 35px 20px;
  }

  .card-icon {
    width: 90px;
    height: 90px;
    margin-bottom: 15px;
  }

  .card-title {
    font-size: 22px;
  }

  .description {
    padding: 0 16px;
  }

  .description p {
    font-size: 13px;
  }

  .detail-footer {
    padding: 0 16px 32px;
  }

  .btn-primary {
    max-width: 100%;
    padding: 12px 24px;
    font-size: 14px;
  }
}
</style>
