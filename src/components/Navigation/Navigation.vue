<template>
  <v-container
      class="d-flex flex-column navigation"
  >
    <v-container class="d-flex justify-center align-center">
      <v-text-field
          class="navigation_input"
          label="Новый список"
          v-model="newList"
          :error-messages="errorMessageNewList"
      ></v-text-field>
      <v-btn
          x-small
          @click="addNewList"
      >
        <v-icon small>mdi-basket-plus-outline</v-icon>
      </v-btn>
    </v-container>
    <v-container class="navigation_lists mt-5">
      <p
          v-if="navigationList.length === 0"
          class="text-center"
      >Создайте новый список</p>
      <router-link
          class="lists_links"
          v-for="(link, index) in navigationList"
          :to="{path: `/${link.url}/list`}"
          :key="link.title"
      >
        <p
            class="lists_links__item"
            :class="index === activeIndex ? 'activeIndex' : ''"
            :index="index"
            @click.self="setList(link.title, index)"
        >{{ link.title }}
          <v-icon @click.self="deleteAndNavigate($event, index, link.title)">mdi-basket-off-outline</v-icon>
        </p>
      </router-link>
    </v-container>
  </v-container>
</template>

<script>

export default {
  name: 'Navigation',

  props: {
    navigationList: Array
  },

  data() {
    return {
      activeIndex: null
    }
  },

  created() {
    if (localStorage.getItem(this.$route.params.url)) {
      this.$store.dispatch('setCurrentTable', this.$route.params.url)
          .then(() => this.activeIndex = this.navigationList.findIndex(item =>
              item.title.toLowerCase() === this.$store.state.currentTitle))
    }
  },

  computed: {
    newList: {
      get() {
        return this.$store.getters.getTitleOfNewList;
      },
      set(value) {
        this.$store.commit('setTitleOfNewList', value);
      }
    },

    errorMessageNewList() {
      return this.$store.getters.getErrorNewList;
    }

  },

  methods: {
    setList(title, index) {
      this.$store.dispatch('setCurrentTable', title);
      this.activeIndex = index;
    },

    addNewList() {
      this.$store.dispatch('addNewList')
          .then((url) => this.$router.push({path: `/${url}/list`}))
          .then(router => this.setList(router.params.url))
          .then(() => this.activeIndex = this.navigationList.findIndex(item => item.title.toLowerCase() === this.$route.params.url))
    },

    deleteAndNavigate(event, index, el) {
      const fromUrl = this.$route.params.url;
      this.deleteList(el);
      if (el.toLowerCase() === fromUrl) {
        this.$store.dispatch('getFirstTab')
            .then(title => this.setList(title, 0) & this.setNavigate(event, title, fromUrl, `/${el.toLowerCase()}/list`));
        return;
      }
      event.preventDefault();
      if (this.activeIndex > index)
        this.activeIndex--;
    },

    deleteList(el) {
      this.$store.dispatch('deleteList', el);
    },

    setNavigate(event, to, fromUrl, deleteUrl) {
      event.preventDefault();
      if (to && deleteUrl === `/${fromUrl}/list`) {
        this.$router.push({path: `/${to}/list`})
      } else {
        this.$router.push({path: '/'})
      }
    }
  },

  watch: {
    newList() {
      this.$store.commit('setErrorList', '');
    }
  }
}
</script>

<style scoped>
.navigation {
  flex: 1 1;
  max-width: 40%;
}

.navigation_input {
  max-width: 60%;
}

.navigation_lists {
  display: table;
  border-bottom: 1px solid black;
  padding: 0;
  width: 70%;
}

.lists_links {
  display: table-row;
  text-decoration-line: none;
  color: black;
}

.lists_links__item {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 10px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  position: relative;
}

.activeIndex {
  background-color: #c4c4c4;
}

.lists_links .activeIndex::before, .lists_links .activeIndex::after {
  border: 24px solid transparent;
  border-left: 10px solid black;
  position: absolute;
  content: '';
  right: -34px;
  top: -1px;
}

.lists_links .activeIndex::after {
  border-left: 10px solid #c4c4c4;
  right: -33px;
}

@media (max-width: 540px) {
  .navigation {
    max-width: 90%;
  }
}

</style>