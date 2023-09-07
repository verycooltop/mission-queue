/*
 * @Author: xyx kwin.xu@outlook.com 
 * @Date: 2021-12-26 18:21:21 
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-26 18:52:51
 */

import { QueueMissionUnit } from "../../../src/unit";
import { SamplesStore } from "../constants";

export const syncUnit = new QueueMissionUnit<SamplesStore>("sync");

syncUnit.task("sync-task", $store => { 
    $store.content.sync = $store.state.sum.a + $store.state.sum.b;
})