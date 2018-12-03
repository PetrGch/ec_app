export const baseCurrency = [
  {
    index: "company_name",
    key: "company_name",
    title: ""
  },
  {
    index: "usd",
    key: "usd",
    title: "USD",
    renderCell: (record, config) => (`${record[config.key]} $`)
  },
  {
    index: "eur",
    key: "eur",
    title: "EUR",
    renderCell: (record, config) => (`${record[config.key]} €`)
  }
];
