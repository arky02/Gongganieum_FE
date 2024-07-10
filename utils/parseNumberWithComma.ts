export const parseNumberWithComma = (number: number) => {
  const str = String(number);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};
