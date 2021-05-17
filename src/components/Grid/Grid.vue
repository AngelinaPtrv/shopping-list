<template>
  <v-container>
    <v-container class="modify d-flex justify-space-around align-center">
      <SearchPanel></SearchPanel>
      <v-btn
          small
          @click="getSortList"
      >По имени
      </v-btn>
    </v-container>
    <section class="d-flex">
      <TableList :list="foundList"></TableList>
    </section>
    <section class="new d-flex justify-space-around">
      <AddPanel></AddPanel>
    </section>
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

  computed: {
    foundList() {
      return this.$store.getters.getFoundList;
    }
  },

  methods: {
    getSortList() {
      this.$store.dispatch('sortList');
    }
  }
}
</script>

<style scoped>

</style>