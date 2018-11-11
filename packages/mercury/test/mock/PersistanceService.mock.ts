import { PersistanceService } from '../../src/services/persist/LocalStorage'
import { State } from '../../src/application/Store'

export class MockPersistanceService implements PersistanceService {
  private map: Map<string, any> = new Map<string, any>()

  public getItem(item: string): any {
    return this.map.get(item)
  }

  public setItem(item: string, value: any): void {
    this.map.set(item, value)
  }

  public removeItem(item: string): void {
    this.map.delete(item)
  }
  public persistState(state: State): void {
    this.map.set('STATE', JSON.stringify(state))
  }
  public getSavedState(): Partial<State> {
    return JSON.parse(this.map.get('STATE') || '{}')
  }
}
