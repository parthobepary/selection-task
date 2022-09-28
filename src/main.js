import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

//for axois
import axios from "axios";
import VueAxios from "vue-axios";

//for toaster
import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";

//for sweet alart
import "sweetalert2/dist/sweetalert2.min.css";
import VueSweetalert2 from "vue-sweetalert2";

Vue.use(VueSweetalert2);
Vue.use(Toaster, { timeout: 5000 });
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
