<template>
  <v-app>
    <div>
      <NavBar :isToken="isToken" :logout="logout"></NavBar>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  data() {
    return {
      isToken: false,
    };
  },
  components: {
    NavBar,
  },
  mounted() {
    setInterval(() => {
      this.isLginOrNot();
    }, 100);
  },
  methods: {
    isLginOrNot() {
      this.isToken = localStorage.getItem("token") ? true : false;
    },
    logout() {
      localStorage.removeItem("token");
    },
  },
};
</script>
