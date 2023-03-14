type Callback = () => void;

export class Eventing {
    events: {[key:string]: Callback[]} = {};
    constructor(){}
    /// arrow functions don't provide their own this binding (it retains the this value of the enclosing lexical context).
    /// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName]||[]; /// En caso de que no exista un value para esa key/eventName en events, inicializamos una array.
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName:string): void {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length == 0) return;
        handlers.forEach((callback)=>{
            callback(); /// Llama a cada fx callback que hayamos agregado al array de ese evento en particular.
        });
    }
}