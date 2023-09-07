/*
 * @Author: xyx kwin.xu@outlook.com 
 * @Date: 2021-12-26 18:07:39 
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-26 19:13:06
 */

import { QueueMissionUnit } from "../../../src/unit";
import { SamplesStore } from "../constants";

export const asyncUnit = new QueueMissionUnit<SamplesStore>("async");

asyncUnit.task("async", async $store => {
    return new Promise((resolve) => {
        setTimeout(() => {
            $store.content.async = $store.state.sum.a + $store.state.sum.b;
            return resolve();
        }, 4000)
    });
});