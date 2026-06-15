import { ref, computed } from 'vue'

const cartItems = ref([])

export function useCart() {
  const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const cartSummary = computed(() => {
    const subtotal = cartTotal.value
    const shipping = subtotal >= 500 ? 0 : 30
    const tax = Math.round(subtotal * 0.13)
    return { subtotal, shipping, tax, total: subtotal + shipping + tax }
  })

  function addToCart(product, quantity = 1) {
    const existing = cartItems.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        quantity
      })
    }
  }

  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
  }

  function updateQuantity(productId, quantity) {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    cartItems.value = []
  }

  return {
    cartItems,
    cartCount,
    cartTotal,
    cartSummary,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}
