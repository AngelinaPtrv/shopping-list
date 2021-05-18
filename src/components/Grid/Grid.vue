<template>
  <v-container>
    <v-container class="modify d-flex flex-row-reverse justify-space-between align-center">
        <v-btn
            x-small
            @click="markDone"
        >
          <v-icon small>mdi-cart-check</v-icon>
        </v-btn>
      <SearchPanel></SearchPanel>
      <v-btn
          x-small
          @click="getSortList"
      >
        <v-icon small v-if="!order">mdi-arrow-up</v-icon>
        <v-icon small v-if="order">mdi-arrow-down</v-icon>
      </v-btn>
    </v-container>
    <v-container class="d-flex ">
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

</style>