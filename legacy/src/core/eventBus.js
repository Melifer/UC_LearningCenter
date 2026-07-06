// ==========================================================================
// EVENT BUS — Simple pub/sub for decoupled module communication
// ==========================================================================
const listeners = {};

export const eventBus = {
    on(event, callback) {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(callback);
        return () => this.off(event, callback);
    },
    off(event, callback) {
        if (listeners[event]) {
            listeners[event] = listeners[event].filter(cb => cb !== callback);
        }
    },
    emit(event, data) {
        if (listeners[event]) {
            listeners[event].forEach(cb => cb(data));
        }
    }
};
