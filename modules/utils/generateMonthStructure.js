import howMuchDays from "./howMuchDays.js"

export default (year, month) => {
    const daysNumber = howMuchDays(year, month);
    let result = {};
    for (let i = 1; i <= daysNumber; i++) {
        result[i] = 0;
    }
    return result;
}