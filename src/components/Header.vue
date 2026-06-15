<template>
  <header class="header">
    <div class="header-inner">
      <div class="logo" @click="$emit('home')">
        <div class="logo-icon">
          <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="12" fill="url(#lg)"/>
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stop-color="#00d4ff"/>
                <stop offset="100%" stop-color="#6366f1"/>
              </linearGradient>
            </defs>
            <path d="M20 44V28L32 18L44 28V44H36V34H28V44H20Z" fill="#fff"/>
          </svg>
        </div>
        <span class="logo-text">NEXUS<span class="logo-accent">MART</span></span>
      </div>

      <div class="search-area">
        <div class="search-wrapper">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <circle cx="11" cy="11" r="7"/>
            <path d="M16.5 16.5L21 21"/>
          </svg>
          <input
            v-model="localQuery"
            type="text"
            placeholder="搜索产品名称、品牌..."
            class="search-input"
            @input="showSuggestions = true"
            @focus="showSuggestions = true"
            @blur="onBlur"
            @keydown="handleKeydown"
          />
          <button v-if="localQuery" class="search-clear" @click="clearSearch">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M6 6L18 18M6 18L18 6"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="header-actions">
        <button class="cart-btn" @click="$emit('toggleCart')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          <span class="cart-badge" v-if="cartCount > 0">{{ cartCount > 99 ? '99+' : cartCount }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { products } from '../data/products.js'

const props = defineProps({
  modelValue: { type: String, default: '' },
  cartCount: { type: Number, default: 0 }
})

const emit = defineEmits(['update:modelValue', 'toggleCart', 'home', 'selectProduct'])

const localQuery = ref(props.modelValue)
const showSuggestions = ref(false)
const selectedIndex = ref(-1)

const suggestions = computed(() => {
  if (!localQuery.value.trim()) return []
  const q = localQuery.value.trim().toLowerCase()
  return products
    .filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    .slice(0, 6)
})

const totalResults = computed(() => {
  if (!localQuery.value.trim()) return 0
  const q = localQuery.value.trim().toLowerCase()
  return products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)).length
})

const HISTORY_KEY = 'nexus_search_history'
const searchHistory = ref(loadHistory())

function loadHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

function saveHistory() {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory.value))
  } catch {}
}

function addToHistory(term) {
  const t = term.trim()
  if (!t) return
  searchHistory.value = [t, ...searchHistory.value.filter(h => h !== t)].slice(0, 5)
  saveHistory()
}

function clearHistory() {
  searchHistory.value = []
  saveHistory()
}

function selectHistory(term) {
  localQuery.value = term
  showSuggestions.value = true
  emit('update:modelValue', term)
}

const showHistory = computed(() => {
  return !localQuery.value.trim() && showSuggestions.value
})

watch(() => props.modelValue, (val) => {
  localQuery.value = val
  if (!val) showSuggestions.value = false
})

watch(localQuery, (val) => {
  emit('update:modelValue', val)
  if (val.trim()) {
    showSuggestions.value = true
    selectedIndex.value = -1
  }
})

function selectSuggestion(product) {
  addToHistory(product.name)
  localQuery.value = product.name
  showSuggestions.value = false
  emit('update:modelValue', product.name)
  emit('selectProduct', product)
}

function showAllResults() {
  showSuggestions.value = false
  emit('update:modelValue', localQuery.value)
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    showSuggestions.value = false
    return
  }
  const items = suggestions.value
  if (!items.length) {
    if (e.key === 'Enter' && localQuery.value.trim()) {
      addToHistory(localQuery.value)
    }
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % items.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = selectedIndex.value <= 0 ? items.length - 1 : selectedIndex.value - 1
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (selectedIndex.value >= 0) {
      selectSuggestion(items[selectedIndex.value])
    } else {
      addToHistory(localQuery.value)
      showSuggestions.value = false
      emit('update:modelValue', localQuery.value)
    }
  }
}

function highlightMatch(text, query) {
  if (!query.trim()) return text
  const idx = text.toLowerCase().indexOf(query.trim().toLowerCase())
  if (idx === -1) return text
  return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + query.trim().length) + '</mark>' + text.slice(idx + query.trim().length)
}

function clearSearch() {
  localQuery.value = ''
  showSuggestions.value = false
  emit('update:modelValue', '')
}

function onBlur() {
  setTimeout(() => { showSuggestions.value = false }, 200)
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(11, 14, 23, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.08);
}

.header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex-shrink: 0;
}

.logo-icon {
  display: flex;
}

.logo-text {
  font-size: 20px;
  font-weight: 800;
  color: #e8edf5;
  letter-spacing: 2px;
  font-family: 'SF Mono', Consolas, monospace;
}

.logo-accent {
  color: #00d4ff;
}

.search-area {
  flex: 1;
  max-width: 520px;
  margin: 0 auto;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: #4a5278;
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 42px;
  padding: 0 40px 0 42px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 8px;
  font-size: 14px;
  color: #e8edf5;
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.25s;
  outline: none;
}

.search-input:focus {
  background: rgba(0, 212, 255, 0.06);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.08);
}

.search-input::placeholder {
  color: #4a5278;
}

.search-clear {
  position: absolute;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #4a5278;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.search-clear:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #8892b0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.cart-btn {
  position: relative;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(0, 212, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8892b0;
  transition: all 0.25s;
}

.cart-btn:hover {
  border-color: rgba(0, 212, 255, 0.3);
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.06);
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.08);
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: #00d4ff;
  color: #070b14;
  font-size: 11px;
  font-weight: 800;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 212, 255, 0.4);
}

.search-suggestions {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: rgba(11, 14, 23, 0.95);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 212, 255, 0.04);
  backdrop-filter: blur(16px);
  z-index: 200;
  max-height: 360px;
  overflow-y: auto;
}

.search-suggestions::-webkit-scrollbar { width: 4px; }
.search-suggestions::-webkit-scrollbar-thumb { background: #1e2a4a; border-radius: 2px; }

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.15s;
  border-bottom: 1px solid rgba(0, 212, 255, 0.04);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover,
.suggestion-item.highlighted {
  background: rgba(0, 212, 255, 0.06);
}

.suggestion-img {
  width: 44px;
  height: 33px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  background: #0f1322;
}

.suggestion-info {
  flex: 1;
  min-width: 0;
}

.suggestion-name {
  font-size: 14px;
  font-weight: 500;
  color: #e8edf5;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.suggestion-name :deep(mark) {
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
  padding: 0 2px;
  border-radius: 2px;
}

.suggestion-brand {
  font-size: 11px;
  color: #4a5278;
  font-family: 'SF Mono', Consolas, monospace;
}

.suggestion-price {
  font-size: 14px;
  font-weight: 700;
  color: #00d4ff;
  font-family: 'SF Mono', Consolas, monospace;
  flex-shrink: 0;
}

.suggest-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px 6px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.04);
}

.suggest-count {
  font-size: 12px;
  color: #4a5278;
  font-family: 'SF Mono', Consolas, monospace;
}

.suggest-count strong {
  color: #8892b0;
}

.clear-history-btn {
  background: none;
  border: none;
  font-size: 11px;
  color: #4a5278;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  transition: all 0.15s;
  font-family: inherit;
}

.clear-history-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.suggest-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-top: 1px solid rgba(0, 212, 255, 0.04);
  cursor: pointer;
  color: #8892b0;
  font-size: 13px;
  transition: all 0.15s;
}

.suggest-footer:hover {
  background: rgba(0, 212, 255, 0.06);
  color: #00d4ff;
}

.suggest-footer strong {
  color: #00d4ff;
}

.search-history {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: rgba(11, 14, 23, 0.95);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 212, 255, 0.04);
  backdrop-filter: blur(16px);
  z-index: 200;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 13px;
  color: #8892b0;
  border-bottom: 1px solid rgba(0, 212, 255, 0.04);
}

.history-item:last-child {
  border-bottom: none;
}

.history-item:hover {
  background: rgba(0, 212, 255, 0.06);
  color: #e8edf5;
}

.suggest-enter-active { transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.suggest-leave-active { transition: all 0.15s; }
.suggest-enter-from { opacity: 0; transform: translateY(-8px); }
.suggest-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 640px) {
  .header-inner { padding: 0 16px; gap: 12px; }
  .logo-text { font-size: 17px; }
  .search-area { max-width: none; }
}
</style>
