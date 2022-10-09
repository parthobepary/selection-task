<template>
  <v-container>
    <div>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6" md="3">
          <v-select
            v-model="divisionId"
            :items="divisions.divisions"
            item-text="name"
            label="divisions"
            item-value="id"
            clearable
          ></v-select>
        </v-col>
        <v-col v-if="newDistrict.length" class="d-flex" cols="12" sm="6" md="3">
          <v-select
            v-model="distrctId"
            :items="newDistrict"
            item-text="name"
            label="distrcts"
            item-value="id"
            clearable
          ></v-select>
        </v-col>
        <v-col v-if="newUpozila.length" class="d-flex" cols="12" sm="6" md="3">
          <v-select
            v-model="upojilaName"
            :items="newUpozila"
            item-text="name"
            label="newUpozilas"
            clearable
          ></v-select>
        </v-col>
        <v-col v-if="newUpost.length" class="d-flex" cols="12" sm="6" md="3">
          <v-select
            :items="newUpost"
            item-text="postCode"
            label="newUpozilas"
            clearable
          ></v-select>
        </v-col>
      </v-row>
      <!-- ******* -->
      <v-row align="center">
        <v-col v-if="newDistrict.length" class="d-flex" cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="newDistrict"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-col>
        <v-col v-if="newUpozila.length" class="d-flex" cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="newUpozila"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-col>
        <v-col v-if="newUpost.length" class="d-flex" cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="newUpost"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <!-- ********** -->
      <div>
        {{ allUser }}
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import district from "../../public/Alljason/bd-districts.json";
import division from "../../public/Alljason/bd-divisions.json";
import post from "../../public/Alljason/bd-postcodes.json";
import upozila from "../../public/Alljason/bd-upazilas.json";
export default {
  name: "HomeComponent",
  data() {
    return {
      search: "",
      headers: [
        {
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Name", value: "postCode" },
      ],
      divisions: division,
      district: district,
      newDistrict: [],
      newUpozila: [],
      newUpost: [],
      upozila: upozila,
      post: post,
      divisionId: "",
      distrctId: "",
      upojilaName: "",
    };
  },
  watch: {
    divisionId() {
      this.divisionWiseDistric(this.divisionId, 1);
    },
    distrctId() {
      this.divisionWiseDistric(this.distrctId, 2);
    },
    upojilaName() {
      this.nameByPost(this.upojilaName, 3);
    },
  },
  computed: {
    ...mapGetters(["allUser"]),
  },
  mounted() {
    if (this.allUser && this.allUser.length < 1) {
      this.GET_ALL_USER();
    }
  },
  methods: {
    ...mapActions(["GET_ALL_USER"]),
    divisionWiseDistric(id, statsu) {
      if (statsu === 1) {
        this.newDistrict = this.district.districts.filter((d) => {
          return d.division_id == id;
        });
      }
      if (statsu === 2) {
        this.newUpozila = this.upozila.upazilas.filter((d) => {
          return d.district_id == id;
        });
      }
    },
    nameByPost(name) {
      this.newUpost = this.post.postcodes.filter((d) => {
        return d.upazila == name;
      });
    },
  },
};
</script>
<style lang="sass" scoped></style>
