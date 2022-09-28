<template>
  <v-container>
    <v-row class="text-center">
      <button @click="clickme">click me</button>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeComponent",

  data: () => ({}),
  methods: {
    clickme() {
      this.$toaster.success("Your toaster success message.");
      this.$swal?.fire({
        title: "Are you sure?",
        icon: "warning",
        text: `Do you want to delete this`,
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });
    },
  },
};
</script>
