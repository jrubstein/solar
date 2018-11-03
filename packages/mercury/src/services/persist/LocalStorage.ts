export interface PersistanceService {
    getItem(item: string): any
    setItem (item: string, value: any): void
    removeItem (item: string): void
}

export class LocalStoragePersistanceService implements PersistanceService {
    public getItem (item: string): any {
        const value = window.localStorage.getItem(item)
        if (!value) {
            return null
        }
        return JSON.parse(value)
    }
    
    public setItem (item: string, value: any): void {
        window.localStorage.setItem(item, JSON.stringify(value))
    }
    
    public removeItem (item: string): void {
        window.localStorage.removeItem(item)
    }
}
