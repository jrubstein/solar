import { Store, Unsubscribe } from 'redux'

export class AuthorizationService {
  private unsubscribeHandler!: Unsubscribe
  private currentToken: { authToken: string }

  public subscribe(store: Store) {
    this.currentToken = store.getState().auth || { authToken: null }
    this.unsubscribeHandler = store.subscribe(() => this.subscriptionListener(store))
  }

  private subscriptionListener(store: Store) {
    const {
      auth: { authToken },
    } = store.getState()
    if (authToken !== this.currentToken.authToken) {
      this.currentToken = { authToken }
    }
  }

  public getAuthToken() {
    return this.currentToken.authToken
  }

  public unsubscribe() {
    if (!this.unsubscribe) {
      return
    }
    this.unsubscribeHandler()
  }
}
