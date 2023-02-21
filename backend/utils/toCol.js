function toColUTC(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 5, date.getMinutes(), date.getSeconds())
}

module.exports = toColUTC;