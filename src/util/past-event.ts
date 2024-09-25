export const isDateTimeInPast = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  const now = new Date();
  return dateTime < now;
};
