export default (year, month) => {
    var date1 = new Date(year, month-1, 1);
    var date2 = new Date(year, month, 1);
    return Math.round((date2 - date1) / 1000 / 3600 / 24);
}