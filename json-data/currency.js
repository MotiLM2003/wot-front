export const currencies = [
  { id: 0, symbol: "  $" },
  { id: 1, symbol: "€" },
  { id: 3, symbol: "C$" },
  { id: 4, symbol: "A$" },
  { id: 5, symbol: "£" },
];

export const getCurrency = (id) => {
  const result = currencies.find((x) => parseInt(x.id) === parseInt(id));

  return result;
};
