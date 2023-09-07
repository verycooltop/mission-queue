import { v4 } from "node-uuid";
import { QueueMessagePayload } from "./constants";

enum MissionFinishedStateEnum {
    Unfinished = 1,
    Finished
}

export class QueueMessage<MsgPayload extends QueueMessagePayload> {
    private readonly _mission: string;
    private readonly _identifier: string;
    private readonly _payload: MsgPayload;
    private readonly _priority_level: number;
    private readonly _group: string;
    private readonly _created_at: number;
    private finished_state: MissionFinishedStateEnum;

    constructor(
        mission: string,
        payload: MsgPayload,
        priority_level: number,
        group?: string
    ) {
        this._mission = mission;
        this._identifier = v4();
        this._payload = payload;
        this._priority_level = priority_level;
        group && (this._group = group);
        this._created_at = Date.now();
        this.finished_state = MissionFinishedStateEnum.Unfinished;
    }

    /**
     * Getter mission
     * @return {string}
     */
    public get mission(): string {
        return this._mission;
    }

    /**
     * Getter identifier
     * @return {string}
     */
    public get identifier(): string {
        return this._identifier;
    }

    /**
     * Getter payload
     * @return {MsgPayload}
     */
    public get payload(): MsgPayload {
        return this._payload;
    }

    /**
     * Getter priority_level
     * @return {number}
     */
    public get priority_level(): number {
        return this._priority_level;
    }

    /**
     * Getter group
     * @return {string}
     */
    /**
     * public get group(): string {
     *    return this._group;
     * }
     */

    /**
     * Getter created_at
     * @return {number}
     */
    public get created_at(): number {
        return this._created_at;
    }

    isFinished(): boolean {
        return this.finished_state === MissionFinishedStateEnum.Finished;
    }

    finished() {
        this.finished_state = MissionFinishedStateEnum.Finished;
    }

    toString() { 
        return `Message: { 
            mission: ${this.mission},
            identifier: ${this.identifier},
            created_at: ${this.created_at},
            payload: ${JSON.stringify(this.payload)} 
        }`;
    }
}