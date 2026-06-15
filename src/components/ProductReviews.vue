<template>
  <div class="reviews-section">
    <div class="reviews-header">
      <h3 class="reviews-title">商品评价</h3>
      <span class="reviews-total">共 {{ reviews.length }} 条</span>
    </div>

    <div class="reviews-summary">
      <div class="summary-score">
        <span class="score-value">{{ averageRating }}</span>
        <div class="score-stars">
          <svg v-for="i in 5" :key="i" width="12" height="12" viewBox="0 0 24 24"
            :fill="i <= Math.round(averageRating) ? '#00d4ff' : '#1e2a4a'"
            stroke="#00d4ff" stroke-width="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <span class="score-label">{{ averageRating }} 综合评分</span>
      </div>
      <div class="summary-bars">
        <div class="dist-row" v-for="star in 5" :key="star">
          <span class="dist-label">{{ 6 - star }}星</span>
          <div class="dist-track">
            <div class="dist-fill" :style="{ width: distPercent(6 - star) + '%' }" />
          </div>
          <span class="dist-count">{{ distCount(6 - star) }}</span>
        </div>
      </div>
    </div>

    <div class="reviews-list">
      <div class="review-item" v-for="r in reviews" :key="r.user + r.date">
        <div class="review-avatar">{{ r.user[0] }}</div>
        <div class="review-body">
          <div class="review-top">
            <span class="review-user">{{ r.user }}</span>
            <span class="review-date">{{ formatDate(r.date) }}</span>
          </div>
          <div class="review-stars">
            <svg v-for="i in 5" :key="i" width="12" height="12" viewBox="0 0 24 24"
              :fill="i <= r.rating ? '#00d4ff' : '#1e2a4a'"
              stroke="#00d4ff" stroke-width="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <p class="review-comment">{{ r.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  reviews: { type: Array, default: () => [] }
})

const averageRating = computed(() => {
  if (!props.reviews.length) return 0
  const sum = props.reviews.reduce((a, r) => a + r.rating, 0)
  return (sum / props.reviews.length).toFixed(1)
})

function distCount(star) {
  return props.reviews.filter(r => r.rating === star).length
}

function distPercent(star) {
  if (!props.reviews.length) return 0
  return (distCount(star) / props.reviews.length * 100)
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return y + '-' + m + '-' + day
}
</script>

<style scoped>
.reviews-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 212, 255, 0.06);
}

.reviews-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.reviews-title {
  font-size: 16px;
  font-weight: 700;
  color: #e8edf5;
  letter-spacing: -0.3px;
}

.reviews-total {
  font-size: 13px;
  color: #4a5278;
  background: rgba(255, 255, 255, 0.04);
  padding: 1px 8px;
  border-radius: 8px;
}

.reviews-summary {
  display: flex;
  gap: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 212, 255, 0.06);
  border-radius: 10px;
  margin-bottom: 16px;
}

.summary-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  gap: 4px;
}

.score-value {
  font-size: 36px;
  font-weight: 800;
  color: #00d4ff;
  font-family: 'SF Mono', Consolas, monospace;
  line-height: 1;
}

.score-stars {
  display: flex;
  gap: 2px;
}

.score-label {
  font-size: 11px;
  color: #4a5278;
}

.summary-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
}

.dist-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dist-label {
  font-size: 11px;
  color: #8892b0;
  width: 24px;
  text-align: right;
  flex-shrink: 0;
}

.dist-track {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
}

.dist-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #6366f1);
  border-radius: 3px;
  transition: width 0.4s ease;
}

.dist-count {
  font-size: 11px;
  color: #4a5278;
  width: 20px;
  text-align: right;
  flex-shrink: 0;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 4px;
}

.reviews-list::-webkit-scrollbar { width: 4px; }
.reviews-list::-webkit-scrollbar-thumb { background: #1e2a4a; border-radius: 2px; }

.review-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 212, 255, 0.04);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.review-item:hover {
  border-color: rgba(0, 212, 255, 0.1);
}

.review-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(99, 102, 241, 0.15));
  border: 1px solid rgba(0, 212, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #00d4ff;
  flex-shrink: 0;
}

.review-body {
  flex: 1;
  min-width: 0;
}

.review-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.review-user {
  font-size: 13px;
  font-weight: 600;
  color: #e8edf5;
}

.review-date {
  font-size: 11px;
  color: #4a5278;
}

.review-stars {
  display: flex;
  gap: 1px;
  margin-bottom: 4px;
}

.review-comment {
  font-size: 13px;
  color: #8892b0;
  line-height: 1.6;
  margin: 0;
}
</style>