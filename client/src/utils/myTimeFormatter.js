function timeFormatty(datetimeLocal) {
  const newDateTimeString = datetimeLocal.split("T");

  let timeInHours = Number(newDateTimeString[1][0] + newDateTimeString[1][1]);
  const timeInMinutes = newDateTimeString[1][3] + newDateTimeString[1][4];

  if (timeInHours > 12) {
    timeInHours -= 12;
    return `${timeInHours}:${timeInMinutes} pm`;
  }
  return `${timeInHours}:${timeInMinutes} am`;
}

function dateFormatty(datetimeLocal) {
  const arrObjMonths = [
    { month: "January", monthNumber: "01" },
    { month: "February", monthNumber: "02" },
    { month: "March", monthNumber: "03" },
    { month: "April", monthNumber: "04" },
    { month: "May", monthNumber: "05" },
    { month: "June", monthNumber: "06" },
    { month: "July", monthNumber: "07" },
    { month: "August", monthNumber: "08" },
    { month: "September", monthNumber: "09" },
    { month: "October", monthNumber: "10" },
    { month: "November", monthNumber: "11" },
    { month: "December", monthNumber: "12" },
  ];

  const newDateTimeString = datetimeLocal.split("T")[0];

  const dateYear = newDateTimeString.slice(0, 4);
  const dateMonth = arrObjMonths.find(
    (element) => element.monthNumber === newDateTimeString.slice(5, 7)
  )?.month;
  const dateDay = newDateTimeString.slice(8, 10);

  return `${dateMonth} ${dateDay}, ${dateYear}`;
}

function finalDateTimeFunction(datetimeLocal) {
  const newDate = dateFormatty(datetimeLocal);
  const newTime = timeFormatty(datetimeLocal);

  console.log(`${newDate} at ${newTime}`);
  return `${newDate} at ${newTime}`;
}

export default finalDateTimeFunction;
