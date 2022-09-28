<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/slot">MySlot</router-link>
      <router-link to="/cards">Cards</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
  </div>
</template>

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
