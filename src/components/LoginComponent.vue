<template>
  <v-container>
    <template>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @click.prevent="submit"
      >
        <v-text-field
          v-model="fromData.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="fromData.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn x-large block :disabled="!valid" color="success" @click="login"
          >Register</v-btn
        >
      </v-form>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      fromData: {
        email: "",
        password: "",
      },
      show1: false,
      valid: true,
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  computed: {
    from() {
      const fromData = new fromData();
      fromData.append("title", this.fromData.title);
      fromData.append("password", this.fromData.password);
      return fromData;
    },
  },
  methods: {
    login() {
      this.axios
        .post("http://localhost:8000/api/login", this.fromData)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token);
            this.$toaster.success("Your toaster success message.");
            this.$router.push("/");
          }
        })
        .catch((er) => {
          console.log(er);
          this.$toaster.error("login faild.");
        });
    },
  },
};
</script>
