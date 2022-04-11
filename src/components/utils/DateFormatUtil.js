export var dateFormatter = function (cell) {
  if (typeof cell !== "object") {
    cell = new Date(cell);
    return `${("0" + cell.getDate()).slice(-2)}/${(
      "0" +
      (cell.getMonth() + 1)
    ).slice(-2)}/${cell.getFullYear()}`;
  } else return null;
};

export var dateFormatterWithTime = function (cell) {
  if (typeof cell !== "object") {
    cell = new Date(cell);
    return `${("0" + cell.getDate()).slice(-2)}/${(
      "0" +
      (cell.getMonth() + 1)
    ).slice(-2)}/${cell.getFullYear()} ${cell.toTimeString().substring(0, 5)}`;
  } else return null;
};
