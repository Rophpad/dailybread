import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "~/types/product";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartItems = ref<Product[]>([]);

    const getCartItems = () => {
      return cartItems.value;
    };

    const addToCart = (item: Product) => {
      item.inTheCart = true;
      const index = cartItems.value.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (index !== -1) {
        cartItems.value[index] = { ...cartItems.value[index], ...item };
      } else {
        cartItems.value.push({ ...item });
      }
    };

    const removeFromCart = (id: number) => {
      const item = cartItems.value.find((item) => item.id === id);
      if (item) {
        item.inTheCart = false;
      }
      cartItems.value = cartItems.value.filter((item) => item.id !== id);
    };

    const clearCart = () => {
      cartItems.value = [];
    };

    const getOrderSummary = () => {
      return cartItems.value.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        totalPrice: (parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2),
      }));
    }

    const getTotalPrice = () => {
      return cartItems.value.reduce((total, item) => {
        const priceNumber = parseFloat(item.price.replace("$", ""));
        return total + priceNumber * item.quantity;
      }, 0);
    };

    return {
      cartItems,
      getCartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getOrderSummary,
      getTotalPrice,
    };
  },
  {
    // Add persistence configuration
    persist: {
      key: "dailybread-cart",
      storage: persistedState.localStorage,
    },
  }
);
