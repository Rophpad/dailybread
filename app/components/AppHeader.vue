<template>
  <div class="w-full sticky top-0 z-20 bg-[#FAF9F0]/90 backdrop-blur-md">
    <header
      class="flex items-center justify-between px-6 py-4 mt-6 mb-2 bg-white/90 backdrop-blur-md w-full mx-auto rounded-2xl shadow-lg border border-gray-200/50"
    >
      <!-- Logo Section -->
      <div class="flex items-center space-x-3">
        <!-- <div class="p-2 bg-[#FDE4BA] rounded-xl">
          <img 
            src="/dailybread.png" 
            alt="DailyBread Logo" 
            class="w-6 h-6 object-cover" 
          />
        </div> -->
        <a class="cursor-pointer" href="/">
          <h1 class="text-lg font-bold text-[#3D3C3A]">dailybread</h1>
          <p class="text-xs text-gray-500">Fresh & Delicious</p>
        </a>
      </div>

      <!-- Right Section -->
      <div class="flex items-center space-x-3">
        <!-- Shopping Bag -->
        <div class="relative">
          <a href="/cart">
            <button
              class="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="fill-none stroke-[#3D3C3A] stroke-2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
            <!-- Item count badge -->
            <div
              :class="`absolute -top-1 -right-1 w-3 h-3 bg-[#FDE4BA] rounded-full border-2 border-white ${
                globalStore.newProductAdded ? 'bg-[#8B4513]' : ''
              }`"
            ></div>
          </a>
        </div>

        <!-- Menu/Close Button -->
        <!-- <button
          class="p-2 hover:bg-[#8B4513]/10 rounded-xl transition-all duration-200 active:scale-95"
          @click="toggleMenu"
        >
          
          <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            class="fill-[#3D3C3A] transition-opacity duration-200"
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>

          
          <svg
            v-if="isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            class="fill-[#3D3C3A] transition-opacity duration-200"
          >
            <path
              d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
            />
          </svg>
        </button> -->
      </div>
    </header>

    <!-- Dropdown Menu -->
    <!-- <div
      v-if="isMenuOpen"
      class="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 z-50 overflow-hidden"
    >
      <div class="p-4">
        <nav class="space-y-2">
          <a
            href="#"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#FDE4BA]/30 transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 text-[#3D3C3A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="text-[#3D3C3A] font-medium">Profile</span>
          </a>

          <a
            href="#"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#FDE4BA]/30 transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 text-[#3D3C3A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span class="text-[#3D3C3A] font-medium">Orders</span>
          </a>

          <a
            href="#"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#FDE4BA]/30 transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 text-[#3D3C3A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span class="text-[#3D3C3A] font-medium">Favorites</span>
          </a>

          <a
            href="#"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#FDE4BA]/30 transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 text-[#3D3C3A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7v4a7 7 0 11-14 0V7"
              />
              <rect x="5" y="4" width="14" height="4" rx="2" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 17v3m-3 0h6"
              />
            </svg>
            <span class="text-[#3D3C3A] font-medium">Abonnements</span>
          </a>
        </nav>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "~/stores/global";
const globalStore = useGlobalStore();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
