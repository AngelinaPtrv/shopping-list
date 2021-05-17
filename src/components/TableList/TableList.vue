<template>
  <v-container>
    <v-data-table
        class="table"
        :items="list"
        disable-pagination
        hide-default-footer
        hide-default-header
    >
      <template v-slot:top>
        <v-container class="d-flex justify-end">
          <v-btn
              small
              @click="markDone"
          >
            <v-icon>mdi-cart-check</v-icon>
          </v-btn>
        </v-container>
      </template>
      <template v-slot:body="props">
        <v-banner
            elevation="24"
            v-if="list.length === 0"
        >Добавьте покупки</v-banner>
        <draggable :list="props.items" tag="tbody" @end="changeList(props.items)">
          <tr
              v-for="(item) in props.items"
              :key="item.id"
              :class="item.checked ? 'item__check' : ''"
          >
            <template>
              <td
                  v-for="(row, name) in item"
                  :key="name"
              >
                <template v-if="typeof row === 'boolean'">
                  <v-checkbox
                    v-model="item.checked"
                    color="gray"
                    @change="changeList(props.items)"
                  ></v-checkbox>
                </template>
                <v-edit-dialog
                    v-if="name !== 'id' && name !== 'checked'"
                    @close="changeList(props.items)"
                > {{ row }}
                  <template v-slot:input>
                    <v-text-field
                        type="text"
                        v-model="item.name"
                    ></v-text-field>
                    <v-text-field
                        type="number"
                        v-model="item.quantity"
                    ></v-text-field>
                    <v-select
                        class="flex-grow-0 flex-shrink-0"
                        outlined
                        :items="gottenUnits"
                        v-model="item.units"
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-icon
                    color="black"
                    @click="deleteItem(item.id)"
                >mdi-cart-remove</v-icon>
              </td>
            </template>
          </tr>
        </draggable>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>

import draggable from 'vuedraggable';

export default {
  name: 'TableList',

  components : {
    draggable
  },

  props: {
    list: Array
  },

  data () {
    return {
      dataTable: this.list,
      color: 'black'
    }
  },

  computed: {
    gottenUnits() {
      return this.$store.getters.getUnits;
    }
  },

  methods: {
    markDone() {
      this.$store.dispatch('markDone')
        .then((list) => this.changeList(list))
    },

    changeList(items) {
      this.$store.dispatch('changeList', items)
    },

    deleteItem(id) {
      this.$store.dispatch('deleteRow', id)
    }
  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0 2px;
}

.item__check {
  color: #c4c4c4;
}
</style>