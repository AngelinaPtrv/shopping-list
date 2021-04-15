<template>
  <div>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Lists</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
              v-for="link in links"
              :key="link.title"
              :to="link.url"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      drawer: false,
      group: null,
      links: [
        {title: 'Home', icon: 'mdi-home', url: '/home'},
        {title: 'Food', icon: 'mdi-food', url: '/food'},
        {title: 'Car', icon: 'mdi-car', url: '/car'}
      ]
    }
  }
}
</script>

<style scoped>

</style>