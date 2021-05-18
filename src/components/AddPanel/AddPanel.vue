<template>
  <v-container class="pa-0">
    <v-row
        justify="space-between"
    >
      <v-col cols="6">
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
      <v-col cols="2" class="d-flex justify-center pa-0 align-self-center">
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
  name: 'AddPanel',

  computed: {
    errorMessageNameField() {
      return this.$store.getters.getErrorNameField;
    },

    errorMessageQuantityField() {
      return this.$store.getters.getErrorQuantityField;
    },

    errorMessageUnitsField() {
      return this.$store.getters.getErrorUnitsField;
    },

    gottenUnits() {
     return this.$store.getters.getUnits;
    },

    name: {
      get() {
        return this.$store.getters.getNewName;
      },

      set(value) {
        this.$store.commit('setNewName', value);
      }
    },

    quantity: {
      get() {
        return this.$store.getters.getNewQuantity;
      },

      set(value) {
        this.$store.commit('setNewQuantity', value);
      }
    },

    units: {
      get() {
        return this.$store.getters.getNewUnits;
      },

      set(value) {
        this.$store.commit('setNewUnits', value);
      }
    }

  },

  methods: {
    toAddProduct() {
      this.$store.dispatch('addNewRow');
    }
  },

  watch: {
    name() {
      this.$store.commit('setErrorNameField', '');
    },

    quantity() {
      this.$store.commit('setErrorQuantityField', '')
    },

    units() {
      this.$store.commit('setErrorUnitsField', '');
    }
  }
}
</script>

<style scoped>

</style>