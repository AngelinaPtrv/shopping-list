const mutations = {
  setSearch(state, payload) {
    state.search = payload;
  },

  setOrder(state, payload) {
    state.sort.order = payload;
  },

  setTitleOfNewList(state, payload) {
    state.newList.title = payload;
  },

  setCurrentTitle(state, payload) {
    state.currentTitle = payload;
  },

  setList(state, payload) {
    state.list = payload;
  },

  setUnits(state, payload) {
    state.units = payload;
  },

  setNewName(state, payload) {
    state.newRow.name = payload;
  },

  setNewQuantity(state, payload) {
    state.newRow.quantity = payload;
  },

  setNewUnits(state, payload) {
    state.newRow.units = payload;
  },

  setErrorNameField(state, payload) {
    state.newRow.errorMessageNameField = payload;
  },

  setErrorQuantityField(state, payload) {
    state.newRow.errorMessageQuantityField = payload;
  },

  setErrorUnitsField(state, payload) {
    state.newRow.errorMessageUnitsField = payload;
  },

  setNavigationList(state, payload) {
    state.navigationList = payload;
  },

  setErrorList(state, payload) {
    state.newList.errorMessage = payload;
  }
}

export default mutations;