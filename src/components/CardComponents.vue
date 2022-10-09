<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <div class="hover-class pa-5">
        <h1>Lorem ipsum dolor</h1>
        <img
          class="my-5"
          src="https://cdn2.vectorstock.com/i/thumb-large/66/56/man-face-emotive-icon-in-flat-style-vector-13466656.jpg"
          alt="img"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, veniam?
        </p>
      </div>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <div class="hover-class pa-5">
        <h1>Lorem ipsum dolor</h1>
        <img
          class="my-5"
          src="https://cdn2.vectorstock.com/i/thumb-large/66/56/man-face-emotive-icon-in-flat-style-vector-13466656.jpg"
          alt="img"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, veniam?
        </p>
      </div>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <div class="hover-class pa-5">
        <h1>Lorem ipsum dolor</h1>
        <img
          class="my-5"
          src="https://cdn2.vectorstock.com/i/thumb-large/66/56/man-face-emotive-icon-in-flat-style-vector-13466656.jpg"
          alt="img"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, veniam?
        </p>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.hover-class {
  background: red;
  border-radius: 5px;
}
.hover-class:hover {
  background: rgb(37, 15, 15);
  color: rgb(255, 255, 255);
  transition: 2s;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  img {
    transform: scale(1.1);
    transition: 2s;
  }
  h1 p {
    transition: 2s;
  }
}
</style>
