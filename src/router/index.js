import Vue from "vue";
import VueRouter from "vue-router";
import PageNotFound from "../components/PageNotFound.vue";
import CrudOperation from "../views/CrudOperation.vue";
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
    meta: { needsAuth: true },
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
  {
    path: "/crud",
    name: "crud",
    component: CrudOperation,
    meta: { needsAuth: true },
  },
  {
    path: "/ragistration",
    name: "ragistration",
    component: CrudOperation,
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.needsAuth)) {
    if (token) {
      next();
      return;
    }
    next("/login");
  } else {
    if (token) {
      if (to.path == "/login" || to.path == "/ragistration") {
        router.go(-1);
      }
    }
    next();
  }
});

export default router;
