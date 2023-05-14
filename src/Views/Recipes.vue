<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
import searchIngredients from '@/components/search-ingredients.vue';
import RecipeСardVue from '@/components/Recipe-сard.vue';
import ButtonUi from '@/components/ui-kit/Button-ui.vue';
import addToMenu from '@/components/addToMenu.vue';

import { useRecipesStore } from '@/stores/RecipesStore.js'
import { useUserStore } from '@/stores/UserStore.js'

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
    addToMenu
  },
  methods: {
    closeRecipeCard() {
      this.isRecipeCardVisible = false;
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
    async closeAddToMenu() {
      this.isAddToMenuVisible = false;
      document.body.style.removeProperty("overflow-y")
    }
  },
  computed: {
    recipesList() {
      return this.localRecipes.filter(item => (item.name.toUpperCase().indexOf(this.search.toUpperCase()) !== -1)).slice(0, this.visibleRecipes)
    }
  },
  created() {
    this.recipesStore.$subscribe(store => {
      console.log('1')
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
  <main class="main" v-if="!isRecipeCardVisible">
    <TransitionGroup appear name="fade">
      <searchIngredients class="search" @search-get="searchGet" key="search" />
      <div class="wrapper-recipes-list" key="wrapper-recipes-list">
        <TransitionGroup name="list">
          <RecipeСardVue v-for="item in recipesList" :item="item" :key="item.id" @showAddToMenu="showAddToMenu" />
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
</style>