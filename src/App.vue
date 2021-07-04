<template>
  <v-app>
    <NavBar />
    <router-view/>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  methods: mapActions(['getAllPerson']),
  async mounted() {
    this.getAllPerson()
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>
