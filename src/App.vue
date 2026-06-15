<template>
  <div class="app">
    <div class="grid-bg"></div>
    <Header
      v-model="searchQuery"
      :cart-count="cartCount"
      @toggleCart="showCart = !showCart"
      @home="resetHome"
    />

    <main class="main-content">
      <div class="banner-section">
        <div class="banner-slider">
          <div
            class="banner-track"
            :style="{ transform: `translateX(-${currentBanner * 100}%)` }"
          >
            <div
              v-for="(banner, i) in banners"
              :key="i"
              class="banner-slide"
              :style="{ background: banner.bg }"
              @click="handleBannerClick(banner)"
            >
              <div class="banner-content">
                <span class="banner-tag">{{ banner.tag }}</span>
                <h2 class="banner-title">{{ banner.title }}</h2>
                <p class="banner-subtitle">{{ banner.subtitle }}</p>
                <button class="banner-cta">{{ banner.cta }}</button>
              </div>
              <img :src="banner.image" :alt="banner.title" class="banner-img" />
            </div>
          </div>
          <div class="banner-dots">
            <button
              v-for="(_, i) in banners"
              :key="i"
              class="dot"
              :class="{ active: currentBanner === i }"
              @click="currentBanner = i"
            />
          </div>
        </div>
      </div>

      <div class="content-section">
        <CategoryFilter
          :selected="selectedCategory"
          @select="selectedCategory = $event"
        />

        <ProductGrid
          :category="selectedCategory"
          :search-query="searchQuery"
          :sort-by="sortBy"
          @addToCart="handleAddToCart"
          @sort="sortBy = $event"
          @viewProduct="handleViewProduct"
        />
      </div>
    </main>

    <CartSidebar
      :visible="showCart"
      :items="cartItems"
      :summary="cartSummary"
      @close="showCart = false"
      @updateQty="updateQuantity"
      @removeItem="removeFromCart"
    />

    <!-- Product Detail Modal -->
    <Transition name="modal">
      <div v-if="selectedProduct" class="modal-overlay" @click.self="selectedProduct = null">
        <div class="modal-panel">
          <button class="modal-close" @click="selectedProduct = null">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M6 6L18 18M6 18L18 6"/>
            </svg>
          </button>
          <div class="modal-layout">
            <div class="modal-image">
              <img :src="selectedProduct.image" :alt="selectedProduct.name" />
              <div class="modal-colors" v-if="selectedProduct.colors">
                <span
                  v-for="(c, i) in selectedProduct.colors"
                  :key="i"
                  class="color-dot-lg"
                  :style="{ background: c, border: c === '#ffffff' ? '1px solid rgba(255,255,255,0.2)' : 'none' }"
                  :title="c"
                />
              </div>
            </div>
            <div class="modal-info">
              <span class="modal-brand">{{ selectedProduct.brand }}</span>
              <h2 class="modal-title">{{ selectedProduct.name }}</h2>
              <div class="modal-rating">
                <div class="stars">
                  <svg v-for="i in 5" :key="i" width="16" height="16" viewBox="0 0 24 24" :fill="i <= Math.round(selectedProduct.rating) ? '#00d4ff' : '#1e2a4a'" stroke="#00d4ff" stroke-width="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <span class="rating-score">{{ selectedProduct.rating }}</span>
                <span class="rating-reviews">{{ selectedProduct.reviews }} 条评价</span>
              </div>
              <p class="modal-desc">{{ selectedProduct.description }}</p>
              <div class="modal-storage" v-if="selectedProduct.storage">
                <div class="section-label">存储容量</div>
                <div class="storage-options">
                  <button
                    v-for="s in selectedProduct.storage"
                    :key="s"
                    class="storage-btn"
                    :class="{ active: selectedStorage === s }"
                    @click="selectedStorage = s"
                  >
                    {{ s }}
                  </button>
                </div>
              </div>
              <div class="modal-price-area">
                <div class="modal-price">
                  <span class="price-symbol">¥</span>
                  {{ formatPrice(selectedProduct.price) }}
                </div>
                <div class="modal-original" v-if="selectedProduct.originalPrice">
                  原价 ¥{{ formatPrice(selectedProduct.originalPrice) }}
                </div>
              </div>
              <button class="modal-add-btn" @click="handleModalAdd">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                加入购物车
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Header from './components/Header.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import ProductGrid from './components/ProductGrid.vue'
import CartSidebar from './components/CartSidebar.vue'
import { useCart } from './composables/useCart.js'
import { products } from './data/products.js'

const { cartItems, cartCount, cartSummary, addToCart, removeFromCart, updateQuantity } = useCart()

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('default')
const showCart = ref(false)
const selectedProduct = ref(null)
const selectedStorage = ref('')
const currentBanner = ref(0)

const banners = [
  {
    title: 'iPhone 15 Pro Max',
    subtitle: '钛金属 · A17 Pro · 4800万像素',
    tag: 'LIMITED',
    cta: 'SHOP NOW',
    image: 'https://picsum.photos/seed/bannerphone/640/360',
    bg: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a2a4a 100%)',
    action: () => {
      selectedCategory.value = 'smartphone'
    }
  },
  {
    title: 'MacBook Air M3',
    subtitle: '轻薄设计 · 18h续航 · AI性能',
    tag: 'EDUCATION',
    cta: 'LEARN MORE',
    image: 'https://picsum.photos/seed/bannermac/640/360',
    bg: 'linear-gradient(135deg, #0a0f1e 0%, #1a1a2a 50%, #0a1a2a 100%)',
    action: () => {
      selectedCategory.value = 'laptop'
    }
  },
  {
    title: 'Sony WH-1000XM5',
    subtitle: '降噪旗舰 · 30h续航 · 极致舒适',
    tag: 'BESTSELLER',
    cta: 'VIEW NOW',
    image: 'https://picsum.photos/seed/bannerheadphones/640/360',
    bg: 'linear-gradient(135deg, #0a0f1e 0%, #1a0a2a 50%, #2a0a3a 100%)',
    action: () => {
      selectedCategory.value = 'audio'
    }
  },
  {
    title: 'Nintendo Switch OLED',
    subtitle: '掌机/主机二合一 · 独占大作 · 家庭娱乐',
    tag: 'GAMING',
    cta: 'EXPLORE',
    image: 'https://picsum.photos/seed/bannerconsole/640/360',
    bg: 'linear-gradient(135deg, #0a0f1e 0%, #1a0a2e 50%, #2a0a3e 100%)',
    action: () => {
      selectedCategory.value = 'gaming'
    }
  },
  {
    title: '智能穿戴新境界',
    subtitle: '健康监测 · 全天续航 · 极致轻便',
    tag: 'LIFESTYLE',
    cta: 'DISCOVER',
    image: 'https://picsum.photos/seed/bannerwear/640/360',
    bg: 'linear-gradient(135deg, #0a0f1e 0%, #0a1a2e 50%, #0a2a1a 100%)',
    action: () => {
      selectedCategory.value = 'wearable'
    }
  }
]

let bannerTimer = null
function startBannerLoop() {
  stopBannerLoop()
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.length
  }, 5000)
}

function stopBannerLoop() {
  if (bannerTimer) {
    clearInterval(bannerTimer)
    bannerTimer = null
  }
}

startBannerLoop()

watch(selectedProduct, (val) => {
  if (val) {
    if (bannerTimer) {
      clearInterval(bannerTimer)
      bannerTimer = null
    }
    selectedStorage.value = val.storage ? val.storage[0] : ''
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    startBannerLoop()
  }
})

function handleBannerClick(banner) {
  if (banner.action) banner.action()
}

function handleAddToCart(product) {
  addToCart(product)
  showCart.value = true
}

function handleModalAdd() {
  if (selectedProduct.value) {
    addToCart(selectedProduct.value)
    selectedProduct.value = null
    showCart.value = true
  }
}

function handleViewProduct(product) {
  selectedProduct.value = product
}

function resetHome() {
  selectedCategory.value = 'all'
  searchQuery.value = ''
  sortBy.value = 'default'
  currentBanner.value = 0
}

function formatPrice(price) {
  return (price / 100).toFixed(price % 100 === 0 ? 0 : 2)
}
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #070b14;
  color: #e8edf5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0f1322; }
::-webkit-scrollbar-thumb { background: #1e2a4a; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #2a3a6a; }

button { font-family: inherit; cursor: pointer; }

.app {
  min-height: 100vh;
  position: relative;
}

.grid-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.app::before {
  content: '';
  position: fixed;
  top: -20%;
  left: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%);
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}

.app::after {
  content: '';
  position: fixed;
  bottom: -20%;
  right: -10%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}

.main-content {
  padding-top: 68px;
  position: relative;
  z-index: 1;
}

.banner-section {
  padding: 24px 24px 0;
  max-width: 1280px;
  margin: 0 auto;
}

.banner-slider {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  aspect-ratio: 2.8 / 1;
  max-height: 360px;
  border: 1px solid rgba(0, 212, 255, 0.08);
  box-shadow: 0 0 40px rgba(0, 212, 255, 0.06);
}

.banner-track {
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.banner-slide {
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 50%;
}

.banner-tag {
  display: inline-block;
  padding: 3px 12px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #00d4ff;
  letter-spacing: 2px;
  margin-bottom: 14px;
  font-family: 'SF Mono', Consolas, monospace;
}

.banner-title {
  font-size: 34px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.banner-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
  line-height: 1.5;
}

.banner-cta {
  padding: 11px 32px;
  background: linear-gradient(135deg, #00d4ff, #6366f1);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.25s;
  font-family: 'SF Mono', Consolas, monospace;
}

.banner-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 24px rgba(0, 212, 255, 0.3);
}

.banner-img {
  height: 85%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 12px;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 212, 255, 0.05);
}

.banner-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.dot.active {
  background: #00d4ff;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  width: 24px;
  border-radius: 10px;
}

.content-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  backdrop-filter: blur(8px);
}

.modal-panel {
  background: rgba(15, 19, 34, 0.95);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 14px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 212, 255, 0.06);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8892b0;
  transition: all 0.2s;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e8edf5;
}

.modal-layout {
  display: flex;
  gap: 32px;
}

.modal-image {
  flex: 1;
  min-width: 0;
}

.modal-image img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 10px;
  background: #0f1322;
  border: 1px solid rgba(0, 212, 255, 0.06);
}

.modal-colors {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: center;
}

.color-dot-lg {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s;
}

.color-dot-lg:hover {
  transform: scale(1.2);
}

.modal-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-brand {
  font-size: 12px;
  font-weight: 700;
  color: #00d4ff;
  letter-spacing: 2px;
  font-family: 'SF Mono', Consolas, monospace;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #e8edf5;
  line-height: 1.3;
  letter-spacing: -0.3px;
}

.modal-rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stars { display: flex; gap: 1px; }

.rating-score {
  font-size: 14px;
  font-weight: 700;
  color: #00d4ff;
}

.rating-reviews {
  font-size: 13px;
  color: #4a5278;
}

.modal-desc {
  font-size: 14px;
  color: #8892b0;
  line-height: 1.7;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  color: #8892b0;
  margin-bottom: 6px;
  letter-spacing: 1px;
  font-family: 'SF Mono', Consolas, monospace;
}

.storage-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.storage-btn {
  padding: 6px 16px;
  border: 1px solid rgba(0, 212, 255, 0.15);
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #8892b0;
  cursor: pointer;
  transition: all 0.2s;
}

.storage-btn:hover {
  border-color: rgba(0, 212, 255, 0.3);
  color: #00d4ff;
}

.storage-btn.active {
  background: rgba(0, 212, 255, 0.1);
  border-color: #00d4ff;
  color: #fff;
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.1);
}

.modal-price-area {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 212, 255, 0.06);
}

.modal-price {
  font-size: 32px;
  font-weight: 700;
  color: #00d4ff;
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-family: 'SF Mono', Consolas, monospace;
}

.price-symbol {
  font-size: 20px;
}

.modal-original {
  font-size: 13px;
  color: #4a5278;
  text-decoration: line-through;
  margin-top: 2px;
}

.modal-add-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #00d4ff, #6366f1);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.25s;
  margin-top: 16px;
  letter-spacing: 1px;
}

.modal-add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 212, 255, 0.25);
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-panel, .modal-leave-to .modal-panel {
  transform: scale(0.9);
  opacity: 0;
}

@media (max-width: 768px) {
  .banner-section { padding: 16px 16px 0; }
  .banner-slide { padding: 0 24px; flex-direction: column; justify-content: center; gap: 16px; }
  .banner-content { max-width: 100%; text-align: center; }
  .banner-title { font-size: 24px; }
  .banner-subtitle { font-size: 12px; }
  .banner-img { height: auto; width: 70%; max-height: 50%; }
  .banner-cta { margin: 0 auto; }
  .content-section { padding: 16px 16px 32px; }
  .modal-panel { padding: 24px; }
  .modal-layout { flex-direction: column; }
  .modal-price { font-size: 28px; }
}
</style>
