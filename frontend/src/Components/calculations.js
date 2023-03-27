let calculations = {};

/* Put string zero in front of the date/time if it's less than 10. */
calculations.dateZero = (num) => {
  if (num < 10) return `0${num}`;
  return `${num}`;
};

/* Convert date into proper text format. */
calculations.convertDate = (date) => {
  let d = new Date(date);
  let new_date = `${d.getFullYear()}-${calculations.dateZero(
    d.getMonth() + 1
  )}-${d.getDate()},`;
  new_date += ` ${calculations.dateZero(d.getHours())}:${calculations.dateZero(
    d.getMinutes()
  )}`;
  return new_date;
};

/* Round to 2 decimal places */
calculations.roundNum = (num, digits, base) => {
  var pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
};

/* Add two numbers */
calculations.addNum = (left, right) => {
  if (!left || !right) return;
  if (typeof left === "string" || typeof right === "string")
    return parseFloat(left) + parseFloat(right);
  return left + right;
};

export default calculations;
