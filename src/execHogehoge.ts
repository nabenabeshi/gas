export const execHogehoge = (event:GoogleAppsScript.Events.TimeDriven): boolean => {
  return event?.["day-of-month"] === 1;
}
