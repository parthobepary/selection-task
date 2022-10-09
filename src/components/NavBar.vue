<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/slot">MySlot</router-link>
      <router-link to="/cards">Cards</router-link>
      <router-link to="/crud">Crud</router-link>
      <router-link v-if="!isToken" to="/login">Login</router-link>
      <button
        @click="logout()"
        class="mr-5 pink py-1 rounded-lg px-3"
        v-if="isToken"
      >
        Logout
      </button>
      <router-link v-if="!isToken" to="/ragistration">Signup</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  props: ["isToken", "logout"],
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: black;
  text-decoration: none;
  margin-right: 20px;
  background-color: bisque;
  padding: 5px 10px;
  border-radius: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
  background-color: rgb(48, 29, 5);
}
</style>
