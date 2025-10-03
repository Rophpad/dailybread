import { defineStore } from "pinia";
import { accompanimentsList, breadsList } from "~/data/datas";

export const useProductStore = defineStore("product", () => {
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

  return {
    breads,
    accompaniments,
    getAllBreads,
    getOneBread,
    getAllAccompaniments,
    getOneAccompaniment,
  };
});
