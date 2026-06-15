<template>
  <div class="product-grid-wrapper">
    <div class="results-bar">
      <span class="results-count">
        共 <strong>{{ filteredProducts.length }}</strong> 件商品
      </span>
      <div class="sort-group">
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          class="sort-btn"
          :class="{ active: sortBy === opt.value }"
          @click="$emit('sort', opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>
    <TransitionGroup name="grid" tag="div" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @addToCart="$emit('addToCart', $event)"
        @view="$emit('viewProduct', $event)"
      />
    </TransitionGroup>
    <div class="empty-state" v-if="filteredProducts.length === 0">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4a5278" stroke-width="1" stroke-linecap="round">
        <circle cx="11" cy="11" r="7"/>
        <path d="M16.5 16.5L21 21"/>
      </svg>
      <p>没有找到匹配的商品</p>
      <span>试试调整筛选条件或搜索关键词</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { products } from '../data/products.js'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  category: { type: String, default: 'all' },
  searchQuery: { type: String, default: '' },
  sortBy: { type: String, default: 'default' }
})

defineEmits(['addToCart', 'sort', 'viewProduct'])

const sortOptions = [
  { label: '默认', value: 'default' },
  { label: '价格↑', value: 'price-asc' },
  { label: '价格↓', value: 'price-desc' },
  { label: '评分', value: 'rating' }
]

const filteredProducts = computed(() => {
  let result = [...products]

  if (props.category !== 'all') {
    result = result.filter(p => p.category === props.category)
  }

  if (props.searchQuery.trim()) {
    const q = props.searchQuery.trim().toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }

  switch (props.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
  }

  return result
})
</script>

<style scoped>
.product-grid-wrapper {
  padding: 0 0 40px;
}

.results-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.results-count {
  font-size: 13px;
  color: #8892b0;
}

.results-count strong {
  color: #e8edf5;
}

.sort-group {
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.03);
  padding: 3px;
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.06);
}

.sort-btn {
  padding: 5px 14px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #4a5278;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'SF Mono', Consolas, monospace;
  letter-spacing: 0.5px;
}

.sort-btn:hover {
  color: #8892b0;
}

.sort-btn.active {
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #4a5278;
}

.empty-state p {
  font-size: 16px;
  font-weight: 500;
  color: #8892b0;
  margin: 12px 0 4px;
}

.empty-state span {
  font-size: 13px;
}

.grid-enter-active {
  transition: all 0.3s ease;
}

.grid-leave-active {
  transition: all 0.2s ease;
}

.grid-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }
}
</style>
