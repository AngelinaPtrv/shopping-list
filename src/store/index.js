import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store =  new Vuex.Store ({
  state: {
    products: [
      {name: "Хлеб", quantity: 1, units: "шт"},
      {name: "Помидоры", quantity: 2, units: "кг"},
      {name: "Огурцы", quantity: 2, units: "кг"},
      {name: "Пиво", quantity: 6, units: "бан"}
      ],
    cleaning: [
      {name: "Frosh", quantity: 1, units: "шт"},
      {name: "Соды", quantity: 2, units: "упак"},
      {name: "Порошок", quantity: 5, units: "кг"},
      {name: "Пакеты", quantity: 3, units: "упак"}
    ],
    clothes: [
      {name: "Брюки", quantity: 1, units: "пара"},
      {name: "Пиджак", quantity: 2, units: "шт"},
      {name: "Обувь", quantity: 1, units: "пара"},
      {name: "Шапка", quantity: 3, units: "шт"}
    ]
  },
  mutations: {
    // setProducts(state) {
    //   state.products
    // }
  },
  actions: {

  },

  getters: {
    getProducts(state) {
      return state.products
    }
  }
})

export default store;
