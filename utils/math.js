export const getPercentage = (total, current) => {
  const precentage = (total / current) * 100;
  return precentage;
};
export const getPercentageValue = (total, percentage) => {
  const percentageValue = total * (percentage / 100);
  return percentageValue;
};
