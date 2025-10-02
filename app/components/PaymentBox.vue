<script setup lang="ts">
import { computed } from 'vue'

// Props to receive order data
const props = defineProps<{
  breadPrice?: number
  quantity?: number
  selectedOptions?: string[]
}>()

// Sample options data (in a real app, this would come from a store or props)
const optionsPrices = {
  butter: 0.50,
  jam: 0.75,
  honey: 1.00,
  cheese: 0.80,
  nutella: 1.25,
  slice: 0.25,
  toasted: 0,
  bag: 0.30
}

// Calculate totals
const breadTotal = computed(() => {
  return (props.breadPrice || 3.50) * (props.quantity || 1)
})

const optionsTotal = computed(() => {
  if (!props.selectedOptions) return 0
  return props.selectedOptions.reduce((total, optionId) => {
    return total + (optionsPrices[optionId as keyof typeof optionsPrices] || 0)
  }, 0) * (props.quantity || 1)
})

const subtotal = computed(() => {
  return breadTotal.value + optionsTotal.value
})

const tax = computed(() => {
  return subtotal.value * 0.08 // 8% tax
})

const total = computed(() => {
  return subtotal.value + tax.value
})

// Emit payment event
const emit = defineEmits(['payment'])

const handlePayment = () => {
  emit('payment', {
    subtotal: subtotal.value,
    tax: tax.value,
    total: total.value
  })
}
</script>

<template>
  <div class="w-full  bg-white rounded-xl border border-gray-200 shadow-sm p-4">
    <!-- Order Summary Header -->
    <h3 class="text-lg font-semibold text-[#3D3C3A] mb-4">Order Summary</h3>
    
    <!-- Order Details -->
    <div class="space-y-2 mb-4">
      <!-- Bread -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">
          Bread ({{ props.quantity || 1 }}x)
        </span>
        <span class="text-sm font-medium text-[#3D3C3A]">
          ${{ breadTotal.toFixed(2) }}
        </span>
      </div>
      
      <!-- Options -->
      <div v-if="optionsTotal > 0" class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Add-ons</span>
        <span class="text-sm font-medium text-[#3D3C3A]">
          ${{ optionsTotal.toFixed(2) }}
        </span>
      </div>
      
      <!-- Divider -->
      <hr class="my-3 border-gray-200">
      
      <!-- Subtotal -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Subtotal</span>
        <span class="text-sm font-medium text-[#3D3C3A]">
          ${{ subtotal.toFixed(2) }}
        </span>
      </div>
      
      <!-- Tax -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Tax (8%)</span>
        <span class="text-sm font-medium text-[#3D3C3A]">
          ${{ tax.toFixed(2) }}
        </span>
      </div>
      
      <!-- Divider -->
      <hr class="my-3 border-gray-200">
      
      <!-- Total -->
      <div class="flex justify-between items-center">
        <span class="text-base font-semibold text-[#3D3C3A]">Total</span>
        <span class="text-lg font-bold text-[#3D3C3A]">
          ${{ total.toFixed(2) }}
        </span>
      </div>
    </div>
    
    <!-- Payment Button -->
    <button 
      @click="handlePayment"
      class="w-full px-4 py-3 rounded-xl bg-[#FDE4BA] text-[#3D3C3A] font-semibold hover:bg-[#fcd58a] transition-all duration-200 shadow-sm hover:shadow-md"
    >
      Pay Now
    </button>
    
    <!-- Payment Methods -->
    <div class="mt-3 flex items-center justify-center space-x-2">
      <span class="text-xs text-gray-500">We accept:</span>
      <div class="flex space-x-1">
        <span class="text-xs bg-gray-100 px-2 py-1 rounded">💳</span>
        <span class="text-xs bg-gray-100 px-2 py-1 rounded">📱</span>
        <span class="text-xs bg-gray-100 px-2 py-1 rounded">💵</span>
      </div>
    </div>
  </div>
</template>