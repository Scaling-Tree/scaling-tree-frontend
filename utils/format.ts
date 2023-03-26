export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const formatNumber = (num: number, digits: number = 2) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "Thousand" },
    { value: 1e6, symbol: "Million" },
    { value: 1e9, symbol: "Trillion" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + " " + item.symbol
    : "0";
};
