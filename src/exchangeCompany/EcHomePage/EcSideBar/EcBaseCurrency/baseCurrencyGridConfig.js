export const baseCurrency = [
  {
    index: "operation",
    key: "operation",
    title: ""
  },
  {
    index: "USD",
    key: "USD",
    title: "USD",
    renderCell: (record, config) => (`${record[config.key]} $`)
  },
  {
    index: "EUR",
    key: "EUR",
    title: "EUR",
    renderCell: (record, config) => (`${record[config.key]} €`)
  }
];
