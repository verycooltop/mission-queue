/*
 * @Author: xyx kwin.xu@outlook.com
 * @Date: 2020-08-31 10:57:41
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-26 19:02:46
 */

import { QueueMessage } from "./message";

export interface QueueMissionState {

}

export interface QueueMessagePayload {

}

export interface QueueMissionStore<TState extends QueueMissionState, C extends unknown> {
    state: TState;
    content: C;
}

export interface RuntimeContext {
    currentNode: {
        mission: string;
        unit: string;
    };
}

export interface DoneCallback {
    (error?: unknown, result?: unknown): void;
}

export interface QueueMissionTaskHandle<TStore extends QueueMissionStore<unknown, unknown>> {
    ($store: TStore): void;
}

export const PRIORITY_LEVEL = 0;

interface MessageConsumedResult {
    error: unknown,
    message: QueueMessage<unknown>;
}

export interface QueueEventMap {
    consumed: MessageConsumedResult;
}