<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "~/stores/product";
import { useCartStore } from "~/stores/cart";
import { useGlobalStore } from "~/stores/global";
import QuantitySelector from "./QuantitySelector.vue";
import type { Product } from "~/types/product";

// Store
const productsStore = useProductStore();
productsStore.getAllBreads();

const breads = productsStore.breads;

const cartStore = useCartStore();

const globalStore = useGlobalStore();

// State
const currentIndex = ref(0);
const carouselRef = ref<HTMLElement>();

// Computed
const items = computed(() =>
  breads.map((bread) => ({
    ...bread,
  }))
);
const currentItem = computed(() => items.value[currentIndex.value]);
const slideTransform = computed(
  () => `translateX(-${currentIndex.value * 100}%)`
);

// Navigation methods
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % items.value.length;
  globalStore.resetProductQuantity();
};

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? items.value.length - 1 : currentIndex.value - 1;
  globalStore.resetProductQuantity();
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

// Cart methods
const handleAddToCart = (item: Product) => {
  cartStore.addToCart(item, globalStore.productQuantity);
  globalStore.newProductAdded = true;
  console.log(cartStore.getCartItems());
};

// Quantity handler
const updateQuantity = (newQuantity: number) => {
  globalStore.productQuantity = newQuantity;
};
</script>

<template>
  <div class="relative w-full">
    <!-- Main carousel container -->
    <div class="relative h-80 overflow-hidden rounded-2xl shadow-xl">
      <div
        ref="carouselRef"
        class="flex h-full transition-transform duration-500 ease-in-out"
        :style="{ transform: slideTransform }"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="relative w-full flex-shrink-0"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="h-full w-full rounded-2xl bg-[#FAF9F0]/90 object-contain shadow-lg"
          />
        </div>
      </div>
    </div>

    <!-- Navigation arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/90 p-3 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white"
      aria-label="Previous slide"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/90 p-3 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white"
      aria-label="Next slide"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <!-- Dots indicator -->
    <div class="mt-4 flex justify-center space-x-2">
      <button
        v-for="(item, index) in items"
        :key="index"
        @click="goToSlide(index)"
        :aria-label="`Go to slide ${index + 1}`"
        class="h-3 w-3 rounded-full transition-all duration-200"
        :class="
          currentIndex === index
            ? 'scale-110 bg-[#8B4513]'
            : 'bg-[#8B4513]/10 hover:bg-gray-400'
        "
      />
    </div>

    <!-- Current item info -->
    <div
      v-if="currentItem"
      class="mt-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-md"
    >
      <!-- Product Info -->
      <div class="mb-6 text-center">
        <h3 class="mb-2 text-2xl font-bold text-[#3D3C3A]">
          {{ currentItem.name }}
        </h3>
        <p class="text-2xl font-bold text-[#8B4513]">
          {{ currentItem.price }}
        </p>
      </div>

      <!-- Quantity Selector -->
      <QuantitySelector
        class="mb-6"
        :modelValue="globalStore.productQuantity"
        @update:modelValue="updateQuantity"
      />

      <!-- Add to Cart Button -->
      <button
        @click="handleAddToCart(currentItem)"
        class="w-full rounded-xl py-3 text-base font-semibold shadow-md transition-all duration-200 active:scale-98 bg-[#8B4513] text-white hover:bg-[#A0522D]"
      >
        {{ "Ajouter au panier" }}
      </button>
    </div>
  </div>
</template>
