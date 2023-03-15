<script>
import moment from 'moment';
import { getMonthWeeks } from '@/utils/datesUtils.js';

export default {
    data() {

        const startDate = moment().subtract(1, "month");
        const currentDate = moment()
        const futureDate = moment().add(1, "month");

        const previousMonth = getMonthWeeks(startDate);
        const currentMonth = getMonthWeeks(moment());
        const futureMonth = getMonthWeeks(futureDate);

        let indexOfMonth = 1;
        let indexOfWeek = 0;

        const allMonthsArray = [previousMonth, currentMonth, futureMonth];
        const month = allMonthsArray


        return {
            indexOfMonth,
            indexOfWeek,
            previousMonthName: new Intl.DateTimeFormat("ru", { month: "long" }).format(new Date(startDate)),
            currentMonthName: new Intl.DateTimeFormat("ru", { month: "long" }).format(new Date(currentDate)),
            futureMonthName: new Intl.DateTimeFormat("ru", { month: "long" }).format(new Date(futureDate)),
            month,
            currentWeek: true,
            previousMonth,
            currentMonth,
            futureMonth,
            exportWeek: null
        }
    },
    props: {

    },
    methods: {
        CapitalizedMonth(indexOfMonth) {
            if (indexOfMonth == 0) {
                return this.previousMonthName.charAt(0).toUpperCase() + this.previousMonthName.slice(1);
            } else if (indexOfMonth == 1) {
                return this.currentMonthName.charAt(0).toUpperCase() + this.currentMonthName.slice(1);
            } else if (indexOfMonth == 2) {
                return this.futureMonthName.charAt(0).toUpperCase() + this.futureMonthName.slice(1);
            } else {
                return ''
            }
        },
        next() {
            if (this.indexOfWeek < this.month[this.indexOfMonth].length - 1 && this.indexOfWeek >= 0) {
                this.toNextWeek()
                console.log('следующая неделя')
            } else {
                this.toNextMonth()
                console.log('следующий месяц')
            }

        },
        previous() {
            if (this.indexOfWeek < this.month[this.indexOfMonth].length - 1 && this.indexOfWeek > 0) {
                this.toPreviousWeek()
                console.log('прошлая неделя')
            } else {
                this.toPreviousMonth()
                console.log('прошлый месяц')
            }

        },
        toNextMonth() {
            if (this.indexOfMonth == 2) {
                console.log('месяцы закончились')
            } else {
                this.indexOfMonth += 1
                if (JSON.stringify(this.month[this.indexOfMonth - 1][this.month[this.indexOfMonth - 1].length - 1]) == JSON.stringify(this.month[this.indexOfMonth][0])) {
                    this.indexOfWeek = 1
                } else {
                    this.indexOfWeek = 0
                }
            }
        },
        toPreviousMonth() {
            if (this.indexOfMonth == 0) {
                console.log('месяцы закончились')
            } else {
                this.indexOfMonth -= 1

                if (JSON.stringify(this.month[this.indexOfMonth][this.month[this.indexOfMonth].length - 1]) == JSON.stringify(this.month[this.indexOfMonth + 1][0])) {
                    this.indexOfWeek = this.month[this.indexOfMonth].length - 2

                } else {
                    this.indexOfWeek = this.month[this.indexOfMonth].length - 1
                }
            }
        },
        toNextWeek() {
            this.indexOfWeek += 1
        },
        toPreviousWeek() {
            this.indexOfWeek -= 1
        },
        getCurrentWeek() {
            if (this.currentWeek) {
                const currentDate = moment();
                for (let i = 0; i < this.month[1].length; i++) {
                    const week = this.month[1][i];
                    if (currentDate.isBetween(week[0], week[week.length - 1], "day", "[]")) {
                        this.indexOfMonth = 1;
                        this.indexOfWeek = i;
                        this.currentWeek = false;
                        break;
                    }
                }
            }
        },
        exportThisWeek(){
            this.$emit('exportThisWeek', this.exportWeek)
        }
    },
    emits: ['exportThisWeek'],
    mounted() {
        this.getCurrentWeek()
        this.exportThisWeek()
    },
    computed:{
        showCurrentWeek(){
            this.exportWeek = this.month[this.indexOfMonth][this.indexOfWeek];
            return this.month[this.indexOfMonth][this.indexOfWeek]
        }
    },
    watch: {
        exportWeek(){
            this.exportThisWeek()
        }
    }
}
</script>

<template>
    <div class="calendar-controller">
        <div class="calendar-controller__header">
            <button class="calendar-controller__header-btn" @click="previous">
                <img src="/svg/icon-left.svg" alt="Влево">
            </button>
            <Transition appear name="fade">
                <h2 class="h-2">{{ CapitalizedMonth(indexOfMonth) }}</h2>
            </Transition>
            <button class="calendar-controller__header-btn" @click="next">
                <img src="/svg/icon-right.svg" alt="Вправо">
            </button>
        </div>
        <div class="calendar-controller__footer">
            <ul class="calendar-controller__footer_ul">
                <TransitionGroup appear name="fade">
                    <li v-for="day in showCurrentWeek" :key="day"
                        class="calendar-controller__footer_ul_li">
                        <span class="span-2">{{ new Intl.DateTimeFormat("ru", {
                            weekday:
                                "short"
                        }).format(day).toUpperCase() }}</span>
                        <p class="p-1">{{ new Intl.DateTimeFormat("ru", {
                            day: "numeric"
                        }).format(day) }}</p>
                    </li>
                </TransitionGroup>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.calendar-controller {
    padding: 24px 32px;
    background: var(--Light_orange_2);
    border-radius: 40px;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-btn {
            background: transparent;
            border: none;
            width: 24px;
            height: 24px;

            &:hover {
                cursor: pointer;
            }
        }
    }

    &__footer {
        padding-top: 16px;

        &_ul {
            display: flex;
            list-style: none;
            gap: 55px;
            width: 484px;
            overflow: hidden;

            &_li {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                width: 22px;
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>