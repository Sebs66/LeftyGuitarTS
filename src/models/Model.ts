type Callback = () => void;

export interface Events{
    on(eventName:string,callback:Callback):void;
    trigger(eventName:string):void;
}

export class Model{
    constructor(
        private events: Events
    ){}

    get on(){
        return this.events.on;
    }

    get trigger(){
        return this.events.trigger;
    }
}