import i18next from 'i18next'
import XHR from 'i18next-xhr-backend'
import { Store, Unsubscribe } from 'redux'

export class I18NService {
  private language: string
  private i18n: i18next.i18n
  private unsubscribeHandler!: Unsubscribe

  constructor() {
    this.language = 'en'
    this.i18n = i18next.createInstance()
  }

  public updateLanguage(language: string) {
    this.language = language
    this.i18n.changeLanguage(this.language)
  }

  public subscribe(store: Store) {
    this.unsubscribeHandler = store.subscribe(() => this.subscriptionListener(store))
  }

  public unsubscribe() {
    if (!this.unsubscribe) {
      return
    }
    this.unsubscribeHandler()
  }

  get instance(): i18next.i18n {
    return this.i18n
  }

  public load() {
    this.i18n.use(XHR).init({
      debug: true,
      lng: this.language,
      fallbackLng: 'en',
      backend: {
        loadPath: 'http://localhost:3000/i18n/{{lng}}',
      },
      react: {
        wait: true,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
      },
    })
  }

  private subscriptionListener(store: Store) {
    const { i18n } = store.getState()
    if (this.language !== i18n.language) {
      this.updateLanguage(i18n.language)
    }
  }
}
