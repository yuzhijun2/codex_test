<template>
  <Transition name="cart">
    <div v-if="visible" class="cart-overlay" @click.self="$emit('close')">
      <aside class="cart-panel" @click.stop>
        <div class="cart-header">
          <div class="cart-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            <span>购物车</span>
            <span class="cart-count">{{ items.length }}件</span>
          </div>
          <button class="close-btn" @click="$emit('close')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M6 6L18 18M6 18L18 6"/>
            </svg>
          </button>
        </div>

        <div class="cart-items" v-if="items.length > 0">
          <div class="cart-item" v-for="item in items" :key="item.id">
            <img :src="item.image" :alt="item.name" class="item-img" />
            <div class="item-info">
              <div class="item-brand">{{ item.brand }}</div>
              <div class="item-name">{{ item.name }}</div>
              <div class="item-price">¥{{ formatPrice(item.price) }}</div>
            </div>
            <div class="item-actions">
              <div class="qty-control">
                <button class="qty-btn" @click="$emit('updateQty', item.id, item.quantity - 1)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                    <path d="M5 12h14"/>
                  </svg>
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button class="qty-btn" @click="$emit('updateQty', item.id, item.quantity + 1)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
              </div>
              <button class="remove-btn" @click="$emit('removeItem', item.id)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-empty" v-else>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4a5278" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          <p>购物车还是空的</p>
          <span>快去挑选心仪的电子产品吧</span>
        </div>

        <div class="cart-footer" v-if="items.length > 0">
          <div class="summary-row">
            <span>商品小计</span>
            <span>¥{{ formatPrice(summary.subtotal) }}</span>
          </div>
          <div class="summary-row">
            <span>运费</span>
            <span :class="summary.shipping === 0 ? 'free' : ''">
              {{ summary.shipping === 0 ? '免运费' : '¥' + formatPrice(summary.shipping) }}
            </span>
          </div>
          <div class="summary-row">
            <span>税费 (13%)</span>
            <span>¥{{ formatPrice(summary.tax) }}</span>
          </div>
          <div class="summary-divider" />
          <div class="summary-row total">
            <span>合计</span>
            <span>¥{{ formatPrice(summary.total) }}</span>
          </div>
          <button class="checkout-btn" @click="handleCheckout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            去结算
          </button>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
  summary: { type: Object, default: () => ({ subtotal: 0, shipping: 0, tax: 0, total: 0 }) }
})

const emit = defineEmits(['close', 'updateQty', 'removeItem'])

function formatPrice(price) {
  return price.toLocaleString('zh-CN')
}

function handleCheckout() {
  alert('🎉 订单已提交！感谢您的购物。')
  emit('close')
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
  backdrop-filter: blur(4px);
}

.cart-panel {
  width: 400px;
  max-width: 100vw;
  height: 100vh;
  background: rgba(11, 14, 23, 0.95);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(0, 212, 255, 0.08);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.4);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.06);
}

.cart-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #e8edf5;
}

.cart-count {
  font-size: 13px;
  font-weight: 500;
  color: #8892b0;
  background: rgba(255, 255, 255, 0.04);
  padding: 1px 8px;
  border-radius: 10px;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #4a5278;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #e8edf5;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-items::-webkit-scrollbar {
  width: 4px;
}
.cart-items::-webkit-scrollbar-thumb {
  background: #1e2a4a;
  border-radius: 2px;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 212, 255, 0.04);
  border-radius: 8px;
  align-items: center;
}

.item-img {
  width: 64px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  background: #0f1322;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-brand {
  font-size: 10px;
  font-weight: 700;
  color: #00d4ff;
  letter-spacing: 1px;
  font-family: 'SF Mono', Consolas, monospace;
}

.item-name {
  font-size: 13px;
  font-weight: 500;
  color: #e8edf5;
  margin: 1px 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  font-size: 14px;
  font-weight: 700;
  color: #00d4ff;
  font-family: 'SF Mono', Consolas, monospace;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #4a5278;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.qty-btn:hover {
  background: rgba(0, 212, 255, 0.08);
  color: #00d4ff;
}

.qty-value {
  width: 32px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #e8edf5;
  background: rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 212, 255, 0.1);
  border-right: 1px solid rgba(0, 212, 255, 0.1);
}

.remove-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #4a5278;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #4a5278;
  padding: 40px;
}

.cart-empty p {
  font-size: 15px;
  font-weight: 500;
  color: #8892b0;
  margin: 0;
}

.cart-empty span {
  font-size: 13px;
}

.cart-footer {
  padding: 20px 24px;
  border-top: 1px solid rgba(0, 212, 255, 0.06);
  background: rgba(0, 0, 0, 0.2);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #8892b0;
  margin-bottom: 8px;
}

.summary-row.total {
  font-size: 16px;
  font-weight: 700;
  color: #e8edf5;
  margin-bottom: 16px;
}

.summary-row .free {
  color: #00d4ff;
  font-weight: 500;
}

.summary-divider {
  height: 1px;
  background: rgba(0, 212, 255, 0.06);
  margin: 8px 0 12px;
}

.checkout-btn {
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
  gap: 8px;
  transition: all 0.25s;
  letter-spacing: 1px;
}

.checkout-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 212, 255, 0.25);
}

.cart-enter-active, .cart-leave-active {
  transition: all 0.3s ease;
}

.cart-enter-from, .cart-leave-to {
  opacity: 0;
}

.cart-enter-from .cart-panel, .cart-leave-to .cart-panel {
  transform: translateX(100%);
}
</style>
