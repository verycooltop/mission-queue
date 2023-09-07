/*
 * @Author: xyx kwin.xu@outlook.com 
 * @Date: 2021-12-26 18:10:34 
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-26 18:52:16
 */

import { QueueMessagePayload, QueueMissionState, QueueMissionStore } from "../../src/constants";

export interface SamplesQueueMessagePayload extends QueueMessagePayload { 
    a: number;
    b: number;
    setTimeout: number;
}

export interface SamplesContent { 
    sync: number;
    async: number;
}

export interface SamplesState extends QueueMissionState { 
    sum: {
        a: number;
        b: number;
    };
    setTimeout: number;
}

export interface SamplesStore extends QueueMissionStore<SamplesState, SamplesContent> { 

}