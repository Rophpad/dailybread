import { defineStore } from "pinia";
import { ref } from "vue";
import type { CartItem } from "~/types/cartItem";
import type { Product } from "~/types/product";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartItems = ref<CartItem[]>([]);
    const index = ref(0);

    const getCartItems = () => {
      return cartItems.value;
    };

    const addToCart = (item: Product, quantity: number) => {
      const existingItem = cartItems.value.find(
        (ci) => ci.product?.id === item.id
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cartItems.value.push({
          id: index.value++,
          product: item,
          quantity,
        });
      }
    };

    const isItemInCard = (itemId: number) => {
      const existingItem = cartItems.value.find(
        (ci) => ci.id === itemId
      );
      return existingItem ? true : false;
    };

    const removeFromCart = (id: number) => {
      cartItems.value = cartItems.value.filter((item) => item.id !== id);
    };

    const clearCart = () => {
      cartItems.value = [];
    };

    const getOrderSummary = () => {
      try {
        if (cartItems.value.length === 0) return [];
        return cartItems.value
          .filter((item) => item?.product?.name) // Safe navigation
          .map((item) => ({
            id: item.id,
            name: item.product.name,
            quantity: item.quantity,
            totalPrice: (
              parseFloat(item.product.price.replace(" FCFA", "")) *
              item.quantity
            ).toFixed(2),
          }));
      } catch (error) {
        console.error("Error in getOrderSummary:", error);
        return [];
      }
    };

    const getTotalPrice = () => {
      try {
        if (cartItems.value.length === 0) return 0;
        return cartItems.value
          .filter((item) => item?.product?.price) // Safe navigation
          .reduce((total, item) => {
            const priceNumber = parseFloat(item.product.price.replace("$", ""));
            return total + priceNumber * item.quantity;
          }, 0);
      } catch (error) {
        console.error("Error in getTotalPrice:", error);
        return 0;
      }
    };

    return {
      cartItems,
      getCartItems,
      addToCart,
      isItemInCard,
      removeFromCart,
      clearCart,
      getOrderSummary,
      getTotalPrice,
    };
  },
  {
    persist: {
      key: "dailybread-cart",
      storage: persistedState.localStorage,
    },
  }
);
