<script setup lang="ts">
import { ref, watch } from "vue";
import { useProductStore } from "~/stores/product";
import { useCartStore } from "~/stores/cart";

// Store
const productsStore = useProductStore();
productsStore.getAllAccompaniments();
const accompaniments = productsStore.accompaniments;

const cartStore = useCartStore();

const isOpen = ref(false);
const selectedOptions = ref<string[]>([]);

const options = accompaniments.map((item) => ({
  id: item.name.toLowerCase().replace(/\s+/g, "-"),
  label: item.name,
  price: item.price,
  originalItem: item // Keep reference to original item
}));

const toggleOptions = () => {
  isOpen.value = !isOpen.value;
};

const toggleOption = (optionId: string) => {
  const index = selectedOptions.value.indexOf(optionId);
  const option = options.find(opt => opt.id === optionId);
  
  if (index > -1) {
    // Remove from selectedOptions
    selectedOptions.value.splice(index, 1);
    
    // Remove from cart
    if (option) {
      // Find the cart item by matching the product
      const cartItems = cartStore.getCartItems();
      const cartItem = cartItems.find(item => 
        item.product.name === option.originalItem.name
      );
      if (cartItem) {
        cartStore.removeFromCart(cartItem.id);
      }
    }
  } else {
    // Add to selectedOptions
    selectedOptions.value.push(optionId);
    
    // Add to cart
    if (option) {
      cartStore.addToCart({ ...option.originalItem, type: "accompaniment" }, 1);
    }
  }
};

const isSelected = (optionId: string) => {
  return selectedOptions.value.includes(optionId);
};

// Watch for changes in selectedOptions and update cart
watch(selectedOptions, (newSelectedOptions, oldSelectedOptions) => {
  // Handle additions
  const added = newSelectedOptions.filter(opt => !oldSelectedOptions?.includes(opt));
  added.forEach(optionId => {
    const option = options.find(opt => opt.id === optionId);
    if (option) {
      cartStore.addToCart({ ...option.originalItem, type: "accompaniment" }, 1);
    }
  });

  // Handle removals
  if (oldSelectedOptions) {
    const removed = oldSelectedOptions.filter(opt => !newSelectedOptions.includes(opt));
    removed.forEach(optionId => {
      const option = options.find(opt => opt.id === optionId);
      if (option) {
        // Find and remove from cart
        const cartItems = cartStore.getCartItems();
        const cartItem = cartItems.find(item => 
          item.product.name === option.originalItem.name
        );
        if (cartItem) {
          cartStore.removeFromCart(cartItem.id);
        }
      }
    });
  }
}, { deep: true });
</script>

<template>
  <div class="w-full">
    <!-- Toggle Button -->
    <button
      @click="toggleOptions"
      class="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition"
    >
      <span class="text-[#3D3C3A] font-semibold">Accompaniments List</span>
      <svg
        class="w-5 h-5 text-[#3D3C3A] transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <!-- Options List -->
    <div
      class="overflow-hidden transition-all duration-300"
      :class="isOpen ? 'h-max opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="mt-2 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div class="p-2">
          <div
            v-for="option in options"
            :key="option.id"
            class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
            @click="toggleOption(option.id)"
          >
            <div class="flex items-center space-x-3">
              <!-- Checkbox -->
              <div
                class="w-5 h-5 rounded border-2 flex items-center justify-center transition"
                :class="
                  isSelected(option.id)
                    ? 'bg-[#3D3C3A] border-[#3D3C3A]'
                    : 'border-gray-300 hover:border-[#3D3C3A]'
                "
              >
                <svg
                  v-if="isSelected(option.id)"
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <!-- Label -->
              <span class="text-[#3D3C3A] font-medium">{{ option.label }}</span>
            </div>

            <!-- Price -->
            <span
              class="text-sm font-semibold"
              :class="
                option.price === 'Free' ? 'text-green-600' : 'text-[#8B4513]'
              "
            >
              {{ option.price }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Options Summary -->
    <div
      v-if="selectedOptions.length > 0"
      class="mt-3 p-3 bg-[#FDE4BA]/50 rounded-lg"
    >
      <p class="text-sm text-[#3D3C3A] font-medium mb-1">Added to Cart:</p>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="optionId in selectedOptions"
          :key="optionId"
          class="px-2 py-1 bg-[#3D3C3A] text-white text-xs rounded-full"
        >
          {{ options.find((opt) => opt.id === optionId)?.label }}
        </span>
      </div>
    </div>
  </div>
</template>