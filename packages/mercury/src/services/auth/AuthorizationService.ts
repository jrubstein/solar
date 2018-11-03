import { Store, Unsubscribe } from 'redux'
import { PersistanceService } from '../persist/LocalStorage'

export class AuthorizationService {
    private readonly TOKEN_ITEM_NAME = 'authToken'
    private unsubscribeHandler!: Unsubscribe
    private currentToken: { authToken: string }

    constructor(private persistanceService: PersistanceService) {
        this.currentToken = this.persistanceService.getItem(this.TOKEN_ITEM_NAME) || { authToken : null }
    }

    public subscribe(store: Store) {
        this.unsubscribeHandler = store.subscribe(() => this.subscriptionListener(store))
    }

    private subscriptionListener(store: Store) {
        const { auth: {authToken} } = store.getState()
        if (authToken !== this.currentToken.authToken) {
            this.currentToken = { authToken }
            this.persistanceService.setItem(this.TOKEN_ITEM_NAME, { authToken })
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