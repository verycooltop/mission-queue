import { PRIORITY_LEVEL, QueueEventMap, QueueMessagePayload, QueueMissionStore } from "./constants";
import IEventEmitter from "./event";
import { QueueMessage } from "./message";
import { QueueMission } from "./mission";

export class Queue<M extends QueueMessage<unknown>> extends IEventEmitter<QueueEventMap> {
    private isRunning: boolean;
    private messages: M[];
    private missionMap: Map<string, QueueMission<unknown , QueueMissionStore<unknown, unknown>>>;

    private currentConsumeMsg: M;

    constructor() {
        super();
        this.isRunning = false;
        this.messages = [];
        this.missionMap = new Map();
    }

    /**
     * create message
     * @param mission  
     * @param payload 
     * @param isFirstPriority 
     * @param group 
     * @returns 
     */
    createMsg<MsgPayload extends QueueMessagePayload>(
        mission: string,
        payload: MsgPayload,
        isFirstPriority?: boolean
        /* , group?: string */
    ): QueueMessage<MsgPayload> {
        let priority_level = PRIORITY_LEVEL;
        if (isFirstPriority) {
            this.messages.forEach(msg => msg.priority_level > priority_level && (priority_level = msg.priority_level));
            priority_level++;
        }
        return new QueueMessage(mission, payload, priority_level);
    }

    /**
     * send queue message
     * @param msgs 
     */
    send(msgs: M[]) {
        console.log(`:::queue: send ${msgs.length} queue message.`);
        this.messages = [].concat(this.messages, msgs);
        this.sortMsgs();
        this.consume();
    }

    destroyMsg(identifier: string) { 
        const idx = this.messages.findIndex(msg => msg.identifier === identifier);
        if (idx < 0) { 
            return;
        }
        this.messages.splice(idx, 1);
        console.log(`:::queue: destroy message: ${identifier} success.`);
    }

    /**
     * register mission
     * @param mission 
     */
    mission(mission: QueueMission<any, QueueMissionStore<any, any>>) {
        this.missionMap.set(mission.name, mission);
    }

    private print() { 
        console.log(`:::queue: number of messages in the current queue: ${this.messages.length}`);
        console.log(`:::queue: current running mission: ${this.currentConsumeMsg?.mission}`);
    }

    /**
     * next message
     */
    private takeMsg() {
        this.currentConsumeMsg = this.messages.shift() as M;
    }

    private completed(error: unknown) { 
        this.emit("consumed", { error, message: this.currentConsumeMsg });
        this.isRunning = false;
        this.currentConsumeMsg = undefined;
        this.consume();
    }

    private consume(): void { 
        if (this.isRunning) { 
            this.print();
            return;
        }
        this.takeMsg();
        if (!this.currentConsumeMsg) { 
            this.print();
            return;
        }
        const mission = this.missionMap.get(this.currentConsumeMsg.mission);
        if (!mission) { 
            console.log(`:::queue: invalid message:`);
            console.log(this.currentConsumeMsg.toString());
            this.emit("consumed", { error: `invalid mission: ${this.currentConsumeMsg.mission}`, message: this.currentConsumeMsg });
            return this.consume();
        }
        this.isRunning = true;
        this.print();
        setImmediate(mission.dispatch.bind(mission), this.currentConsumeMsg, this.completed.bind(this));
    }

    start(): void {
        this.consume();
    }

    private sortMsgs() { 
        this.messages.sort((a, b) => {
            if (a.priority_level !== b.priority_level) {
                return b.priority_level - a.priority_level;
            }
            return b.created_at - a.created_at;
        });
    }
}