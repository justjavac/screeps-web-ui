WebSocket.prototype.on = function (
  event: string,
  callback: EventListener,
): void {
  this.addEventListener(event, callback);
};

WebSocket.prototype.off = function (
  event: string,
  callback: EventListener,
): void {
  this.removeEventListener(event, callback);
};

WebSocket.prototype.once = function (
  event: string,
  callback: EventListener,
): void {
  var self = this;
  this.addEventListener(event, function handler(...args) {
    callback.apply(callback, args);
    self.removeEventListener(event, handler);
  });
};

export {};
