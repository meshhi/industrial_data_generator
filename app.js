import DataGenerator from "./modules/DataGenerator.js";
import fileWriter from "./modules/FileWriter.js";

const generateDataFile = () => {
    const dataGenerator = new DataGenerator();
    // generate cascade data
    const rawData = dataGenerator.generateData();
    const dataWithMonthSumAllFilterData = dataGenerator.generateMonthSumAllFilterData(rawData);
    const dataWithIndustryTypesSumAllFilterData = dataGenerator.generateIndustryTypesSumAllFilterData(dataWithMonthSumAllFilterData);
    // write data to file    
    const data = dataWithIndustryTypesSumAllFilterData;
    fileWriter.writeFile(data, 'test');
    fileWriter.writeFileProduction(data, null);
};
generateDataFile();