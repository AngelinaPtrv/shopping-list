import uniqueId from 'lodash.uniqueid';
import {tablesData} from '@/data';

const toCompareList = function (a, b) {
  return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
};

const validateField = function (param, commit, applyError) {
  if (!param) {
    commit(applyError, 'Error');
  }
  return !param;
};

const setLocalStorage = function (name, data) {
  localStorage.setItem(name, JSON.stringify(data));
};

const getFromLocalStorage = function (name) {
  return JSON.parse(localStorage.getItem(name));
}

const findNavigationList = function () {
  return tablesData.map(item => item.navigation);
};

const actions = {
  fillNavigationList({commit}) {
    let navigationList = [];
    if (localStorage.getItem('navigationList')) {
      navigationList = getFromLocalStorage('navigationList')
    } else {
      navigationList = findNavigationList();
      setLocalStorage('navigationList', navigationList);
    }
    commit('setNavigationList', navigationList);
  },

  setCurrentTable({commit}, title) {
    if (title) {
      const lowerTitle = title.toLowerCase();
      let currentTable = [];
      if (localStorage.getItem(`${lowerTitle}`)) {
        currentTable = getFromLocalStorage(`${lowerTitle}`)
      } else {
        const currentObject = tablesData.find((td) =>
          td.navigation.title.toLowerCase() === lowerTitle);
        currentTable = currentObject.list;
        setLocalStorage(lowerTitle, currentTable);
      }
      commit('setList', currentTable);
      commit('setCurrentTitle', lowerTitle);
    } else {
      commit('setList', []);
      commit('setCurrentTitle', '');
    }
  },

  getFirstTab() {
    let navigationList = getFromLocalStorage('navigationList');
    return navigationList && navigationList[0] && navigationList[0].title && navigationList[0].title.toLowerCase();
  },


  async addNewList({state, dispatch, commit}) {
    let newList = {};
    if (await dispatch('validateNewList')) {
      newList = {
        navigation: {
          title: state.newList.title,
          url: `${state.newList.title.toLowerCase()}`
        },
        list: []
      };
      if (getFromLocalStorage('navigationList')) {
        const array = getFromLocalStorage('navigationList');
        array.push(newList.navigation);
        setLocalStorage('navigationList', array);
      } else {
        tablesData.push(newList);
        setLocalStorage('navigationList', findNavigationList());
      }
      setLocalStorage(`${newList.navigation.title.toLowerCase()}`, []);
      commit('setNavigationList', getFromLocalStorage('navigationList'));
      commit('setTitleOfNewList', '');
      return newList.navigation.url;
    }
    return state.navigationList[0].url;
  },

  sortList({state, commit}) {
    const list = state.list;
    let order = state.sort.order;
    if (order) {
      list.sort((a, b) => toCompareList(a, b));
      order = 0;
    } else {
      list.sort((a, b) => toCompareList(b, a));
      order = 1;
    }
    commit('setList', list);
    commit('setOrder', order);
    setLocalStorage(state.currentTitle, list);
    return order;
  },

  validateNewList({state, commit}) {
    let hasError = false;
    let duplicate = state.navigationList.find(item => item.title.toLowerCase() === state.newList.title.toLowerCase());
    hasError = hasError || validateField(state.newList.title, commit, 'setErrorList') || validateField(!duplicate, commit, 'setErrorList');
    return !hasError;
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
        list.push({
          id: uniqueId(`${state.currentTitle}-`),
          checked: false,
          name: state.newRow.name,
          quantity: state.newRow.quantity,
          units: state.newRow.units,
        });
        commit('setNewName', '');
        commit('setNewQuantity', '');
        commit('setNewUnits', '');
        commit('setList', list);
      }
      setLocalStorage(state.currentTitle, state.list);
  },

  changeList({state}, list) {
    setLocalStorage(state.currentTitle, list);
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
    setLocalStorage('navigationList', list);
    localStorage.removeItem(el.toLowerCase());
  },

  deleteRow({state, commit}, id) {
    const list = state.list.filter(item => item.id !== id);
    commit('setList', list);
    setLocalStorage(state.currentTitle, list);
  }
};

export default actions;