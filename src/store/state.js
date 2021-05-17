const state = {
    navigationList: [],
    currentTitle: '',
    list: [],
    units: ['шт', 'кг', 'упак', 'бут'],
    newList: {
      title: '',
      errorMessage: ''
    },
    search: '',
    sort: {
      order: 1
    },
    newRow: {
      name: '',
      quantity: null,
      units: '',
      errorMessageNameField: '',
      errorMessageQuantityField: '',
      errorMessageUnitsField: ''
    }
};

export default state;