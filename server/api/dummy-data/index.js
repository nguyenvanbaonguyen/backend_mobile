const fs = require("fs");
const { exit } = require("process");
const { promisify } = require("util");
const busStopModel = require("../components/busStop/busStop.model");
const routeModel = require("../components/route/route.model");

//phoneGeneral
const nameDb = process.argv[2];

// const data = JSON.parse(fs.readFileSync(`${__dirname}/${nameDb}.json`, "utf-8"));

const MODELS = {
    route: routeModel,
    busStop: busStopModel,
};

const handleData = (data) => {
    return data.map((item) => {
        let timeStart = item.startTime.split(":")[0] * 1;
        const timeEnd = item.endTime.split(":")[0] * 1;
        let minutes = 0;
        const schedules = [];
        while (timeStart < timeEnd) {
            schedules.push(`${timeStart}:${minutes > 10 ? minutes : "0" + minutes}`);
            minutes += item.distanceTime;
            if (minutes >= 60) {
                minutes -= 60;
                timeStart++;
            }
        }
        item.schedules = schedules;
        return item;
    });
};

const wrapper = {
    route: handleData,
};

const addDummyData = async () => {
    try {
        await Promise.all(
            Object.entries(MODELS).map(async ([key, value]) => {
                let data = await promisify(fs.readFile)(`${__dirname}/${key}.json`, "utf-8");
                data = JSON.parse(data);
                await MODELS[key].deleteMany();
                data = wrapper[key] ? wrapper[key](data) : data;
                await MODELS[key].create(data);
            })
        );
        exit(1);
    } catch (err) {
        console.log(err);
    }
};

addDummyData();

const importData = async () => {
    try {
        await MODELS[nameDb].create(handleData(data));
        exit(1);
    } catch (err) {
        console.log(err);
    }
};

const deleteData = async () => {
    try {
        await MODELS[nameDb].deleteMany();
        exit(1);
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[3] === "--import") {
    importData();
}
if (process.argv[3] === "--delete") {
    deleteData();
}
