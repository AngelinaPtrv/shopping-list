<template>
  <v-container class="d-flex flex-column wrap_grid">
    <v-container class="d-flex flex-row justify-space-around align-center">
        <v-btn
            small
            @click="markDone"
        >
          <v-icon small>mdi-cart-check</v-icon>
        </v-btn>
      <SearchPanel></SearchPanel>
      <v-btn
          small
          @click="getSortList"
      >
        <v-icon small v-if="!order">mdi-arrow-up</v-icon>
        <v-icon small v-if="order">mdi-arrow-down</v-icon>
      </v-btn>
    </v-container>
    <v-container class="d-flex wrap_grid__table">
      <TableList :list="foundList"></TableList>
    </v-container>
    <v-container class="new d-flex justify-space-around">
      <AddPanel></AddPanel>
    </v-container>
  </v-container>
</template>

<script>
import SearchPanel from '@/components/SearchPanel/SearchPanel';
import TableList from '@/components/TableList/TableList';
import AddPanel from '@/components/AddPanel/AddPanel';

export default {
  name: 'Grid',

  components: {
    SearchPanel,
    TableList,
    AddPanel
  },

  data() {
    return {
      order: 0
    }
  },

  computed: {
    foundList() {
      return this.$store.getters.getFoundList;
    }
  },

  methods: {
    getSortList() {
      this.$store.dispatch('sortList')
          .then(order => this.order = order)
    },

    markDone() {
      this.$store.dispatch('markDone')
          .then((list) => this.$store.dispatch('changeList', list))
    }
  }
}
</script>

<style scoped>
.wrap_grid__table {
  height: 70%;
}

.wrap_grid {
  height: 100%;
}
</style>