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
      if (this.userStore.user) {
        // this.updateMenu()
        console.log('обновили!')
      }
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
          this.mappingWeek()
        }
      } else {
        this.week = week
        this.mappingWeek()
      }
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
    },
    moveToSuccess() {
      this.calendarControllerVisible = false,
        this.successVisible = true
    },
    closeSuccess() {
      this.updateMenu()
      this.calendarControllerVisible = true,
        this.successVisible = false
      console.log('ok')
    },
    async updateMenu() {
      let orders = await OrderDataService.getAll()
      this.userStore.userOrders = orders.data.filter(order => { if (order.userId === this.userStore.user.id) { return true; } else { return false; } })
    }
  },
  emits: ['closeAddToMenu'],
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    }
  }
};
</script>

<template>
  <div class="absolute-wrapper">
    <div class="background-modal" @click="closeAddToMenu" @keydown.esc="closeAddToMenu">
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
  top: calc(50% - 143.5px);
  left: calc(50% - 150px);
  width: 306px;
  height: 306px;
  background-color: var(--White);
  z-index: 3;
  display: flex;
  flex-direction: column;
  border: 3px solid var(--Gray);
  border-radius: 30px;
}

.wrapper-calendar {
  padding: 24px 0;
}</style>