<template>
  <v-container class="container__nav-bar" fluid>
    <v-app-bar color="green">
      <div class="container__wrapper-btn d-flex justify-center">
        <router-link :to="{name: 'form'}">
          <v-btn  outlined class="mr-3 container__btn">
            Запись на забег
          </v-btn>
        </router-link>
        <router-link  :to="{ name: 'table'}">
          <v-btn class="container__btn" outlined >
            Таблица
          </v-btn>
        </router-link>
      </div>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>

.container__nav-bar {
  padding: 0;
}

.container__wrapper-btn {
  width: 100%;
}

.router-link-exact-active > .container__btn {
  color: blue;
}

</style>
