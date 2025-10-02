import { defineStore } from "pinia";
import { accompanimentsList, breadsList } from "~/data/datas";

export const useProductsStore = defineStore("products", () => {
  const breads = ref(breadsList);
  const accompaniments = ref(accompanimentsList);
  const getAllBreads = () => {
    return breads.value;
  };
  const getOneBread = (id: number) => {
    return breads.value.find((bread) => bread.id === id);
  };

  const getAllAccompaniments = () => {
    return accompaniments.value;
  };
  const getOneAccompaniment = (id: number) => {
    return accompaniments.value.find(
      (accompaniment) => accompaniment.id === id
    );
  };

  const setInTheCartStatus = (id: number) => {
    const item =
      breads.value.find((bread) => bread.id === id) ||
      accompaniments.value.find((accompaniment) => accompaniment.id === id);
    if (item) {
      item.inTheCart = !item.inTheCart;
    }
  };

  return {
    breads,
    accompaniments,
    getAllBreads,
    getOneBread,
    getAllAccompaniments,
    getOneAccompaniment,
    setInTheCartStatus,
  };
});
