/*
 * @Author: xyx kwin.xu@outlook.com 
 * @Date: 2021-12-26 18:02:43 
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-26 19:11:42
 */

import { QueueMission } from "../../src/mission";
import { MissionEnum } from "../constants";
import { SamplesQueueMessagePayload, SamplesStore } from "./constants";
import { units } from "./units";

class SamplesMission extends QueueMission<SamplesQueueMessagePayload, SamplesStore> {
    constructor() { 
        super(MissionEnum.Samples, units);
    }

    protected before($store: SamplesStore, message: SamplesQueueMessagePayload): void {
        console.log(":::before");
        $store.state = {
            sum: {
                a: message.a,
                b: message.b,
            },
            setTimeout: message.setTimeout
        };
        $store.content = {
            async: undefined,
            sync: undefined
        };
    }

    protected after($store: SamplesStore): void {
        console.log(":::after");
        console.log($store.content);
    }
}

export const samplesMission = new SamplesMission();