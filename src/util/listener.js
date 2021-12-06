const listeners = []

export const addListener = (type, listener) => listeners.push({ type, listener })

export const listenWare = storeApi => next => action => {
    listeners.forEach(async ({ type: listener_type, listener }) => {
        if (action.type === listener_type) {
            listener(storeApi, action)
        }
    })
    return next(action)
}
