<template>
  <v-text-field
      class="flex-grow-0 flex-shrink-0"
      v-model="find"
      append-icon="mdi-magnify"
      label="Search"
      @keydown="getFind"
  />
</template>

<script>
export default {
  name: "SearchPanel",
  props: {
    list: Array,
    search: String
  },
  data() {
    return {
      find: this.search
    }
  },
  methods: {
    getFind() {
      this.$emit('toGetFind', this.find);
    }
  }
}
</script>

<style scoped>

</style>