<template>
  <v-app class="app">
    <v-card class="overflow-hidden d-flex wrap mx-auto">
      <navigation-list :navigationList="navigationList" />
      <v-main class="wrap_content">
        <router-view></router-view>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>

import NavigationList from './components/Navigation/NavigationList';

export default {
  components: {
    NavigationList,
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
  min-height: 70vh;
}

.wrap_content {
  flex: 2 1;
}

@media (max-width: 540px) {
  .wrap {
    flex-direction: column;
    max-width: 100vw;
    height: auto;
    margin-top: 0;
  }
}
</style>
