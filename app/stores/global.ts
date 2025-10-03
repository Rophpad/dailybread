import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
  const newProductAdded = ref(false);
  const productQuantity = ref(1);

  const resetProductQuantity = () => {
    productQuantity.value = 1;
  };
  const showNewProductIsAdded = () => {
    newProductAdded.value = true;
    setTimeout(() => {
      newProductAdded.value = false;
    }, 2000); // Hide after 2 seconds
  };

  return {
    newProductAdded,
    productQuantity,
    resetProductQuantity,
    showNewProductIsAdded,
  };
});
