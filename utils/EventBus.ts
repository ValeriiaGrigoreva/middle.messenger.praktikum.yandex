export class EventBus {
    listeners: Record<string, Function[]>;

    constructor() {
      this.listeners = {};
    }
  
    on(event: string, callback: Function) {
      if (!this.listeners[event]) {
        this.listeners[event] = []
      }
      
      this.listeners[event].push(callback)
    }
  
    off(event: string, callback: Function) {
      if (!this.listeners[event]) {
        throw new Error(`нет такого события ${event}`)
      }
      
      this.listeners[event] = this.listeners[event].filter((listener: Function) => listener !== callback)
    }
  
    emit(event: string, ...args: any) {
      if (!this.listeners[event]) {
        throw new Error(`нет такого события ${event}`)
      }
      
      this.listeners[event].forEach(
        (listener: Function) => listener(...args)
      )
    }
  }
