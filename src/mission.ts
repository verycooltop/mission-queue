import { DoneCallback, QueueMessagePayload, QueueMissionState, QueueMissionStore, RuntimeContext } from "./constants";
import { QueueMessage } from "./message";
import { QueueMissionUnit } from "./unit";

export abstract class QueueMission<TMsgPayload extends QueueMessagePayload, TStore extends QueueMissionStore<unknown, unknown>> {
    private _name: string;
    private stack: QueueMissionUnit<TStore>[];
    private $store: TStore;

    constructor(name: string, units: QueueMissionUnit<TStore>[]) {
        this._name = name;
        this.stack = units;
    }

    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    private initialize() {
        this.$store = {
            state: undefined,
            content: undefined
        } as TStore;
    }

    protected abstract before($store: TStore, message: TMsgPayload): void;

    protected abstract after($store: TStore): void;

    async dispatch(message: QueueMessage<TMsgPayload>, done: DoneCallback) {
        this.initialize();
        try {
            await this.before(this.$store, message.payload);
        }
        catch (err) {
            return setImmediate(done, err);
        }
        const self = this;
        let idx = 0;
        const runtimeContext: RuntimeContext = {
            currentNode: {
                mission: this._name,
                unit: ""
            }
        };
        async function next(err: unknown) {
            if (err) {
                return setImmediate(done, err);
            }
            const unit = self.stack[idx++];
            if (!(unit instanceof QueueMissionUnit)) {
                await self.after(self.$store);
                return setImmediate(done);
            }
            setImmediate(unit.dispatch.bind(unit), self.$store, runtimeContext, next);
        }
        setImmediate(next);
    }
}