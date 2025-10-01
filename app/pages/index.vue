<template>
  <section class="p-8">
    <!-- <h2 class="text-center text-xl font-bold text-[#3D3C3A]"  style="font-family: 'Pacifico';">
      Get your daily bread <br />
      easily, everyday and everywhere!
    </h2> -->
    <SearchBar class="mt-8" />
    <BreadList class="mt-8" />
    <QuantitySelector class="mt-8" />
    <OtherOptions class="mt-8" />
    <!-- <button
      class="w-full px-4 py-3 rounded-2xl border border-black/20 bg-[#FDE4BA] text-sm text-[#3D3C3A] font-semibold mt-8 hover:bg-[#fcd58a] transition"
    >
      Pay
    </button> -->
    <PaymentBox
      :bread-price="3.5"
      :quantity="quantity"
      :selected-options="selectedOptions"
      @payment="handlePayment"
      class="mt-8"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'

const quantity = ref(1)
const selectedOptions = ref([])

function handlePayment(paymentInfo) {
  // handle payment logic here
}
</script>
