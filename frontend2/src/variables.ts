import { lstat } from "fs";
import { getLastUpdate } from "./services/watermelon";
import * as moment from "moment"

export const BASE_URL = "http://192.168.15.38:3000";

export const getTimeStamp = async () => {
    const lastUpdate = await getLastUpdate();

    if (lastUpdate.length == 0) {
        return ``
    }

    const result = new Date(lastUpdate[0].lastUpdate)
    console.log("timestamp: "+result)

    return `?lastPulledAt=${result.getTime()/1000}`
}