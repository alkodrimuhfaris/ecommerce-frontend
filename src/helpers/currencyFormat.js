export default (price, prefix='Rp ') => {
  let number_string = price ? price.toString() : '0',
    split = number_string.split(","),
    rest = split[0].length % 3,
    currency = split[0].substr(0, rest),
    thousand = split[0].substr(rest).match(/\d{3}/gi)

  if (thousand) {
    let separator = rest ? "." : ""
    currency += separator + thousand.join(".")
  }

  currency = split[1] != undefined ? currency + ',' + split[1] : currency
  return prefix == undefined ? currency : currency ? prefix + currency : ""
}