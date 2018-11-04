import { UserAPI } from './UserAPI'
import { LoginAPI } from './LoginAPI'

export class Gateway {
    constructor(
        private userAPI: UserAPI,
        private loginAPI: LoginAPI,
    ) {}

    public getUserAPI() {
        return this.userAPI
    }

    public getLoginAPI() {
        return this.loginAPI
    }
}
