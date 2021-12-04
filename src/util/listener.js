// import { createActionListenerMiddleware } from '@rtk-incubator/action-listener-middleware'

// export const listenerMiddleware = createActionListenerMiddleware()

// console.log('created', {listenerMiddleware})

const listeners = []

export const addListener = (type, listener) => listeners.push({ type, listener })

export const listenWare = storeApi => next => action => {
    listeners.forEach(async ({ type: listener_type, listener }) => {
        if (action.type === listener_type) {
            // console.log("listenware!", { action })
            listener(storeApi, action)
        }
    })
    return next(action)
}