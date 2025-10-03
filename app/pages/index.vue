<template>
  <section class="px-8 w-full">
    <h2 class="mt-8 text-center text-xl font-bold text-[#3D3C3A]" >
      Votre pain quotidien, <br /> simplement, partout, tous les jours !
    </h2>
    <SearchBar class="mt-8" />
    <BreadList class="mt-8" />
    <AccompanimentsList class="mt-8" />
    
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
