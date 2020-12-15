interface WebSocket {
  on(type: string, listener: EventListener): void;
  off(type: string, listener: EventListener): void;
  once(type: string, listener: EventListener): void;
}
