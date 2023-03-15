<script>
import { getDateRange } from '@/utils/dateUtils.js';
import { sortBy } from 'lodash';
import moment from 'moment';

export default {
    data() {

        return {
            index: 0
        }
    },
    props: {
        month: {
            type: Array,
            required: true
        },
        monthName: {
            type: String,
            required: true
        },
        toLastWeek: {
            type: Boolean,
            required: true,
            default: false
        },
        toSecondWeek: {
            type: Boolean,
            default: false
        },
        lastMonth: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        previousWeek() {
            if (this.index == 0) {
                this.previousMonth()
            } else {
                this.index -= 1
            }
        },
        nextWeek() {
            if (this.index == this.month.length - 2 && this.lastMonth) {
                this.index += 1

            } else if (this.index == this.month.length - 1) {
                this.nextMonth()
            } else {
                this.index += 1
            }
        },
        previousMonth() {
            this.$emit('previousMonth')
        },
        nextMonth() {
            this.$emit('nextMonth')
        },
        getCapitalizedMonthName() {
            if (!this.monthName) return '';
            return this.monthName.charAt(0).toUpperCase() + this.monthName.slice(1);
        },
        moveToLastWeek() {
            if (this.toLastWeek) {
                this.index = this.month.length - 2
            }
        },
        moveToSecondWeek() {
            if (this.toSecondWeek) {
                this.index = 1
            }
        },
        moveToCurrentWeek() {
            if (!this.toLastWeek) {
                const today = new Date();
                for (let i = 0; i < this.month.length; i++) {
                    const week = this.month[i];
                    if (week.some(day => this.isSameDay(day, today))) {
                        this.index = i;
                        break;
                    }
                }
            }
        },
        isSameDay(date1, date2) {
            return (
                date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear()
            );
        }
    },
    emits: ['previousMonth', 'nextMonth'],
    mounted() {
        this.moveToLastWeek();
        this.moveToSecondWeek();
        this.moveToCurrentWeek();
    }
}
</script>

<template>
    <!-- <div v-for="week in month" :key="week">
                      <div v-for="day in week" :key="day">{{ day }}</div>
                    </div> -->

    <div class="calendar">
        <div class="calendar-header">
            <div class="calendar-header__top">
                <button class="calendar-header__top-btn" @click="previousWeek"><img src="/svg/icon-left.svg"
                        alt="Влево"></button>
                <Transition appear name="fade">
                    <h2>{{ getCapitalizedMonthName() }}</h2>
                </Transition>
                <button class="calendar-header__top-btn" @click="nextWeek"><img src="/svg/icon-right.svg"
                        alt="Вправо"></button>
            </div>
            <div class="calendar-header__bottom">
                <TransitionGroup appear name="fade">
                    <ul :key="month[index]" class="calendar-header__bottom_ul">
                        <li v-for="day in month[index]" :key="day" class="calendar-header__bottom_ul_li">
                            <span class="calendar-header__bottom_ul_li__span">{{ new Intl.DateTimeFormat("ru", {
                                weekday:
                                    "short"
                            }).format(day).toUpperCase() }}</span>
                            <p class="calendar-header__bottom_ul_li__p">{{ new Intl.DateTimeFormat("ru", {
                                day: "numeric"
                            }).format(day) }}</p>
                        </li>
                    </ul>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.calendar {
    &-header {
        padding: 24px 32px;

        &__top {
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

        &__bottom {
            padding-top: 16px;

            &_ul {
                display: flex;
                list-style: none;
                gap: 55px;

                &_li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    width: 22px;

                    &__span {}

                    &__p {}
                }
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;

}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    position: absolute;
}
</style>