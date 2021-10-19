
class EventBus {
    static on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail))
    }

    static trigger(event, data) {
        document.dispatchEvent(new CustomEvent(event, {detail: data}))
    }
}

export default EventBus