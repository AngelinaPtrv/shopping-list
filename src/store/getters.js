const getters = {
  getUnits(state) {
    return state.units;
  },

  getSearch(state) {
    return state.search;
  },

  getNavigation(state) {
    return state.navigationList;
  },

  getTitleOfNewList(state) {
    return state.newList.title
  },

  getFoundList(state) {
    return state.list.filter(item => {
      return item.name.toLowerCase().includes(state.search.toLowerCase())
    });
  },

  getNewName(state) {
    return state.newRow.name;
  },

  getNewQuantity(state) {
    return state.newRow.quantity;
  },

  getNewUnits(state) {
    return state.newRow.units;
  },

  getErrorNameField(state) {
    return state.newRow.errorMessageNameField;
  },

  getErrorQuantityField(state) {
    return state.newRow.errorMessageQuantityField;
  },

  getErrorUnitsField(state) {
    return state.newRow.errorMessageUnitsField;
  },

  getErrorNewList(state) {
    return state.newList.errorMessage;
  }
}

export default getters;