import { createBrowserHistory } from 'history'
import { Store, Unsubscribe } from 'redux'
import { PUSH } from './Actions'

export class RouterService {
  private history = createBrowserHistory()
  private unsubscribeHandler!: Unsubscribe
  private lastUrl: string

  public subscribe(store: Store) {
    this.unsubscribeHandler = store.subscribe(() => this.subscriptionListener(store))
    this.history.listen((location, action) => {
      if (action === 'PUSH') {
        this.lastUrl = location.pathname
        store.dispatch(PUSH(location.pathname))
      }
    })
  }

  private subscriptionListener(store: Store) {
    const {
      router: { pushUrl },
    } = store.getState()
    const isNewPush = this.lastUrl !== pushUrl
    if (isNewPush && this.history.location.pathname !== pushUrl) {
      this.lastUrl = pushUrl
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
