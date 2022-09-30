<template>
  <v-container fluid>
    <v-data-table
      dense
      :headers="headers"
      :items="categories"
      :search="search"
      :footer-props="footerProps"
      :items-per-page="20"
      class="elevation-1"
      :loading="isLoading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title> {{ pageInfo.pageName }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="mr-2">
            <v-text-field
              v-model="search"
              label="Search"
              class="mt-3"
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" persistent max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                style="background-color: #01579b"
                class="mx-2 white--text"
                v-bind="attrs"
                icon
                v-on="on"
                @click="create"
                small
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <!-- <validation-observer ref="observer" v-slot="{ invalid }"> -->
              <v-form ref="form" @submit.prevent="takeAction">
                <v-card-title class="text-h5">
                  {{ editMode ? "Update " : "Create" }}
                  {{ pageInfo.pageName }}
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row dense align="baseline" justify="center">
                      <v-col cols="12" xs="12" sm="12">
                        <!-- <validation-provider
                            v-slot="{ errors }"
                            name="Name"
                            rules="required|max:191"
                            vid="name"
                          > -->
                        <v-text-field
                          v-model="formData.title"
                          label="title"
                          required
                          dense
                          outlined
                        ></v-text-field>
                        <!-- </validation-provider> -->
                      </v-col>
                      <v-col cols="12" sm="12">
                        <!-- <validation-provider
                            v-slot="{ errors }"
                            name="Description"
                            vid="description"
                            rules=""
                          > -->
                        <v-textarea
                          v-model="formData.description"
                          clearable
                          clear-icon="mdi-close-circle"
                          label="Description"
                          dense
                          outlined
                          height="75"
                        ></v-textarea>
                        <!-- </validation-provider> -->
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    class="mx-2 white--text"
                    type="submit"
                    :loading="loader.isSubmitting"
                    depressed
                  >
                    {{ editMode ? "Update" : "Save" }}
                  </v-btn>
                  <v-btn
                    class="mr-2 error darken-1 white--text"
                    depressed
                    @click="closeModal"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-form>
              <!-- </validation-observer> -->
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ index, item }">
        <v-btn x-small class="mr-2" color="accent" fab @click="editItem(item)">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn color="error" x-small fab @click="deleteItem(index, item.id)">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CrudOperation",
  head: {
    title: "Category",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Card Category",
      },
    ],
  },
  data() {
    return {
      pageInfo: {
        pageName: "Card Categories",
        apiUrl:
          "https://summer-canyon-zh9zckabi5cf.vapor-farm-f1.com/api/written-exam",
        permission: "",
      },
      items: [],
      selectedItem: null,
      totalItems: 0,
      options: {},
      dialog: false,
      editMode: false,
      loader: {
        isSubmitting: false,
      },
      formData: {
        title: "",
        description: "",
      },
      search: "",
      headers: [
        {
          text: "Title",
          align: "start",
          value: "title",
        },
        {
          text: "Attended",
          align: "start",
          value: "attended",
        },
        { text: "Actions", value: "action", sortable: false },
      ],
      footerProps: {
        itemsPerPageOptions: [2, 3, 4, 500],
      },
    };
  },
  computed: {
    ...mapGetters(["categories", "isLoading"]),
    form: function () {
      const formData = new FormData();
      if (this.editMode) {
        formData.append("_method", "PUT");
      }
      formData.append("title", this.formData.title);
      formData.append(
        "description",
        this.formData.description ? this.formData.description : ""
      );
      return formData;
    },
  },
  watch: {
    dialog(val) {
      val || this.closeModal();
    },
  },
  created() {
    if (this.categories && this.categories.length < 1) {
      this.GET_ALL_CATEGORIES();
    }
  },
  methods: {
    ...mapActions(["GET_ALL_CATEGORIES"]),
    create() {
      this.editMode = false;
      this.selectedItem = null;
      this.formData = {
        name: "",
      };
    },
    editItem(item) {
      this.dialog = true;
      this.editMode = true;
      this.selectedItem = item;
      this.formData = {
        title: item.title || "",
        description: item.description || "",
      };
    },
    takeAction() {
      this.editMode ? this.update() : this.submit();
    },
    async submit() {
      this.loader.isSubmitting = true;
      await this.axios
        .post(this.pageInfo.apiUrl, this.form)
        .then((response) => {
          this.dialog = false;
          this.$store.commit("ADD_NEW", response.data.data);
          this.$toaster.success("Added success");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loader.isSubmitting = false));
    },
    async update() {
      this.loader.isSubmitting = true;
      await this.axios
        .post(`${this.pageInfo.apiUrl}/${this.selectedItem.id}`, this.form)
        .then((response) => {
          this.dialog = false;
          this.$store.commit("UPDATE", response.data.data);
          this.$toaster.success("done");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loader.isSubmitting = false));
    },
    async deleteItem(index, id) {
      this.$swal
        ?.fire({
          title: "Are you sure?",
          icon: "warning",
          text: `Do you want to delete this ${this.pageInfo.pageName}?`,
          showCancelButton: true,
          confirmButtonColor: "#3085D6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loader.isDeleting = this.items.id;
            await this.axios
              .delete(`${this.pageInfo.apiUrl}/${id}`)
              .then((response) => {
                console.log(response);
                this.$store.commit("DELETE", index);
                this.$toaster.success(
                  `${this.pageInfo.pageName} Deleted successfully!!`
                );
              })
              .finally(() => (this.loader.isDeleting = false));
          }
        });
    },

    closeModal() {
      this.dialog = false;
      this.selectedItem = null;
      this.editMode = false;
    },
  },
};
</script>

<!-- 
        <v-toolbar flat>
          <v-toolbar-title class=""> {{ pageInfo.pageName }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="mr-2">
            <v-text-field
              v-model="search"
              label="Search"
              class="mt-3"
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" persistent max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                style="background-color: #01579b"
                class="mx-2 white--text"
                v-bind="attrs"
                icon
                v-on="on"
                @click="create"
                small
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <validation-observer ref="observer">
                <v-form ref="form" @submit.prevent="takeAction">
                  <v-card-title class="text-h5">
                    {{ editMode ? "Update " : "Create" }}
                    {{ pageInfo.pageName }}
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row dense align="baseline" justify="center">
                        <v-col cols="12" xs="12" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Name"
                            rules="required|max:191"
                            vid="name"
                          >
                            <v-text-field
                              v-model="formData.title"
                              label="title"
                              required
                              dense
                              outlined
                            ></v-text-field>
                            <span class="red--text">{{ errors[0] }}</span>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Description"
                            vid="description"
                            rules="required|max:191"
                          >
                            <v-textarea
                              v-model="formData.description"
                              clearable
                              clear-icon="mdi-close-circle"
                              label="Description"
                              dense
                              outlined
                              height="75"
                            ></v-textarea>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Description"
                            vid="description"
                            rules="required|max:191"
                          >
                            <v-textarea
                              v-model="formData.attended"
                              clearable
                              clear-icon="mdi-close-circle"
                              label="attended"
                              dense
                              outlined
                              height="75"
                            ></v-textarea>
                          </validation-provider>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      class="mx-2 white--text"
                      type="submit"
                      :loading="loader.isSubmitting"
                      depressed
                    >
                      {{ editMode ? "Update" : "Save" }}
                    </v-btn>
                    <v-btn
                      class="mr-2 error darken-1 white--text"
                      depressed
                      @click="closeModal"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </validation-observer>
            </v-card>
          </v-dialog>
        </v-toolbar>
       -->
