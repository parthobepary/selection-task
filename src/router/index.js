import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import HoverCards from "../views/HoverCards.vue";
import LogIn from "../views/LogIn.vue";
import MySlot from "../views/MySlot.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/slot",
    name: "slot",
    component: MySlot,
  },
  {
    path: "/cards",
    name: "cards",
    component: HoverCards,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
