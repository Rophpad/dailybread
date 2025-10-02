<template>
  <section class="border  p-8 w-full">
    <!-- <h2 class="text-center text-xl font-bold text-[#3D3C3A]"  style="font-family: 'Pacifico';">
      Get your daily bread <br />
      easily, everyday and everywhere!
    </h2> -->
    <SearchBar class="mt-8" />
    <BreadList class="mt-8" />
    <OtherOptions class="mt-8" />
    
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
