<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
import Calendar from '@/components/Calendar.vue';
import CalendarController from '@/components/Calendar-controller.vue';
import DayOfWeek from '@/components/DayOfWeek.vue';
import addToMenu from '@/components/addToMenu.vue';
import RecipeСardVue from '@/components/Recipe-сard.vue';
import searchIngredients from '@/components/search-ingredients.vue'


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
      weekToExport: null,
      searchValidation: true
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
    searchIngredients
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
    closeRecipeCard() {
      this.isRecipeCardVisible = false;
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
      this.weekToExport = this.week.map(day => {
        const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedDate = formatter.format(day).replace(/\./g, "-");
        const order = this.userStore.userOrders.filter(order => order.dishesDate === formattedDate);
        if (order) {
          return {
            "day": day,
            "meals": order
          }
        } else {
          return { "day": day }
        }
      })
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
      return this.localRecipes.filter(item => (item.name.toUpperCase().indexOf(this.search.toUpperCase()) !== -1))
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
  <!-- <Transition name="fade"> -->
  <addToMenu v-if="isAddToMenuVisible" :item="localRecipes[indexOfRecipe]" @closeAddToMenu="closeAddToMenu" />
  <!-- </Transition> -->
  <Navbar :menu="Navigation"></Navbar>
  <main class="main main-menu" v-if="!isRecipeCardVisible">
    <div key="calendar-and-week" class="calendar-and-week">
      <CalendarController @export-this-week="importThisWeek" />
      <div class="week">
        <DayOfWeek v-for="day in weekToExport" :day="day" @showModalRecipeCard="showModalRecipeCard"
          @deleteMeal="deleteMeal" />
      </div>
    </div>
    <div class="recipes-list" key="recipes-list">
      <searchIngredients  @search-get="searchGet" :button="true" :searchValidation="searchValidation" />
      <div class="list">
        <TransitionGroup name="list">
          <RecipeСardVue v-for="item in recipesList" :item="item" :key="item.id" :wideCard="true"
            @showModalRecipeCard="showModalRecipeCard" @showAddToMenu="showAddToMenu" />
        </TransitionGroup>
      </div>
    </div>
  </main>
  <NavbarFooterMobile></NavbarFooterMobile>
</template>

<style lang="scss" scoped>
.main-menu {
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: flex-start;
  height: 100vh;
  position: relative;
  padding-top: 32px;
}

.main-recipe-card {
  padding: 0 64px 64px;

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
  gap: 16px;
  margin: 24px 0;
}

.recipes-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  position: absolute;
  right: 64px;
  height: 100%;
  overflow: auto;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  overflow: auto;
  height: auto;
  width: 550px;
  padding-bottom: 50px;
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