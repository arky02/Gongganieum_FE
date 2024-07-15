export const parseDateToString = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

export const parseStringToDate = (date: string | undefined | null) => {
  if (!date) {
    return;
  }
  const parsedDate = date.split('/');
  return {
    year: Number(parsedDate[0]),
    month: Number(parsedDate[1]),
    day: Number(parsedDate[2]),
  };
};
