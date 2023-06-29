<script>
import CalendarController from '@/components/Calendar-controller.vue'
import SuccessAdding from '@/components/SuccessAdding.vue';

import { useUserStore } from '@/stores/UserStore.js';
import OrderDataService from '@/services/OrderDataService'

export default {
  data() {
    return {
      week: null,
      weekToExport: null,
      calendarControllerVisible: true,
      successVisible: false
    };
  },
  components: {
    CalendarController,
    SuccessAdding
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeAddToMenu() {
      this.$emit('closeAddToMenu')
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
        }
      } else {
        this.week = week
      }
    },
    moveToSuccess() {
      this.calendarControllerVisible = false,
        this.successVisible = true
    },
    closeSuccess() {
      this.updateMenu()
      this.closeAddToMenu()
    },
    async updateMenu() {
      let orders = await OrderDataService.getAll()
      this.userStore.userOrders = orders.data.filter(order => { if (order.userId === this.userStore.user.id) { return true; } else { return false; } })
    },
    handleKeyDown(event) {
      if (event.keyCode === 27) {
        this.closeAddToMenu();
      }
    },
  },
  emits: ['closeAddToMenu'],
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
};
</script>

<template>
  <div class="absolute-wrapper">
    <div class="background-modal" @click="closeAddToMenu">
    </div>
    <div class="addToMenu_wrapper">
      <div class="addToMenu">
        <CalendarController v-if="calendarControllerVisible" @export-this-week="importThisWeek" :miniCalendar="true"
          :dishesId="item.id" @move-to-success="moveToSuccess" />
        <SuccessAdding v-if="successVisible" @close-success="closeSuccess" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(27, 27, 26, 0.2);
  z-index: 2;
  cursor: pointer;
  padding-right: 5px;
}

.addToMenu {
  position: fixed;
  top: 50%;
  left: calc(50% - 150px);
  width: 306px;
  height: auto;
  min-height: 300px;
  background-color: var(--White);
  z-index: 3;
  display: flex;
  flex-direction: column;
  border: 3px solid var(--Gray);
  border-radius: 30px;
  transform: translateY(-50%);
}

.wrapper-calendar {
  padding: 24px 0;
}
</style>