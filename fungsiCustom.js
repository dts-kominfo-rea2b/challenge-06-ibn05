// TODO: import module bila dibutuhkan di sini
const fs = require("fs");

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
    file1 = val;
};
let modifyFile2 = (val) => {
    file2 = val;
};
let modifyFile3 = (val) => {
    file3 = val;
};

// TODO: Kerjakan bacaData
// gunakan variabel file1, file2, dan file3

const splitMessage = (message) => {
    const splittedMessage = message.split(" ");

    if (splittedMessage?.length >= 1) {
        return splittedMessage[1];
    }

    return false;
};

const getExpectedMessage = (message) => {
    // Parse the message string
    let expectedMessage = JSON.parse(message);

    if (expectedMessage?.message) return splitMessage(expectedMessage.message);
    if (expectedMessage[0]?.message)
        return splitMessage(expectedMessage[0]?.message);
    if (expectedMessage[0]?.data?.message)
        return splitMessage(expectedMessage[0]?.data?.message);

    return false;
};

const bacaData = (fnCallback) => {
    //  Define all variable needs
    const arrFile = [file1, file2, file3];
    const messages = [];

    // Get the message of each file with promise, push the result to messages variable
    arrFile.forEach((item, index) => {
        const message = new Promise((resolve, reject) => {
            fs.readFile(item, (err, data) => {
                if (err) reject(err);
                resolve(getExpectedMessage(data));
            });
        });
        messages.push(message);
    });

    // run all promises
    Promise.all(messages)
        .then((messages) => fnCallback(null, messages))
        .catch((err) => fnCallback(err, null));
};

// ! JANGAN DIMODIFIKASI
module.exports = {
    modifyFile1,
    modifyFile2,
    modifyFile3,
    bacaData,
};
