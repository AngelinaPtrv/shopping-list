<template>
  <v-container>
    <v-data-table
        :items="foundItem"
        disable-pagination
        hide-default-footer
        hide-default-header
    >
      <template v-slot:top>
        <v-container class="d-flex justify-end">
          <v-btn>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn @click="markDone">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-container>
      </template>
      <template v-slot:body="props">
        <draggable :list="props.items" tag="tbody">
          <tr
              v-for="(item) in props.items"
              :key="item.name"
              :style="item.checked ? {'color': color } : ''"
          >
            <td>
              <template>
                <v-checkbox
                    v-model="item.checked"
                    color="gray"
                ></v-checkbox>
              </template>
            </td>
            <template>
              <td
                  v-for="row in item"
                  :key="row"
              >
                <v-edit-dialog
                    :return-value.sync="row"
                > {{ row }}
                  <template v-slot:input>
                    <v-text-field
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
            </template>
          </tr>
        </draggable>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "TableList",
  components : {
    draggable
  },

  props: {
    list: Array,
    search: String
  },

  data () {
    return {
      dataTable: this.list,
      color: 'black'
    }
  },
  computed: {
    foundItem() {
      return this.dataTable.filter((item) => {
            return item.name && item.name.toLowerCase().includes(this.search.toLowerCase())
          }
      );
    },

    gottenUnits() {
      let units = [];
      this.dataTable.forEach((item) => {
        if (!units.includes(item.units)) {
          units.push(item.units);
        }
      });
      return units;
    }
  },

  methods: {
    markDone() {
      let indexes = [];
      this.dataTable.forEach((item, index) => {
        if (item.checked === true) {
          indexes.push(index);
        }
      });
      let array = this.dataTable.filter(item => item.checked === true);
      let count = 0;
      indexes.forEach(idx => {
        this.dataTable.splice(idx - count, 1);
        count++;
      });
      this.dataTable = this.dataTable.concat(array);
      this.changeColor();
    },

    changeColor() {
      if (this.color === 'black') {
        this.color = 'grey'
      }
    }
  }

}
</script>

<style scoped>

</style>