export default function timeZoneDiff(
  hostDT = "2015-01-30T10:00",
  userDT = "2015-01-30T10:00",
  hostTZ = "HST",
  userTZ = "CST"
) {
  const timeZonesUS = [
    { name: "HST", value: "0" },
    { name: "AKST", value: "1" },
    { name: "PST", value: "2" },
    { name: "MST", value: "3" },
    { name: "CST", value: "4" },
    { name: "EST", value: "5" },
  ];
  const matching1 = timeZonesUS.find(
    (element) => element.name === hostTZ
  )?.value;
  const matching2 = timeZonesUS.find(
    (element) => element.name === userTZ
  )?.value;

  const zoneDiff = matching1 - matching2;

  const hostTime = hostDT.split("T")[1].split("");

  const hostTimeStripped = hostTime[0] + hostTime[1];

  let newUserTZ = Number(hostTimeStripped) - Number(zoneDiff);
  if (newUserTZ > 12) newUserTZ -= 12;

  console.log(newUserTZ);

  //   return ;
}
timeZoneDiff("2015-01-30T10:00", "CST", "HST");
