import DataGenerator from "./modules/DataGenerator.js";
import fileWriter from "./modules/FileWriter.js";

const generateDataFile = () => {
    const dataGenerator = new DataGenerator();
    const rawData = dataGenerator.generateData();
    const dataWithMonthAllFilter = dataGenerator.generateDataWithMonthAll(rawData);

    fileWriter.writeFile(data, 'test');
    fileWriter.writeFileProduction(data, null);
};
generateDataFile();