import { createBrowserHistory } from 'history'
import { Store, Unsubscribe } from 'redux'

export class RouterService {
    private history = createBrowserHistory()
    private unsubscribeHandler!: Unsubscribe
    private lastPushUrl: string
    public subscribe(store: Store) {
        this.unsubscribeHandler = store.subscribe(() => this.subscriptionListener(store))
    }

    private subscriptionListener(store: Store) {
        const { router: {pushUrl} } = store.getState()
        const isNewPush = this.lastPushUrl !== pushUrl
        if (isNewPush && this.history.location.pathname !== pushUrl) {
            this.lastPushUrl = pushUrl
            this.history.push(pushUrl)
        }
    }

    public unsubscribe() {
        if (!this.unsubscribe) {
            return
        }
        this.unsubscribeHandler()
    }

    public getHistory() {
        return this.history
    }
}
