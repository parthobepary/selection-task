import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    categories: [],
    isLoading: false,
  }),
  getters: {
    categories: (state) => {
      return state.categories;
    },
    isLoading: (state) => {
      return state.isLoading;
    },
    categoryNameByID: (state) => (id) => {
      const category = state.categories.find(
        (item) => item.id === parseInt(id)
      );
      return category ? category.name : "";
    },
  },
  mutations: {
    SET_ALL(state, categories) {
      state.categories = categories;
      console.log(categories);
    },
    ADD_NEW(state, category) {
      state.categories.push(category);
    },
    UPDATE(state, category) {
      const editIndex = state.categories.findIndex(
        (element) => element.id === category.id
      );
      Object.assign(state.categories[editIndex], category);
    },
    DELETE(state, index) {
      state.categories.splice(index, 1);
    },
    LOADER_STATUS_CHANGE(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    async GET_ALL_CATEGORIES(context) {
      context.commit("LOADER_STATUS_CHANGE", true);
      await axios
        .get(
          "https://summer-canyon-zh9zckabi5cf.vapor-farm-f1.com/api/written-exam"
        )
        .then((res) => {
          context.commit("LOADER_STATUS_CHANGE", false);
          context.commit("SET_ALL", res.data.data);
        })
        .catch(() => {
          context.commit("LOADER_STATUS_CHANGE", false);
        });
    },
  },
});

