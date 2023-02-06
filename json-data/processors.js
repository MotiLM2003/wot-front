export const processors = [
  {
    id: 0,
    name: "Banquest",
  },
  {
    id: 1,
    name: "Paypal",
  },
  {
    id: 2,
    name: "GooglePay",
  },
  {
    id: 3,
    name: "unknown",
  },
];

const getProcessName = (index) => {
  return processors[index];
};
