<script>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
  import searchIngredients from '@/components/Search-ingredients.vue';
  import RecipeСardVue  from '@/components/Recipe-сard.vue';
  import ButtonUi from '@/components/ui-kit/Button-ui.vue';
  import ModalRecipeCard from '@/components/ModalRecipeCard.vue';


  import axios from 'axios'

export default {
  data() {
    return {
        localInfo: [],
        indexOfRecipe: 0,
        isModalRecipeCardVisible: false
    };
  },
  components: {
    Navbar,
    NavbarFooterMobile,
    searchIngredients,
    RecipeСardVue,
    ButtonUi,
    ModalRecipeCard
  },
  beforeMount() {
    axios
      .get('https://63f0ad9c5703e063fa4a4a59.mockapi.io/api/recipes')
      .then(response => (this.localInfo = response.data));
  },
  methods: {
    showModalRecipeCard (id) {
      this.indexOfRecipe = this.localInfo.findIndex(x => x.id == id);
      this.isModalRecipeCardVisible = true;
      document.body.style.overflowY = 'hidden';
    },
    closeModalRecipeCard() {
      this.isModalRecipeCardVisible = false;
      document.body.style.removeProperty("overflow-y")
    }
  }
};
</script>

<template>
<Navbar></Navbar>
<main class="main">
    <Transition name="fade">
      <ModalRecipeCard v-if="isModalRecipeCardVisible"
      :item="localInfo[indexOfRecipe]"
      @closeModalRecipeCard="closeModalRecipeCard"/>
    </Transition>
    <searchIngredients></searchIngredients>
    <div class="wrapper-recipes-list">
      <TransitionGroup name="list">
        <RecipeСardVue v-for="item in localInfo"
        :item="item"
        :key="item.id"
        @showModalRecipeCard="showModalRecipeCard"/>
      </TransitionGroup>
    </div>
    <ButtonUi class="button-more-recipes" text="Посмотреть еще"></ButtonUi>
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.wrapper-recipes-list{
  margin-top: 58px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.button-more-recipes{
  margin-top: 46px;
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