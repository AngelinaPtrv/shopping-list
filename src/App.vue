<template>
  <v-app class="app">
    <v-card
        class="overflow-hidden"
        height="1000px"
    >
      <Navigation></Navigation>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-card>
  </v-app>
</template>
<script>

import Navigation from "./components/Navigation/Navigation";

export default {
  components: {
    Navigation,
  }
};
</script>

<style>

</style>
