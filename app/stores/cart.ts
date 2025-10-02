import { defineStore } from 'pinia'
import { breads, accompaniments } from '~/data/datas'

export interface CartItem {
  id: string
  name: string
  price: string
  image: string
  quantity: number
  type: 'bread' | 'accompaniment'
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    
    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''))
        return total + (price * item.quantity)
      }, 0)
    },

    cartItems: (state) => state.items
  },

  actions: {
    addItem(item: Omit<CartItem, 'id'>) {
      const existingItem = this.items.find(
        cartItem => cartItem.name === item.name && cartItem.type === item.type
      )

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push({
          ...item,
          id: `${item.type}-${item.name}-${Date.now()}`
        })
      }
    },

    removeItem(id: string) {
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(id: string, quantity: number) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(id)
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart() {
      this.items = []
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    }
  }
})

// If you are using pinia-plugin-persistedstate, add this to your store definition instead:
// export const useCartStore = defineStore('cart', {
//   ...store options...
//   persist: true
// })