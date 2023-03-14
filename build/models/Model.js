export class Model {
    constructor(events) {
        this.events = events;
    }
    get on() {
        return this.events.on;
    }
    get trigger() {
        return this.events.trigger;
    }
}
