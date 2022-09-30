<template>
  <div>
    <div>
      <h1>thisi is slot</h1>
      {{ nameArray }}
      <v-btn @click="printHello('hello')">ok</v-btn>
    </div>
    <!-- <div>
      <ul>
        <li v-for="title in titleArray" :key="title">
          <slot :title="title"></slot>
        </li>
      </ul>
    </div> -->
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
