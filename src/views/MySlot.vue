<template>
  <div>
    <h1>I am trying to gather deep knowladge abot slot</h1>
    <hr />
    <div>
      <SlotComponents
        :nameArray="nameArray"
        :printHello="printHello"
      ></SlotComponents>
    </div>
    <div>
      <SlotComponents>
        <template v-slot:partho="{ tArray }">
          {{ tArray }}
        </template>
      </SlotComponents>
    </div>
  </div>
</template>
<script>
import SlotComponents from "@/components/SlotComponents.vue";
export default {
  name: "MySlot",
  data() {
    return {
      nameArray: ["pallob", "anik", "nayeem", "jahid"],
      titleArray: ["bepary", "dash", "hosain", "zillur"],
    };
  },
  components: {
    SlotComponents,
  },
  methods: {
    printHello(payload) {
      alert(`oi ${payload}`);
    },
  },
};
</script>
<style lang="scss"></style>
