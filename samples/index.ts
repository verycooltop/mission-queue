/*
 * @Author: xyx kwin.xu@outlook.com 
 * @Date: 2021-12-26 18:00:44 
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-26 19:47:52
 */

import { Queue } from "../src";
import { MissionEnum } from "./constants";
import { samplesMission } from "./mission";
import { SamplesQueueMessagePayload } from "./mission/constants";

const queue = new Queue();

queue.mission(samplesMission);
queue.start();

queue.on("consumed", result => {
    console.log("---------------------")
    console.log(result.error);
    console.log(result.message);
})

const payload: SamplesQueueMessagePayload = {
    a: 1,
    b: 2,
    setTimeout: 3000
};
const msg = queue.createMsg(MissionEnum.Samples, payload);
queue.send([msg]);

const payload2: SamplesQueueMessagePayload = {
    a: 2,
    b: 2,
    setTimeout: 1000
};
const errMsg = queue.createMsg(MissionEnum.Samples + "test error mission", payload2);
queue.send([errMsg]);

const payload3: SamplesQueueMessagePayload = {
    a: 2,
    b: 2,
    setTimeout: 1000
};
const destroyMsg = queue.createMsg(MissionEnum.Samples, payload3);
queue.send([destroyMsg]);
queue.destroyMsg(destroyMsg.identifier);
