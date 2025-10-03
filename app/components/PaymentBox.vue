<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useGlobalStore } from "@/stores/global";

const cartStore = useCartStore();
const globalStore = useGlobalStore();

const orderSummary = cartStore.getOrderSummary();

const subtotal = computed(() => cartStore.getTotalPrice());
const tax = computed(() => subtotal.value * 0); // Assuming 0%
const total = computed(() => subtotal.value + tax.value);

// Emit payment event
const emit = defineEmits(["payment"]);

const handlePayment = () => {
  globalStore.handleCommand(cartStore.cartItems, total.value);
};
</script>

<template>
  <div class="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4">
    <!-- Order Summary Header -->
    <h3 class="text-lg font-semibold text-[#3D3C3A] mb-4">Order Summary</h3>

    <!-- Order Details -->
    <div class="space-y-2 mb-4">
      <!-- Bread -->
      <div
        v-for="(item, index) in orderSummary"
        :key="item.id || index"
        class="flex justify-between items-center"
      >
        <span class="text-sm text-gray-600">
          {{ item.name }} ({{ item.quantity || 1 }}x)
        </span>
        <span class="text-sm font-medium text-[#3D3C3A]">
          {{ item.totalPrice }} FCFA
        </span>
      </div>

      <!-- Options -->
      <!-- <div v-if="optionsTotal > 0" class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Add-ons</span>
        <span class="text-sm font-medium text-[#3D3C3A]">
          ${{ optionsTotal.toFixed(2) }}
        </span>
      </div> -->

      <!-- Divider -->
      <hr class="my-3 border-gray-200" />

      <!-- Subtotal -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Subtotal</span>
        <span class="text-sm font-medium text-[#3D3C3A]">
          {{ subtotal.toFixed(2) }} FCFA
        </span>
      </div>

      <!-- Tax -->
      <!-- <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Tax (8%)</span>
        <span class="text-sm font-medium text-[#3D3C3A]">
          ${{ tax.toFixed(2) }}
        </span>
      </div> -->

      <!-- Divider -->
      <hr class="my-3 border-gray-200" />

      <!-- Total -->
      <div class="flex justify-between items-center">
        <span class="text-base font-semibold text-[#3D3C3A]">Total</span>
        <span class="text-lg font-bold text-[#3D3C3A]">
          {{ total.toFixed(2) }} FCFA
        </span>
      </div>
    </div>

    <!-- Payment Button -->
    <button
      @click="handlePayment"
      class="w-full px-4 py-3 rounded-xl bg-[#FDE4BA] text-[#3D3C3A] font-semibold hover:bg-[#fcd58a] transition-all duration-200 shadow-sm hover:shadow-md"
    >
      Commander
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
