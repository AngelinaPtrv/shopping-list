import uniqueId from 'lodash.uniqueid';
import {tablesData} from '@/data';

const NAVIGATION_LIST = 'navigationList';

const comparator = function (a, b) {
  return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
};

const validateField = function (param, commit, applyError) {
  if (!param) {
    commit(applyError, 'Заполните поле');
  }
  return !param;
};

const fillLocalStorage = function (name, data) {
  localStorage.setItem(name, JSON.stringify(data));
};

const getFromLocalStorage = function (name) {
  return JSON.parse(localStorage.getItem(name));
}

const getTableDataNavigationList = function () {
  return tablesData.map(item => item.navigation);
};

const getCurrentTableFromTableData = (title) => {
  const currentObject = tablesData.find((td) =>
    td.navigation.title.toLowerCase() === title);
  const currentTable = currentObject.list;
  fillLocalStorage(title, currentTable);
  return currentTable;
};

const createNewNavigationListItem = (state) => {
  return {
    navigation: {
      title: state.newList.title,
      url: `${state.newList.title.toLowerCase()}`
    },
    list: []
  };
};

const createRowItem = (state) => {
  return {
    id: uniqueId(`${state.currentTitle}-`),
    checked: false,
    name: state.newRow.name,
    quantity: state.newRow.quantity,
    units: state.newRow.units,
  };
};

const actions = {
  fillNavigationList({commit}) {
    let navigationList = [];
    if (localStorage.getItem(NAVIGATION_LIST)) {
      navigationList = getFromLocalStorage(NAVIGATION_LIST)
    } else {
      navigationList = getTableDataNavigationList();
      fillLocalStorage(NAVIGATION_LIST, navigationList);
    }
    commit('setNavigationList', navigationList);
  },

  setCurrentTable({commit}, title) {
    const lowerTitle = title ? title.toLowerCase() : '';
    let currentTable = [];
    if (title) {
      currentTable = localStorage.getItem(`${lowerTitle}`)
        ? getFromLocalStorage(`${lowerTitle}`)
        : getCurrentTableFromTableData(lowerTitle);
    }
    commit('setList', currentTable);
    commit('setCurrentTitle', lowerTitle);
  },

  getFirstTab() {
    let navigationList = getFromLocalStorage(NAVIGATION_LIST);
    return navigationList && navigationList[0] && navigationList[0].title && navigationList[0].title.toLowerCase();
  },


  async addNewList({state, dispatch, commit}) {
    if (await dispatch('validateNewList')) {
      let newListItem = createNewNavigationListItem(state);
      let navigationList = getFromLocalStorage(NAVIGATION_LIST)
      if (navigationList) {
        navigationList.push(newListItem.navigation);
      } else {
        tablesData.push(newListItem);
        navigationList = getTableDataNavigationList()
      }
      fillLocalStorage(NAVIGATION_LIST, navigationList);
      fillLocalStorage(`${newListItem.navigation.title.toLowerCase()}`, []);
      commit('setNavigationList', navigationList);
      commit('setTitleOfNewList', '');
      return newListItem.navigation.url;
    }
    return state.navigationList[0].url;
  },

  sortList({state, commit}) {
    let list = [];
    let checkedList = [];
    state.list.forEach(item => item.checked ? checkedList.push(item) : list.push(item))
    let order = state.sort.order;
    list.sort((a, b) => order ? comparator(a, b) : comparator(b, a));
    list = list.concat(checkedList);
    commit('setList', list);
    commit('setOrder', 1 - order);
    fillLocalStorage(state.currentTitle, list);
    return order;
  },

  validateNewList({state, commit}) {
    let duplicate = state.navigationList.find(item => item.title.toLowerCase() === state.newList.title.toLowerCase());
    return !(validateField(state.newList.title, commit, 'setErrorList') || validateField(!duplicate, commit, 'setErrorList'));
  },

  validateNewRow({state, commit}) {
    let hasError = false;
    hasError |= validateField(state.newRow.name, commit, 'setErrorNameField');
    hasError |= validateField(state.newRow.quantity, commit, 'setErrorQuantityField');
    hasError |= validateField(state.newRow.units, commit, 'setErrorUnitsField');
    return !hasError;
  },

  async addNewRow({state, commit, dispatch}) {
    const list = state.list;
    if (await dispatch('validateNewRow')) {
      list.push(createRowItem(state));
      commit('setNewName', '');
      commit('setNewQuantity', '');
      commit('setNewUnits', '');
      commit('setList', list);
    }
    fillLocalStorage(state.currentTitle, state.list);
  },

  changeList({state}, list) {
    fillLocalStorage(state.currentTitle, list);
  },

  markDone({state, commit}) {
    let indexes = [];
    let list = state.list;
    list.forEach((item, index) => item.checked && indexes.push(index));
    let array = list.filter(item => item.checked);
    let count = 0;
    indexes.forEach(idx => {
      list.splice(idx - count, 1);
      count++;
    });
    list = list.concat(array);
    commit('setList', list);
    return list;
  },

  deleteList({state, commit}, el) {
    const list = state.navigationList.filter(item => item.title !== el);
    commit('setNavigationList', list);
    fillLocalStorage(NAVIGATION_LIST, list);
    localStorage.removeItem(el.toLowerCase());
  },

  deleteRow({state, commit}, id) {
    const list = state.list.filter(item => item.id !== id);
    commit('setList', list);
    fillLocalStorage(state.currentTitle, list);
  }
};

export default actions;