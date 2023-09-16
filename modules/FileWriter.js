import fs from "fs";
import path from "path";

class FileWriter {
    writeFile(data, fileName = 'industrial_data') {
        const strData = JSON.stringify(data);
        // writing the data to the file
        fs.writeFile(path.join(path.resolve(), `/result/${fileName}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getTime()}.json`), strData, (error) => {
            // throwing the error
            // in case of a writing problem
            if (error) {
              // logging the error
              console.error(error);
          
              throw error;
            }
          
            console.log("data.json written correctly");
          });
    }
}

export default new FileWriter();

