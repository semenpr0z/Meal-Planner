<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
import Calendar from '@/components/Calendar.vue';
import CalendarController from '@/components/Calendar-controller.vue';
import DayOfWeek from '@/components/DayOfWeek.vue';
import addToMenu from '@/components/addToMenu.vue';
import RecipeСardVue from '@/components/Recipe-сard.vue';
import searchIngredients from '@/components/search-ingredients.vue';
import Filters from '@/components/Filters.vue';
import FilterList from '@/components/FilterList.vue';

import { getDateRange } from '@/utils/dateUtils.js';
import { getMonthWeeks } from '@/utils/datesUtils.js';
import moment from 'moment';
import { useRecipesStore } from '@/stores/RecipesStore.js'
import { useUserStore } from '@/stores/UserStore.js'
import OrderDataService from '@/services/OrderDataService'

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
          text: 'Планировщик',
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
      search: '',
      weekToExport: {
        "day": new Date,
        "meals": []
      },
      searchValidation: true,
      filtersIsOpened: false
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
    Filters,
    FilterList
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
    async importThisWeek(week) {
      if (this.userStore.user) {
        if (!week) {

        } else {
          if (this.userStore.userOrders.length == 0) {
            let orders = await OrderDataService.getAll()
            this.userStore.userOrders = orders.data.filter(order => { if (order.userId === this.userStore.user.id) { return true; } else { return false; } })
          }
          this.week = week
          this.mappingWeek()
        }
      } else {
        this.week = week
        this.mappingWeek()
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
    async closeAddToMenu() {
      if (this.userStore.user) {
        let orders = await OrderDataService.getAll()
        this.userStore.userOrders = orders.data.filter(order => { if (order.userId === this.userStore.user.id) { return true; } else { return false; } })
      }
      this.isAddToMenuVisible = false;
      document.body.style.removeProperty("overflow-y")
      this.mappingWeek()
    },
    showModalRecipeCard(id) {
      this.indexOfRecipe = this.localRecipes.findIndex(x => x.id == id);
      this.isRecipeCardVisible = true;
    },
    searchGet(value) {
      if (value === '' && this.search === '') {
        this.searchValidation = false
      } else {
        this.search = value,
          this.searchValidation = true
      }
    },
    deleteMeal(mealId) {
      this.userStore.userOrders = this.userStore.userOrders.filter(order => order.id !== mealId)
      this.mappingWeek()
      OrderDataService.delete(mealId)
    },
    mappingWeek() {
      const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const formattedDate = formatter.format(this.week).replace(/\./g, "-");
      const order = this.userStore.userOrders.filter(order => order.dishesDate === formattedDate);
      if (order) {
        this.weekToExport = {
          "day": this.week,
          "meals": order
        }
      } else {
        this.weekToExport = {
          "day": day,
          "meals": []
        }
      }
    },
    setRecipesListHeight() {
      const calendarAndWeekHeight = this.$refs.calendarAndWeek.offsetHeight;
      const recipesListElement = document.querySelector('.recipes-list');
      recipesListElement.style.height = `${calendarAndWeekHeight}px`;
    },
    openCloseFilters() {
      this.filtersIsOpened = !this.filtersIsOpened
    }
  },
  async beforeMount() {
    this.localRecipes = this.recipesStore.recipes;
  },
  setup() {
    const recipesStore = useRecipesStore();
    const userStore = useUserStore();
    return {
      recipesStore,
      userStore
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
    }
  },
  created() {
    this.recipesStore.$subscribe(store => {
      this.localRecipes = this.recipesStore.recipes

    })
  }
};
</script>

<template>
  <addToMenu v-if="isAddToMenuVisible" :item="localRecipes[indexOfRecipe]" @closeAddToMenu="closeAddToMenu" />
  <Navbar :menu="Navigation"></Navbar>
  <main class="main main-menu" v-if="!filtersIsOpened">
    <div key="calendar-and-week" class="calendar-and-week">
      <CalendarController @export-this-week="importThisWeek" />
      <div class="week">
        <DayOfWeek :day="weekToExport" @showModalRecipeCard="showModalRecipeCard" @deleteMeal="deleteMeal" />
      </div>
    </div>
    <div class="recipes-list" key="recipes-list">
      <searchIngredients @search-get="searchGet" :button="true" :searchValidation="searchValidation"
        @open-filters="openCloseFilters" />
      <FilterList key="filter-list" />
      <div class="list">
        <TransitionGroup name="list">
          <RecipeСardVue v-for="item in recipesList" :item="item" :key="item.id" :wideCard="true"
            @showModalRecipeCard="showModalRecipeCard" @showAddToMenu="showAddToMenu" />
        </TransitionGroup>
      </div>
    </div>
  </main>
  <main class="main" v-else-if="filtersIsOpened">
    <Transition name="fade">
      <Filters @close-filters="openCloseFilters" />
    </Transition>
  </main>
  <NavbarFooterMobile></NavbarFooterMobile>
</template>

<style lang="scss" scoped>
.main-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
  height: 100vh;
  padding-top: 32px;
}

.main-recipe-card {
  padding: 0 64px 64px;

}

.calendar-and-week {
  height: 100%;
  width: calc(50% - 22px);
  ;
}


.week {
  display: flex;


  margin: 24px -10px 0 0;
  height: calc(100% - 160px);
  overflow: auto;

  &::after {
    content: '';
    width: 10px;
  }
}

.recipes-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  height: 100%;
  max-height: 200vh;
  overflow: auto;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  overflow: auto;
  height: 100%;
  width: 550px;
  padding-bottom: 50px;
}



@media (max-width: 1263px) {
  .calendar-and-week {
    width: calc(50% - 12px);
  }

  .wrapper-list {
    width: calc(50% - 12px);
  }

  .list {
    width: 100%;
  }
}

@media (max-width: 810px) {

  .week {
    flex-direction: column;
    margin: 24px 0 0 0;
    height: auto;

    &::after {
      display: none;
    }
  }

  .calendar-and-week {
    width: 100%;
    height: 100%;
  }

  .recipes-list {
    display: none;
  }
}
</style>