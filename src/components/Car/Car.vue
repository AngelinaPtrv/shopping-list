<template>
  <v-container>
    <v-container class="modify d-flex justify-space-around">
      <!--      <v-text-field-->
      <!--          class="flex-grow-0 flex-shrink-0"-->
      <!--          v-model="search"-->
      <!--          append-icon="mdi-magnify"-->
      <!--          label="Search"-->
      <!--      />-->
      <SearchPanel :list="list" :search="search" @toGetFind="getSearch"></SearchPanel>
      <v-btn
          depressed
          @click="toSortList"
      >По имени
      </v-btn>
    </v-container>
    <section class="d-flex">
      <TableList
          :list="list"
          :search="search"
      ></TableList>
    </section>
    <section class="new d-flex justify-space-around">
      <AddPanel :list="list"></AddPanel>
    </section>
  </v-container>
</template>

<script>
import SearchPanel from "@/components/SearchPanel"
import TableList from "@/components/TableList";
import AddPanel from "@/components/AddPanel";

export default {
  name: "Products",
  components: {
    SearchPanel,
    TableList,
    AddPanel
  },

  data () {
    return {
      list: [
        {checked: false, name: "Очиститель", quantity: 1, units: "шт"},
        {checked: false, name: "Коврики", quantity: 2, units: "упак"},
        {checked: false, name: "Губки", quantity: 2, units: "шт"}
      ],
      meta: [
        {field: "checked", type: "bool"},
        {field: "name", type: "text"},
        {field: "quantity", type: "number"},
        {field: "units", type: "combo", refType: "text"}
      ],
      headers: [
        {text: "Наименование", value: "name"},
        {text: "Количество", value: "quantity"},
        {text: "Ед. изм", value: "units"},
      ],
      search: "",
      order: 1,
      snake: false,
      snackText: '',
      singleSelect: true,
      checked: false,
      color: 'black',
    }
  },

  computed: {
    foundItem() {
      return this.list.filter((item) => {
            return item.name && item.name.toLowerCase().includes(this.search.toLowerCase())
          }
      );
    },
  },

  methods: {
    getSearch(find) {
      console.log(this.search);
      this.search = find;
    },

    toSortList() {
      if (this.order) {
        this.list.sort((a, b) => this.toCompareList(a, b));
        this.order = 0;
      } else {
        this.list.sort((a, b) => this.toCompareList(b, a));
        this.order = 1;
      }
    },

    toCompareList(a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name === b.name) {
        return 0;
      }
      return -1;
    },

    log(data) {
      console.log(data);
    }
  }
}
</script>

<style scoped>

</style>