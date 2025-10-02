<template>
  <section class="p-8 w-full">
    <h1 class="text-2xl font-bold text-[#3D3C3A] mb-6">Mon Panier</h1>
    
    <!-- Cart items will go here -->
    <div class="space-y-4 w-full ">
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
      <div v-else>
        <!-- Cart items list -->
        <div v-for="item in cartItems" :key="item.id" class="bg-white rounded-xl p-4 shadow-sm relative">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
              <div>
            <h3 class="font-semibold text-[#3D3C3A]">{{ item.name }}</h3>
            <p class="text-sm text-gray-500">{{ item.price }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button class="w-8 h-8 bg-gray-100 rounded-lg">-</button>
              <span>{{ item.quantity }}</span>
              <button class="w-8 h-8 bg-gray-100 rounded-lg">+</button>
            </div>
          </div>
          <!-- Floating remove button -->
          <button
            @click="removeFromCart(item.id)"
            class="absolute -top-4 -left-4 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
            aria-label="Retirer du panier"
          >
            &times;
          </button>
        </div>
        
        <!-- Total and checkout -->
        <div class="mt-6 bg-white rounded-xl p-4 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-[#3D3C3A]">Total</span>
            <span class="text-lg font-bold text-[#3D3C3A]">${{ total.toFixed(2) }}</span>
          </div>
          <button class="w-full py-3 bg-[#FDE4BA] text-[#3D3C3A] rounded-xl font-semibold hover:bg-[#fcd58a] transition">
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample cart data (in a real app, this would come from a store)
const cartItems = ref([
  {
    id: 1,
    name: 'Sourdough',
    price: '$3.50',
    image: '/pain.png',
    quantity: 2
  }
])

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''))
    return sum + (price * item.quantity)
  }, 0)
})

// Page meta
definePageMeta({
  title: 'Mon Panier - DailyBread'
})
</script>