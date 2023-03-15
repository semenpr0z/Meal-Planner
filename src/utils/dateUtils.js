import moment from "moment";

export function getDateRange() {
  moment.locale("ru");
  const currentDate = moment();
  const startDate = moment(currentDate).subtract(1, "month");
  const endDate = moment(currentDate).add(1, "month");
  const dateArray = [];

  let currentDateObj = moment(startDate);
  while (currentDateObj <= endDate) {
    dateArray.push(moment(currentDateObj));
    currentDateObj = moment(currentDateObj).add(1, "day");
  }

  return dateArray;
}
