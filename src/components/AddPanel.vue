<template>
  <v-container>
    <v-row justify="end">
      <v-col cols="4">
        <v-text-field
            label="Наименование"
            dense
            v-model="name"
            :error-messages="errorMessageNameField"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
            v-model="quantity"
            label="Кол-во"
            dense
            type="number"
            :error-messages="errorMessageQuantityField"
        />
      </v-col>
      <v-col cols="2">
        <v-select
            dense
            :items="gottenUnits"
            :error-messages="errorMessageUnitsField"
            v-model="units"
        ></v-select>
      </v-col>
      <v-col cols="1">
        <v-btn
            depressed
            elevation="5"
            icon
            large
            @click="toAddProduct"
        >
          <v-icon>
            mdi-content-save
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddPanel",
  props: {
    list: Array
  },
  data () {
    return {
      name: "",
      quantity: null,
      units: "",
      errorMessageNameField: '',
      errorMessageQuantityField: '',
      errorMessageUnitsField: ''
    }
  },

  computed: {
    gottenUnits() {
      let units = [];
      this.list.forEach((item) => {
        if (!units.includes(item.units)) {
          units.push(item.units);
        }
      });
      return units;
    }
  },

  methods: {

    validateField(param, applyErrorFunc) {
      if (!param) {
        applyErrorFunc();
        return true;
      }
      return false;
    },
    validate() {
      let hasError = false;
      hasError |= this.validateField(this.name, () => this.errorMessageNameField = 'Error');
      hasError |= this.validateField(this.quantity, () => this.errorMessageQuantityField = 'Error');
      hasError |= this.validateField(this.units, () => this.errorMessageUnitsField = 'Error');
      return !hasError;
    },
    toAddProduct() {
      if (this.validate()) {
        this.list.push({
          checked: false,
          name: this.name,
          quantity: this.quantity,
          units: this.units,
        });
        this.name = "";
        this.quantity = null;
      }
    },
  },

  watch: {
    name() {
      this.errorMessageNameField = '';
    },

    quantity() {
      this.errorMessageQuantityField = '';
    },

    units() {
      this.errorMessageUnitsField = '';
    }
  }
}
</script>

<style scoped>

</style>