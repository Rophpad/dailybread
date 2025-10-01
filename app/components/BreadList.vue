<script setup lang="ts">
import { ref } from 'vue'

const items = [
    { image: '/pain.png', name: 'Sourdough', price: '$3.50' },
    { image: 'https://picsum.photos/300/200?random=2', name: 'Baguette', price: '$2.00' },
    { image: 'https://picsum.photos/300/200?random=3', name: 'Rye Bread', price: '$4.00' },
    { image: 'https://picsum.photos/300/200?random=4', name: 'Ciabatta', price: '$3.00' },
    { image: 'https://picsum.photos/300/200?random=5', name: 'Focaccia', price: '$3.75' },
    { image: 'https://picsum.photos/300/200?random=6', name: 'Whole Wheat', price: '$2.50' }
]

const currentIndex = ref(0)
const carouselRef = ref<HTMLElement>()

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % items.length
}

const prevSlide = () => {
    currentIndex.value = currentIndex.value === 0 ? items.length - 1 : currentIndex.value - 1
}

const goToSlide = (index: number) => {
    currentIndex.value = index
}
</script>

<template>
    <div class="relative w-full max-w-sm mx-auto">
        <!-- Main carousel container -->
        <div class="relative h-80 overflow-hidden rounded-2xl bg- shadow-xl">
            <div 
                ref="carouselRef"
                class="flex transition-transform duration-500 ease-in-out h-full"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
                <div 
                    v-for="(item, index) in items" 
                    :key="index"
                    class="w-full flex-shrink-0 relative"
                >
                    <!-- Image -->
                    <img 
                        :src="item.image" 
                        :alt="item.name"
                        class="w-full h-full object-cover bg-[#FAF9F0]/90 backdrop-blur-md"
                    >
                    
                    <!-- Content overlay -->
                    <!-- <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 class="text-[#3D3C3A] text-lg font-semibold mb-1">{{ item.name }}</h3>
                        <p class="text-[#8B4513] text-lg font-bold">{{ item.price }}</p>
                    </div> -->
                </div>
            </div>
        </div>

        <!-- Navigation arrows -->
        <button 
            @click="prevSlide"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>

        <button 
            @click="nextSlide"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>

        <!-- Dots indicator -->
        <div class="flex justify-center mt-4 space-x-2">
            <button
                v-for="(item, index) in items"
                :key="index"
                @click="goToSlide(index)"
                class="w-3 h-3 rounded-full transition-all duration-200"
                :class="currentIndex === index 
                    ? 'bg-[#8B4513] scale-110' 
                    : 'bg-[#8B4513]/10 hover:bg-gray-400'"
            />
        </div>

        <!-- Current item info below carousel -->
        <div class="mt-4 text-center  bg-white rounded-lg border-[#8B4513]/50 shadow-sm py-3 px-6 flex flex-col items-center gap-2">
            <h3 class="text-xl font-semibold text-[#3D3C3A] mb-1">
            {{ items[currentIndex]?.name }}
            </h3>
            <p class="text-lg font-bold text-[#8B4513]">
            {{ items[currentIndex]?.price }}
            </p>
            <button
            class="mt-2 px-4 py-1 text-sm font-medium bg-[#8B4513] text-white rounded-xl shadow hover:bg-[#A0522D] transition"
            >
            Ajouter au panier
            </button>
        </div>
    </div>
</template>