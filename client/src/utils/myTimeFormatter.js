const arrObjMonths = [
  { month: "January", monthNumber: "01", monthDays: "31" },
  { month: "February", monthNumber: "02", monthDays: "28" },
  { month: "March", monthNumber: "03", monthDays: "31" },
  { month: "April", monthNumber: "04", monthDays: "30" },
  { month: "May", monthNumber: "05", monthDays: "31" },
  { month: "June", monthNumber: "06", monthDays: "30" },
  { month: "July", monthNumber: "07", monthDays: "31" },
  { month: "August", monthNumber: "08", monthDays: "31" },
  { month: "September", monthNumber: "09", monthDays: "30" },
  { month: "October", monthNumber: "10", monthDays: "31" },
  { month: "November", monthNumber: "11", monthDays: "30" },
  { month: "December", monthNumber: "12", monthDays: "31" },
];

export function timeFormatty(datetimeLocal) {
  const newDateTimeString = datetimeLocal.split("T");

  let timeInHours = Number(newDateTimeString[1][0] + newDateTimeString[1][1]);
  const timeInMinutes = newDateTimeString[1][3] + newDateTimeString[1][4];

  if (timeInHours > 12) {
    timeInHours -= 12;
    return `${timeInHours}:${timeInMinutes} pm`;
  }
  return `${timeInHours}:${timeInMinutes} am`;
}

export function dateFormatty(datetimeLocal) {
  const newDateTimeString = datetimeLocal.split("T")[0];

  const dateYear = newDateTimeString.slice(0, 4);
  const dateMonth = arrObjMonths.find(
    (element) => element.monthNumber === newDateTimeString.slice(5, 7)
  )?.month;
  const dateDay = newDateTimeString.slice(8, 10);

  return [dateMonth, dateDay, dateYear];
}

export function finalDateTimeFunction(datetimeLocal) {
  const [month, day, year] = dateFormatty(datetimeLocal);
  const newTime = timeFormatty(datetimeLocal);

  return `${month} ${day}, ${year} at ${newTime}`;
}

function checkLeapYear(yearInitial, yearFinal) {
  if (yearFinal === yearInitial) {
    if (yearFinal % 400 == 0 || (yearFinal % 4 == 0 && yearFinal % 100 != 0)) {
      return true;
    }
    return false;
  }

  for (let i = yearInitial; i < yearFinal; i++) {
    if (i % 400 == 0 || (i % 4 == 0 && i % 100 != 0)) {
      return true;
    }
    return false;
  }
}

export function differenceInDate(initialDay, finalDay) {
  const [monthNameInitial, dayInitial, yearInitial] = dateFormatty(initialDay);
  const monthNumInitial = arrObjMonths.find(
    (element) => element.month === monthNameInitial
  )?.monthNumber;

  const [monthNameFinal, dayFinal, yearFinal] = dateFormatty(finalDay);
  const monthNumFinal = arrObjMonths.find(
    (element) => element.month === monthNameFinal
  )?.monthNumber;

  const startDate = {
    month: Number(monthNumInitial),
    day: Number(dayInitial),
    year: Number(yearInitial),
  };
  const endDate = {
    month: Number(monthNumFinal),
    day: Number(dayFinal),
    year: Number(yearFinal),
  };

  // if block determines if the start date inputted is not the same day or older in time than the end date.
  if (
    startDate.year > endDate.year ||
    (startDate.year > endDate.year &&
      startDate.month > endDate.month &&
      startDate.day >= endDate.day)
  ) {
    console.error(
      "Starting date needs to be a date prior to ending date by at least one (1) day.",
      startDate,
      endDate
    );
    return undefined;
  }

  let daysBetween = endDate.day - startDate.day;
  let monthsBewteen = endDate.month - startDate.month;
  let yearsBetween = endDate.year - startDate.year;
  let startingMonth = startDate.month;

  if (yearsBetween > 0) {
    monthsBewteen += yearsBetween * 12;
  }

  if (monthsBewteen > 0) {
    for (let iterator = 0; iterator < monthsBewteen; iterator++) {
      if (startingMonth >= 13) {
        startingMonth -= 12;
      }

      daysBetween += Number(
        arrObjMonths.find(
          (element) => Number(element.monthNumber) == startingMonth
        )?.monthDays
      );

      if (startingMonth == 2) {
        if (checkLeapYear(startDate.year, endDate.year)) {
          daysBetween++;
        }
      }
      startingMonth++;

      console.log(startingMonth, daysBetween, monthsBewteen);
    }
  }
  console.log(daysBetween);

  return daysBetween;
}
