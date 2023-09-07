/*
 * @Author: xyx kwin.xu@outlook.com
 * @Date: 2021-12-24 15:04:40
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-24 17:14:50
 */

import { debuglog } from "util";
import { DoneCallback, QueueMissionState, QueueMissionStore, QueueMissionTaskHandle, RuntimeContext } from "./constants";
import { QueueMissionTask } from "./task";

export class QueueMissionUnit<TStore extends QueueMissionStore<unknown, unknown>> {
    private name: string;
    private stack: QueueMissionTask<TStore>[];

    constructor(name: string) {
        this.name = name;
        this.stack = [];
    }

    task(name: string, handle: QueueMissionTaskHandle<TStore>) {
        this.stack.push(new QueueMissionTask(name, handle));
    }

    dispatch($store: TStore, context: RuntimeContext, next_unit: DoneCallback) {
        context.currentNode.unit = this.name;
        debuglog(`${context.currentNode.mission} > ${context.currentNode.unit} start.`);
        const timestamp = Date.now();
        let idx: number = 0;
        const self = this;
        function next(error: unknown) {
            if (error) {
                return setImmediate(next_unit, error);
            }
            const task = self.stack[idx++];
            if (!(task instanceof QueueMissionTask)) {
                debuglog(`${context.currentNode.mission} > ${context.currentNode.unit} end.: ${Date.now() - timestamp}ms`)
                return setImmediate(next_unit);
            }
            setImmediate(task.execute.bind(task), $store, context, next);
        }
        setImmediate(next);
    }
}