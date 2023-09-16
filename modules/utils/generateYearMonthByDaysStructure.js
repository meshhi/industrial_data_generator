import generateMonthStructure from "./generateMonthStructure.js";

export default (year, month) => {
    const result = {};
    for (let i = 1; i <= 12; i++) {
        result[i] = generateMonthStructure(year, month);
    }
    return result;
}