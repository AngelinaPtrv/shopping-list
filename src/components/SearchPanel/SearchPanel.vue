<template>
  <v-text-field
      class="field"
      v-model="find"
      append-icon="mdi-magnify"
      label="Найти"
  />
</template>

<script>
export default {
  name: 'SearchPanel',

  computed: {
    find: {
      get() {
        return this.$store.getters.getSearch;
      },

      set(value) {
        this.$store.commit('setSearch', value);
      }
    }
  }
}
</script>

<style scoped>
.field {
  max-width: 70%;
}
</style>