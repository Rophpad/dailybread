<template>
  <section class="px-8 w-full">
    <div class="my-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-[#3D3C3A] mb-6">Mon Panier</h1>
      <button
        v-if="cartItems.length > 0"
        @click="cartStore.clearCart()"
        class="mb-4 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
      >
        Vider le panier
      </button>
    </div>

    <!-- Cart items will go here -->
    <div class="space-y-4 w-full">
      <!-- Empty cart message -->
      <div v-if="cartItems.length === 0" class="text-center py-8">
        <p class="text-gray-500 mb-4">Votre panier est vide</p>
        <NuxtLink
          to="/"
          class="inline-block px-6 py-3 bg-[#FDE4BA] text-[#3D3C3A] rounded-xl font-semibold hover:bg-[#fcd58a] transition"
        >
          Continuer mes achats
        </NuxtLink>
      </div>

      <!-- Cart items -->
      <div v-else class="space-y-4">
        <!-- Cart items list -->
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white rounded-xl p-4 shadow-sm relative"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img
                :src="item.product.image"
                :alt="item.product.name"
                class="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 class="font-semibold text-[#3D3C3A]">{{ item.product.name }}</h3>
                <p class="text-sm text-gray-500">{{ item.product.price }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="decreaseQuantity(item)"
                class="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button 
                @click="increaseQuantity(item)"
                class="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>
          <!-- Floating remove button -->
          <button
            @click="cartStore.removeFromCart(item.id)"
            class="absolute -top-2 -left-2 size-6 flex items-center justify-center bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
            aria-label="Retirer du panier"
          >
            &times;
          </button>
        </div>

        <!-- Total and checkout -->
        <div class="mt-6 bg-white rounded-xl p-4 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-[#3D3C3A]">Total</span>
            <span class="text-lg font-bold text-[#3D3C3A]">
              ${{ total.toFixed(2) }}
            </span>
          </div>
          <button
            class="w-full py-3 bg-[#FDE4BA] text-[#3D3C3A] rounded-xl font-semibold hover:bg-[#fcd58a] transition"
          >
           Commander
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from "~/stores/cart"

const cartStore = useCartStore()

// Make cartItems reactive using computed
const cartItems = computed(() => cartStore.cartItems)

// Make total reactive using computed
const total = computed(() => cartStore.getTotalPrice())

// Add quantity management functions
const increaseQuantity = (item) => {
  cartStore.addToCart(item.product, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.addToCart(item.product, item.quantity - 1)
  } else {
    cartStore.removeFromCart(item.id)
  }
}

definePageMeta({
  title: "Mon Panier - DailyBread",
})
</script>