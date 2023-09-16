import DataGenerator from "./modules/DataGenerator.js";
import fileWriter from "./modules/FileWriter.js";

const generateDataFile = () => {
    const dataGenerator = new DataGenerator();
    // generate cascade data
    dataGenerator.generateData();
    dataGenerator.generateMonthSumAllFilterData();
    dataGenerator.generateIndustryTypesSumAllFilterData();
    dataGenerator.generateLetterColors();
    dataGenerator.calculateDiffGlobal();
    // write data to file
    const data = dataGenerator.resultTemplate;
    fileWriter.writeFile(data, 'test');
    fileWriter.writeFileProduction(data, null);
};
generateDataFile();