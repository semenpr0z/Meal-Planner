<script>
import moment from 'moment';
import { getMonthWeeks } from '@/utils/datesUtils.js';
import { useUserStore } from '@/stores/UserStore.js';

import MiniMeal from '@/components/MiniMeal.vue';
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
            exportWeek: null,
            indexOfSelectedDay: 0,
            meals: [
                {
                    'name': 'Завтрак',
                    'mealsId': 1
                },
                {
                    'name': 'Перекус',
                    'mealsId': 2
                },
                {
                    'name': 'Обед',
                    'mealsId': 3
                },
                {
                    'name': 'Полдник',
                    'mealsId': 4
                },
                {
                    'name': 'Ужин',
                    'mealsId': 5
                }
            ]
        }
    },
    components: {
        MiniMeal
    },
    setup() {

        const userStore = useUserStore();
        return {
            userStore
        }
    },
    props: {
        miniCalendar: {
            type: Boolean,
            default: false
        },
        dishesId: {
            default: 0
        }
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
            this.indexOfSelectedDay = 0
        },
        previous() {
            if (this.indexOfWeek <= this.month[this.indexOfMonth].length - 1 && this.indexOfWeek > 0) {
                this.toPreviousWeek()
                console.log('прошлая неделя')
            } else {
                // console.log(this.indexOfWeek + '<' + (this.month[this.indexOfMonth].length - 1) + '&&' + this.indexOfWeek + '>' + 0)
                this.toPreviousMonth()
                console.log('прошлый месяц')

            }
            this.indexOfSelectedDay = 0
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
        exportThisWeek() {
            this.$emit('exportThisWeek', this.exportWeek)
        },
        capitalizeFirstLetter(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
        selectDay(index) {
            this.indexOfSelectedDay = index
        },
        moveToSuccess(){
            this.$emit('moveToSuccess')
        }
    },
    emits: ['exportThisWeek', 'moveToSuccess'],
    mounted() {
        this.getCurrentWeek()
        this.exportThisWeek()
    },
    computed: {
        showCurrentWeek() {
            this.exportWeek = this.month[this.indexOfMonth][this.indexOfWeek];
            return this.month[this.indexOfMonth][this.indexOfWeek]
        },
        showSelectedDay() {
            console.log('формируем неделю')
            const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const formattedDate = formatter.format(this.month[this.indexOfMonth][this.indexOfWeek][this.indexOfSelectedDay]).replace(/\./g, "-");
            const order = this.userStore.userOrders.filter(order => order.dishesDate === formattedDate);
            if (order.length > 0) {
                let mappedMeals = this.meals.map(meal => {
                    let mealsId = order.filter(order => meal.mealsId == order.mealsId)
                    if (mealsId.length) {
                        return {
                            'name': meal.name,
                            'mealsId': meal.mealsId,
                            'amount': mealsId.length,
                            'date': formattedDate,
                            'dishesId': this.dishesId
                        }
                    } else {
                        return {
                            'name': meal.name,
                            'mealsId': meal.mealsId,
                            'date': formattedDate,
                            'dishesId': this.dishesId
                        }
                    }
                })


                return mappedMeals

            } else {
                let mappedMeals = this.meals.map(meal => {
                    return {
                        'name': meal.name,
                        'mealsId': meal.mealsId,
                        'date': formattedDate,
                        'dishesId': this.dishesId
                    }
                }
                )
                return mappedMeals
            }
        }
    },
    watch: {
        exportWeek() {
            this.exportThisWeek()
        }
    }
}
</script>

<template>
    <div class="calendar-controller" v-if="!miniCalendar">
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
                    <li v-for="day in showCurrentWeek" :key="day" class="calendar-controller__footer_ul_li">
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
    <div class="calendar-controller-mini" v-else="miniCalendar">
        <div class="calendar-controller-mini__header">
            <button class="calendar-controller-mini__header-btn" @click="previous">
                <img src="/svg/icon-left-mini.svg" alt="Влево">
            </button>
            <Transition appear name="fade">
                <h2 class="p-1">{{ CapitalizedMonth(indexOfMonth) }}</h2>
            </Transition>
            <button class="calendar-controller-mini__header-btn" @click="next">
                <img src="/svg/icon-right-mini.svg" alt="Вправо">
            </button>
        </div>
        <div class="calendar-controller-mini__footer">
            <ul class="calendar-controller-mini__footer_ul">
                <TransitionGroup appear name="fade">
                    <li v-for="(day, index) in showCurrentWeek" :key="day" class="calendar-controller-mini__footer_ul_li"
                        @click="() => { selectDay(index) }">
                        <span
                            :class="['span-3', 'calendar-controller-mini__footer_ul_li-span', { 'active': indexOfSelectedDay == index }]">{{
                                capitalizeFirstLetter(new
                                    Intl.DateTimeFormat("ru", {
                                        weekday:
                                            "short"
                                    }).format(day)) }}</span>
                        <p class="span-3">{{ new Intl.DateTimeFormat("ru", {
                            day: "numeric"
                        }).format(day) }}</p>
                    </li>
                </TransitionGroup>
            </ul>
            <ul class="calendar-controller-mini__day-meals">
                <MiniMeal v-for="meal in showSelectedDay" :meal="meal" @move-to-success="moveToSuccess"/>
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

.calendar-controller-mini {
    padding: 18px 24px;
    background: transparent;
    border-radius: 40px;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-btn {
            background: transparent;
            border: none;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                cursor: pointer;
            }
        }
    }

    &__footer {
        padding-top: 9px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;

        &_ul {
            display: flex;
            list-style: none;
            justify-content: center;
            width: 230px;
            overflow: hidden;
            gap: 1px;

            &_li {
                display: flex;
                flex-direction: column;
                align-items: center;

                width: 32px;

                &-span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                }

                &:hover>&-span {
                    background-color: var(--Light_orange_2);
                    border-radius: 50%;
                }

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .active {
        background-color: var(--Light_orange_2);
        border-radius: 50%;
    }

    &__day-meals {
        display: flex;
        flex-direction: column;
        gap: 12px;
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