<template>
  <v-app class="app">
    <v-card
        class="overflow-hidden d-flex wrap mx-auto"
    >
      <Navigation :navigationList="navigationList"></Navigation>
      <v-main
          class="d-flex justify-center align-center wrap_content"
      >
        <router-view></router-view>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>

import Navigation from './components/Navigation/Navigation';

export default {
  components: {
    Navigation,
  },


  created() {
    this.$store.dispatch('fillNavigationList')
  },

  computed: {
    navigationList() {
      return this.$store.getters.getNavigation
    }
  }
};
</script>

<style scoped>
.wrap {
  min-width: 80vw;
  max-width: 90vw;
  margin-top: 16px;
}
.wrap_content {
  flex: 2 1;
}

@media (max-width: 540px) {
  .wrap {
    flex-direction: column;
    max-width: 100vw;
    margin-top: 0;
  }
}
</style>
