<template>
  <div class="w-full">
    <label class="block text-[#3D3C3A] font-medium text-sm mb-3">
      Quantité
    </label>

    <div class="flex items-center justify-center gap-4">
      <!-- Decrease button -->
      <button
        @click="decreaseQuantity"
        :disabled="quantity <= 1"
        class="w-12 h-12 flex items-center justify-center bg-gray-50 text-[#3D3C3A] rounded-xl border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Diminuer la quantité"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M20 12H4"
          />
        </svg>
      </button>

      <!-- Quantity display -->
      <div
        class="min-w-[80px] h-12 flex items-center justify-center text-2xl font-bold text-[#3D3C3A] bg-gray-50 rounded-xl border border-gray-200"
      >
        {{ quantity }}
      </div>

      <!-- Increase button -->
      <button
        @click="increaseQuantity"
        :disabled="quantity >= 99"
        class="w-12 h-12 flex items-center justify-center bg-gray-50 text-[#3D3C3A] rounded-xl border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Augmenter la quantité"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const quantity = ref(1);

const increaseQuantity = () => {
  if (quantity.value < 99) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
</script>