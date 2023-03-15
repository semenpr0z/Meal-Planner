<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
import Calendar from '@/components/Calendar.vue';
import CalendarController from '@/components/Calendar-controller.vue';
import DayOfWeek from '@/components/DayOfWeek.vue';
import addToMenu from '@/components/addToMenu.vue';
import RecipeСardVue from '@/components/Recipe-сard.vue';
import searchIngredients from '@/components/Search-ingredients.vue'
import RecipeCardOpened from '@/components/Recipe-cardOpened.vue'


import { getDateRange } from '@/utils/dateUtils.js';
import { getMonthWeeks } from '@/utils/datesUtils.js';
import moment from 'moment';
import { useRecipesStore } from '@/stores/RecipesStore.js'
import RecipesDataService from '@/services/RecipesDataService'

export default {
  data() {
    const dates = getDateRange();
    const startDate = moment().subtract(1, "month");
    const currentDate = moment()
    const futureDate = moment().add(1, "month");

    return {
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
          active: true
        },
        {
          id: 3,
          text: 'Рецепты',
          Link: '/recipes',
          active: false
        }
      ],
      showPreviousMonth: false,
      showCurrentMonth: true,
      showFutureMonth: false,
      startDateLocalized: new Intl.DateTimeFormat("ru", { month: "long" }).format(new Date(startDate)),
      currentDateLocalized: new Intl.DateTimeFormat("ru", { month: "long" }).format(new Date(moment())),
      futureDateLocalized: new Intl.DateTimeFormat("ru", { month: "long" }).format(new Date(futureDate)),
      prevMonthWeeks: getMonthWeeks(startDate),
      thisMonthWeeks: getMonthWeeks(moment()),
      nextMonthWeeks: getMonthWeeks(futureDate),
      index: 2,
      lastIndexOfWeek: false,
      secondIndexOfWeek: false,
      week: null,
      isAddToMenuVisible: false,
      isRecipeCardVisible: false,
      localRecipes: [],
      search: ''
    };
  },
  components: {
    Navbar,
    NavbarFooterMobile,
    Calendar,
    CalendarController,
    DayOfWeek,
    addToMenu,
    RecipeСardVue,
    searchIngredients,
    RecipeCardOpened
  },
  methods: {
    previousMonth() {
      if (this.index == 1) {

      } else {
        this.index -= 1
        this.lastIndexOfWeek = true
        this.secondIndexOfWeek = false
      }
    },
    nextMonth() {
      if (this.index == 3) {

      } else {
        this.index += 1
        this.lastIndexOfWeek = false
        this.secondIndexOfWeek = true
      }
    },
    importThisWeek(week) {
      if (!week) {

      } else {
        this.week = week
      }
    },
    capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    showAddToMenu(id) {
      this.indexOfRecipe = this.localRecipes.findIndex(x => x.id == id);
      this.isAddToMenuVisible = true
      document.body.style.overflowY = 'hidden';
    },
    closeAddToMenu() {
      this.isAddToMenuVisible = false;
      document.body.style.removeProperty("overflow-y")
    },
    async updateRecipes() {
      if (this.recipesStore.recipes.length === 0) {
        this.recipesStore.loadRecipes(await (await RecipesDataService.getAll()).data)
        this.localRecipes = this.recipesStore.recipes
      } else {
        this.localRecipes = this.recipesStore.recipes
      }
    },
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
      if (this.recipesStore.recipes.length == 0) {
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
    }
  },
  async beforeMount() {
    await this.updateRecipes()
  },
  setup() {
    const recipesStore = useRecipesStore();
    return {
      recipesStore
    }
  },
  computed: {
    recipesList() {
      return this.localRecipes.filter(item => (item.name.toUpperCase().indexOf(this.search.toUpperCase()) !== -1))
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
  <main class="main main-menu" v-if="!isRecipeCardVisible">
    <TransitionGroup appear name="fade">
      <div key="calendat-and-week" class="calendar-and-week">
        <CalendarController @export-this-week="importThisWeek" />
        <div class="week">
          <DayOfWeek v-for="day in week" :day="day" />
        </div>
      </div>
      <div class="recipes-list" key="recipes-list">
        <searchIngredients class="search" @search-get="searchGet" :button="true" />
        <div class="list">
          <TransitionGroup name="list">
            <RecipeСardVue v-for="item in recipesList" :item="item" :key="item.id" :short="true"
              @showModalRecipeCard="showModalRecipeCard" @showAddToMenu="showAddToMenu" />
          </TransitionGroup>
          <TransitionGroup name="list">
            <RecipeСardVue v-for="item in recipesList" :item="item" :key="item.id" :short="true"
              @showModalRecipeCard="showModalRecipeCard" @showAddToMenu="showAddToMenu" />
          </TransitionGroup>
        </div>
      </div>
    </TransitionGroup>
  </main>
  <NavbarFooterMobile></NavbarFooterMobile>
</template>

<style lang="scss" scoped>
.main-menu {
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: flex-start;
  height: 100%;
}

.wrapper {
  width: 548px;
  height: 141px;
  background: var(--Light_orange_2);
  border-radius: 40px;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-top: 36px;
}

.recipes-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  height: 100rem;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  overflow: auto;
  height: auto;
  width: 550px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
</style>