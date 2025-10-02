<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: number;
  min?: number;
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  min: 1,
  max: 99,
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const quantity = computed({
  get: () => props.modelValue,
  set: (value: number) => emit("update:modelValue", value),
});

const increaseQuantity = () => {
  if (quantity.value < props.max) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > props.min) {
    quantity.value--;
  }
};

const isMinReached = computed(() => quantity.value <= props.min);
const isMaxReached = computed(() => quantity.value >= props.max);
</script>

<template>
  <div class="w-full">
    <label class="mb-3 block text-sm font-medium text-[#3D3C3A]">
      Quantité
    </label>

    <div class="flex items-center justify-center gap-4">
      <!-- Decrease button -->
      <button
        @click="decreaseQuantity"
        :disabled="isMinReached"
        class="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-[#3D3C3A] transition-all hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Diminuer la quantité"
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
            stroke-width="2.5"
            d="M20 12H4"
          />
        </svg>
      </button>

      <!-- Quantity display -->
      <div
        class="flex h-12 min-w-[80px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-2xl font-bold text-[#3D3C3A]"
      >
        {{ quantity }}
      </div>

      <!-- Increase button -->
      <button
        @click="increaseQuantity"
        :disabled="isMaxReached"
        class="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-[#3D3C3A] transition-all hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Augmenter la quantité"
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
            stroke-width="2.5"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </button>
    </div>
  </div>
</template>