import moment from 'moment';
moment.updateLocale('ru', {
    week: {
      dow: 1, // понедельник
    },
  });

export function getMonthWeeks(monthDate) {
  const firstDay = moment(monthDate).startOf('month').startOf('week');
  const lastDay = moment(monthDate).endOf('month').endOf('week');

  let currentDay = firstDay;
  const weeks = [];
  while (currentDay <= lastDay) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(moment(currentDay).format('D MMMM YYYY')));
      currentDay = moment(currentDay).add(1, 'day');
    }
    weeks.push(week);
  }
  return weeks;
}

