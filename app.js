import DataGenerator from "./modules/DataGenerator.js";
import fileWriter from "./modules/FileWriter.js";

const generateDataFile = () => {
    const dataGenerator = new DataGenerator();
    const data = dataGenerator.generateData();

    fileWriter.writeFile(data, 'test2');
};

generateDataFile();