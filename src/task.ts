/*
 * @Author: xyx kwin.xu@outlook.com
 * @Date: 2021-12-24 14:22:48
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-24 15:16:30
 */

import { debuglog } from "util";
import { DoneCallback, QueueMissionState, QueueMissionStore, QueueMissionTaskHandle, RuntimeContext } from "./constants";

export class QueueMissionTask<TStore extends QueueMissionStore<unknown, unknown>> {
    private name: string;
    private handle: QueueMissionTaskHandle<TStore>;

    constructor(name: string, handle: QueueMissionTaskHandle<TStore>) {
        this.name = name;
        this.handle = handle;
    }

    async execute($store: TStore, context: RuntimeContext, done: DoneCallback) {
        debuglog(`${context.currentNode.mission} > ${context.currentNode.unit} > ${this.name} start.`);
        try {
            const timestamp = Date.now();
            await this.handle($store);
            debuglog(`${context.currentNode.mission} > ${context.currentNode.unit} > ${this.name} end.: ${Date.now() - timestamp}ms`);
            setImmediate(done);
        }
        catch (err) {
            console.log(`${context.currentNode.mission} > ${context.currentNode.unit} > ${this.name} Error: ${err}`);
            return setImmediate(done, err);
        }
    }
}