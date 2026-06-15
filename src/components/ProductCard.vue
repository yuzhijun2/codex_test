<template>
  <div class="product-card" @click="$emit('view', product)">
    <div class="card-image">
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        @error="handleImageError"
      />
      <div class="card-badge-group">
        <div class="card-badge" v-if="product.badge" :class="badgeClass">
          {{ product.badge }}
        </div>
      </div>
      <div class="card-colors" v-if="product.colors && product.colors.length > 1">
        <span
          v-for="(color, i) in product.colors.slice(0, 4)"
          :key="i"
          class="color-dot"
          :style="{ background: color }"
        />
      </div>
    </div>
    <div class="card-body">
      <div class="card-brand">{{ product.brand }}</div>
      <h3 class="card-title">{{ product.name }}</h3>
      <div class="card-rating">
        <svg v-for="i in 5" :key="i" width="14" height="14" viewBox="0 0 24 24" :fill="i <= Math.round(product.rating) ? '#00d4ff' : '#1e2a4a'" stroke="#00d4ff" stroke-width="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <span class="rating-num">{{ product.rating }}</span>
        <span class="review-count">({{ formatNumber(product.reviews) }})</span>
      </div>
      <div class="card-footer">
        <div class="price-area">
          <span class="current-price">¥{{ formatPrice(product.price) }}</span>
          <span class="original-price" v-if="product.originalPrice">¥{{ formatPrice(product.originalPrice) }}</span>
        </div>
        <button class="add-btn" @click.stop="$emit('addToCart', product)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true }
})

defineEmits(['addToCart', 'view'])

const badgeClass = {
  '热卖': 'badge-hot',
  '新品': 'badge-new',
  '爆款': 'badge-fire',
  '旗舰': 'badge-flagship',
  '户外': 'badge-outdoor',
  '音质': 'badge-audio',
  '大屏': 'badge-large'
}

function formatPrice(price) {
  return (price / 100).toFixed(price % 100 === 0 ? 0 : 2)
}

function formatNumber(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '万'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

function handleImageError(e) {
  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%230f1322" width="400" height="300"/><text x="200" y="160" text-anchor="middle" fill="%234a5278" font-size="18" font-family="sans-serif">Failed</text></svg>'
}
</script>

<style scoped>
.product-card {
  background: rgba(15, 19, 34, 0.75);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 212, 255, 0.06);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(4px);
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 212, 255, 0.2);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.05);
  background: rgba(18, 23, 42, 0.85);
}

.card-image {
  position: relative;
  aspect-ratio: 4/3;
  background: #0f1322;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .card-image img {
  transform: scale(1.08);
}

.card-badge-group {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-badge {
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  font-family: 'SF Mono', Consolas, monospace;
}

.badge-hot { background: linear-gradient(135deg, #ef4444, #dc2626); }
.badge-new { background: linear-gradient(135deg, #00d4ff, #3b82f6); }
.badge-fire { background: linear-gradient(135deg, #f59e0b, #d97706); }
.badge-flagship { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.badge-outdoor { background: linear-gradient(135deg, #10b981, #059669); }
.badge-audio { background: linear-gradient(135deg, #ec4899, #db2777); }
.badge-large { background: linear-gradient(135deg, #6366f1, #4f46e5); }

.card-colors {
  position: absolute;
  bottom: 8px;
  right: 10px;
  display: flex;
  gap: 4px;
}

.color-dot {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.card-body {
  padding: 14px 16px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-brand {
  font-size: 11px;
  font-weight: 700;
  color: #00d4ff;
  letter-spacing: 2px;
  margin-bottom: 2px;
  font-family: 'SF Mono', Consolas, monospace;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #e8edf5;
  margin: 0 0 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  font-size: 12px;
  color: #8892b0;
  line-height: 1.5;
  margin: 0 0 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
}

.rating-num {
  font-size: 12px;
  font-weight: 600;
  color: #00d4ff;
}

.review-count {
  font-size: 11px;
  color: #4a5278;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.price-area {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.current-price {
  font-size: 18px;
  font-weight: 700;
  color: #00d4ff;
  font-family: 'SF Mono', Consolas, monospace;
}

.original-price {
  font-size: 12px;
  color: #4a5278;
  text-decoration: line-through;
}

.add-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  background: transparent;
  color: #00d4ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
  flex-shrink: 0;
}

.add-btn:hover {
  background: linear-gradient(135deg, #00d4ff, #6366f1);
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.3);
  border-color: transparent;
}
</style>
