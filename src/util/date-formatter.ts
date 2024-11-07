export const formatDate = (time: boolean, isoDate: string | null) => {
  if (isoDate === null || isoDate === '-') {
    return null;
  }
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = ('0' + date.getHours()).slice(-2);

  if (time) {
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}. ${month}. ${year} - ${hours}:${minutes}`;
  }
  return `${day}. ${month}. ${year}`;
};
