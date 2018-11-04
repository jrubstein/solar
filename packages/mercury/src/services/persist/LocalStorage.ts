import { State } from "../../application/Store";

export interface PersistanceService {
  getItem(item: string): any
  setItem(item: string, value: any): void
  removeItem(item: string): void
  persistState(state: State): void
  getSavedState(): Partial<State>
}

export class LocalStoragePersistanceService implements PersistanceService {
  private STATE_KEY: string = 'state'

  public getItem(item: string): any {
    const value = window.localStorage.getItem(item)
    if (!value) {
      return null
    }
    return JSON.parse(value)
  }

  public setItem(item: string, value: any): void {
    window.localStorage.setItem(item, JSON.stringify(value))
  }

  public removeItem(item: string): void {
    window.localStorage.removeItem(item)
  }

  public persistState({auth, router}: State): void {
    window.localStorage.setItem(this.STATE_KEY, JSON.stringify({
      auth,
      router
    }))
  }

  public getSavedState() {
    return this.getItem(this.STATE_KEY)
  }
}
