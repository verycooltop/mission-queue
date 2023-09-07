/*
 * @Author: xyx kwin.xu@outlook.com
 * @Date: 2020-09-10 14:58:46
 * @Last Modified by: xyx kwin.xu@outlook.com
 * @Last Modified time: 2021-12-26 19:07:28
 */

import { EventEmitter } from 'events';

type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

abstract class Emitter<T extends EventMap> {
    abstract on<K extends EventKey<T>>
        (eventName: K, fn: EventReceiver<T[K]>): void;
    protected abstract emit<K extends EventKey<T>>
        (eventName: K, params: T[K]): void;
}

export default class IEventEmitter<T extends EventMap> extends Emitter<T> {
    private emitter = new EventEmitter();
    on<K extends EventKey<T>>(eventName: EventKey<T>, fn: EventReceiver<T[K]>) {
        this.emitter.on(eventName, fn);
    }

    protected emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
        this.emitter.emit(eventName, params);
    }
}