<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
import searchIngredients from '@/components/Search-ingredients.vue';
import RecipeСardVue from '@/components/Recipe-сard.vue';
import ButtonUi from '@/components/ui-kit/Button-ui.vue';
import addToMenu from '@/components/addToMenu.vue';
import RecipeCardOpened from '@/components/Recipe-cardOpened.vue'

import { useRecipesStore } from '@/stores/RecipesStore.js'
import RecipesDataService from '@/services/RecipesDataService'

export default {
  data() {
    return {
      localRecipes: [],
      indexOfRecipe: 0,
      isRecipeCardVisible: false,
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
          text: 'Меню',
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
      visibleRecipes: 6
    };
  },
  setup() {
    const recipesStore = useRecipesStore();
    return {
      recipesStore
    }
  },
  components: {
    Navbar,
    NavbarFooterMobile,
    searchIngredients,
    RecipeСardVue,
    ButtonUi,
    addToMenu,
    RecipeCardOpened
  },
  beforeMount() {
    this.updateRecipes()
  },
  methods: {
    showModalRecipeCard(id) {
      this.indexOfRecipe = this.localRecipes.findIndex(x => x.id == id);
      this.isRecipeCardVisible = true;
      document.body.style.overflowY = 'hidden';
    },
    closeRecipeCard() {
      this.isRecipeCardVisible = false;
      document.body.style.removeProperty("overflow-y")
    },
    async updateRecipes() {
      if (this.recipesStore.recipes.length === 0) {
        await this.recipesStore.updateRecipes()
        this.localRecipes = this.recipesStore.recipes
      } else {
        this.localRecipes = this.recipesStore.recipes
      }
    },
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
    closeAddToMenu() {
      this.isAddToMenuVisible = false;
      document.body.style.removeProperty("overflow-y")
    }
  },
  computed: {
    recipesList() {
      return this.localRecipes.filter(item => (item.name.toUpperCase().indexOf(this.search.toUpperCase()) !== -1)).slice(0, this.visibleRecipes)
    }
  }
};
</script>

<template>
  <Transition name="fade">
    <addToMenu v-if="isAddToMenuVisible" :item="localRecipes[indexOfRecipe]" @closeAddToMenu="closeAddToMenu" />
  </Transition>
  <Navbar :menu="Navigation"></Navbar>
  <Transition name="fade">
  <main class="main" v-if="isRecipeCardVisible">
    <RecipeCardOpened :item="localRecipes[indexOfRecipe]" @closeRecipeCard="closeRecipeCard" />
  </main>
  </Transition>
  <main class="main" v-if="!isRecipeCardVisible">
    <TransitionGroup appear name="fade">
      <searchIngredients class="search" @search-get="searchGet" key="search"/>
      <div class="wrapper-recipes-list" key="wrapper-recipes-list">
        <TransitionGroup name="list">
          <RecipeСardVue v-for="item in recipesList" :item="item" :key="item.id"
            @showModalRecipeCard="showModalRecipeCard" @showAddToMenu="showAddToMenu" />
        </TransitionGroup>
      </div>
      <ButtonUi key="btn-more" class="button-more-recipes" text="Посмотреть еще" color="gray" method="moreRecipes"
        @more-recipes="moreRecipes" @click="moreRecipes" v-if="recipesList.length < localRecipes.length" />
    </TransitionGroup>
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
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.button-more-recipes {
  margin-top: 32px;
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
</style>