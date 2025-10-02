<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const isActive = ref(false)

const handleFocus = () => {
  isActive.value = true
}

const handleBlur = () => {
  isActive.value = false
}

const clearSearch = () => {
  searchQuery.value = ''
}

// Emit search events
const emit = defineEmits(['search', 'clear'])

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleClear = () => {
  clearSearch()
  emit('clear')
}
</script>

<template>
  <div class="w-full">
    <!-- Search Label -->
    <!-- <label class="block text-sm font-medium text-[#3D3C3A] mb-2">
      Search for bread
    </label> -->
    
    <!-- Search Input Container -->
    <div 
      class="relative flex items-center bg-white rounded-xl border-2 transition-all duration-200 shadow-sm"
      :class="isActive 
        ? 'border-[#3D3C3A] shadow-md' 
        : 'border-gray-200 hover:border-gray-300'"
    >
      <!-- Search Icon -->
      <div class="pl-4 pr-3">
        <svg 
          class="w-5 h-5 transition-colors duration-200"
          :class="isActive ? 'text-[#3D3C3A]' : 'text-gray-400'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search sourdough, baguette..."
        class="flex-1 py-3 pr-4 text-[#3D3C3A] placeholder-gray-400 bg-transparent border-none outline-none"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
      >
      
      <!-- Clear Button -->
      <button
        v-if="searchQuery.length > 0"
        @click="handleClear"
        class="p-2 mr-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Search Suggestions (Optional) -->
    <div v-if="searchQuery.length > 0" class="mt-2 text-xs text-gray-500">
      Press Enter to search for "{{ searchQuery }}"
    </div>
  </div>
</template>