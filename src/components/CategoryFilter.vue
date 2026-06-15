<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="cat-btn"
      :class="{ active: selected === cat.id }"
      @click="$emit('select', cat.id)"
    >
      <span class="cat-icon">{{ cat.icon }}</span>
      <span class="cat-name">{{ cat.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { categories } from '../data/products.js'

defineProps({
  selected: { type: String, default: 'all' }
})

defineEmits(['select'])
</script>

<style scoped>
.category-filter {
  display: flex;
  gap: 8px;
  padding: 0 0 4px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-filter::-webkit-scrollbar {
  display: none;
}

.cat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #8892b0;
  white-space: nowrap;
  transition: all 0.25s;
  flex-shrink: 0;
}

.cat-btn:hover {
  border-color: rgba(0, 212, 255, 0.25);
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.06);
}

.cat-btn.active {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(99, 102, 241, 0.12));
  border-color: #00d4ff;
  color: #00d4ff;
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.08);
}

.cat-icon {
  font-size: 15px;
}

.cat-name {
  font-weight: 600;
  font-family: 'SF Mono', Consolas, monospace;
  font-size: 12px;
  letter-spacing: 0.5px;
}
</style>
