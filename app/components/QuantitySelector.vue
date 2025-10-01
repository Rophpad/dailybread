<template>
  <!-- Bread quantity selector -->
  <div class="w-full flex items-center justify-center space-x-4">
    <!-- <label class="text-[#3D3C3A] font-semibold text-sm">Quantity:</label> -->

    <div class="w-full flex items-center justify-between space-x-3">
      <!-- Decrease button -->
      <button
        @click="decreaseQuantity"
        :disabled="quantity <= 1"
        class="w-10 h-10 flex items-center justify-center bg-white text-[#3D3C3A] rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          ></path>
        </svg>
      </button>

      <!-- Quantity input -->
      <input
        v-model.number="quantity"
        type="number"
        min="1"
        max="99"
        class="w-64 h-10 text-center text-[#3D3C3A] font-semibold bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:border-[#3D3C3A] transition"
        @input="validateQuantity"
      />

      <!-- Increase button -->
      <button
        @click="increaseQuantity"
        :disabled="quantity >= 99"
        class="w-10 h-10 flex items-center justify-center bg-white text-[#3D3C3A] rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v12m6-6H6"
          ></path>
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

const validateQuantity = () => {
  if (quantity.value < 1) {
    quantity.value = 1;
  } else if (quantity.value > 99) {
    quantity.value = 99;
  }
};
</script>