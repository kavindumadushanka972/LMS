
class EventBus {
    /**
     * @brief add a new event listener  
     * Pretreatment
     * @param  String  event
     * @param  Function callback
     * @return undefined
     */
    static on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail))
    }

    /**
     * @brief trigger the given event
     * Pretreatment
     * @param  String  event
     * @param  Any data
     * @return undefined
     */
    static trigger(event, data) {
        document.dispatchEvent(new CustomEvent(event, {detail: data}))
    }
}

export default EventBus