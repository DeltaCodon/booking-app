export default function datetimeFormatty(datetimeLocal) {
  const newDateTimeString = datetimeLocal.split("T");
  console.log(newDateTimeString, typeof newDateTimeString);
}

datetimeFormatty("2015-11-04T23:09");
