<template>
  <div>
    <div>
      <h1>thisi is slot</h1>
      {{ nameArray }}
      <v-btn @click="printHello('hello')">ok</v-btn>
    </div>

    <div>
      <router-link to="/crud">got to crud</router-link>
    </div>
    <div>
      <slot name="partho" :tArray="titleArray"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "SlotComponents",
  data() {
    return {
      titleArray: ["bepary", "dash", "hosain", "zillur"],
    };
  },
  props: ["nameArray", "printHello"],
};
</script>
<style lang=""></style>
