<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
import searchIngredients from '@/components/search-ingredients.vue';
import RecipeСardVue from '@/components/Recipe-сard.vue';
import ButtonUi from '@/components/ui-kit/Button-ui.vue';
import addToMenu from '@/components/addToMenu.vue';
import Filters from '@/components/Filters.vue';
import FilterList from '@/components/FilterList.vue';

import { useRecipesStore } from '@/stores/RecipesStore.js'
import { useUserStore } from '@/stores/UserStore.js'

export default {
  data() {
    return {
      localRecipes: [],
      indexOfRecipe: 0,
      isAddToMenuVisible: false,
      Navigation: [
        {
          id: 1,
          text: 'Главная',
          Link: '/main',
          active: false
        },
        {
          id: 2,
          text: 'Планировщик',
          Link: '/menu',
          active: false
        },
        {
          id: 3,
          text: 'Рецепты',
          Link: '/recipes',
          active: true
        }
      ],
      search: '',
      visibleRecipes: 6,
      filtersIsOpened: false
    };
  },
  setup() {
    const recipesStore = useRecipesStore();
    const userStore = useUserStore();
    return {
      recipesStore,
      userStore
    }
  },
  components: {
    Navbar,
    NavbarFooterMobile,
    searchIngredients,
    RecipeСardVue,
    ButtonUi,
    addToMenu,
    Filters,
    FilterList
  },
  methods: {
    searchGet(value) {
      if (value === '' && this.search === '') {
        console.log('error')
      } else {
        this.search = value
      }
    },
    moreRecipes() {
      this.visibleRecipes += 6
      if (this.visibleRecipes >= this.localRecipes.length) {
        console.log('Рецептов больше нет!')
      }
    },
    showAddToMenu(id) {
      this.indexOfRecipe = this.localRecipes.findIndex(x => x.id == id);
      this.isAddToMenuVisible = true
      document.body.style.overflowY = 'hidden';
    },
    async closeAddToMenu() {
      this.isAddToMenuVisible = false;
      document.body.style.removeProperty("overflow-y")
    },
    openCloseFilters() {
      this.filtersIsOpened = !this.filtersIsOpened
    }
  },
  computed: {
    recipesList() {
      return this.localRecipes
        .filter(item => (item.name.toUpperCase().indexOf(this.search.toUpperCase()) !== -1))
        .filter(item => {
          if (this.recipesStore.complexityFilter === "") {
            return true; // Вернуть true, чтобы элемент проходил фильтр по сложности
          } else {
            return item.properties.complexity === this.recipesStore.complexityFilter;
          }
        })
        .filter(item => { return item.properties.time >= this.recipesStore.timeFilter[0] && item.properties.time <= this.recipesStore.timeFilter[1] })
        .slice(0, this.visibleRecipes)
    },
    showMoreRecipes() {
      if (this.recipesList.length > 5 ) {
        if (this.recipesList.length < this.localRecipes.length) {
          return true
        }
      } else {
        return false;
      }
    }
  },
  created() {
    this.recipesStore.$subscribe(store => {
      this.localRecipes = this.recipesStore.recipes

    })
  },
  async beforeMount() {
    this.localRecipes = this.recipesStore.recipes;
  },
};
</script>

<template>
  <Transition name="fade">
    <addToMenu v-if="isAddToMenuVisible" :item="localRecipes[indexOfRecipe]" @closeAddToMenu="closeAddToMenu" />
  </Transition>
  <Navbar :menu="Navigation"></Navbar>
  <main class="main" v-if="!filtersIsOpened">
    <TransitionGroup appear name="fade">
      <searchIngredients class="search" @search-get="searchGet" @open-filters="openCloseFilters" key="search" />
      <FilterList key="filter-list" />
      <div class="wrapper-recipes-list" key="wrapper-recipes-list">
        <TransitionGroup name="list">
          <RecipeСardVue v-for="item in recipesList" :item="item" :ultraWideCard="true" :key="item.id"
            @showAddToMenu="showAddToMenu" />
        </TransitionGroup>
      </div>
      <ButtonUi key="btn-more" class="button-more-recipes" text="Посмотреть еще" color="gray" method="moreRecipes"
        @more-recipes="moreRecipes" @click="moreRecipes" v-if="showMoreRecipes" />
    </TransitionGroup>
  </main>
  <main class="main" v-else-if="filtersIsOpened">
    <Transition name="fade">
      <Filters @close-filters="openCloseFilters" />
    </Transition>
  </main>
  <NavbarFooterMobile></NavbarFooterMobile>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.search {
  margin-top: 32px;
  width: 100%;
}

.wrapper-recipes-list {
  margin-top: 58px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding-bottom: 24px;
}

.button-more-recipes {
  margin-bottom: 20px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


@media (max-width: 1200px) {
  .wrapper-recipes-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 786px) {
  .wrapper-recipes-list {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>