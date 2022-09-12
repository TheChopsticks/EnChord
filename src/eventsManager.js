export class EventsManager {
  #events;

  constructor() {
    this.#events = {};
  }

  subscribe(eventName, subscriber) {
    if (!this.#events[eventName]) {
      this.#events[eventName] = [subscriber];
    } else {
      this.#events[eventName].push(subscriber);
    }
  }

  publish(eventName, data) {
    const subscribers = this.#events[eventName];
    for (const subscriber of subscribers) {
      subscriber(data);
    }
  }
}
