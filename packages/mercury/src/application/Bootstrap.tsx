import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom'
import { Navigation, Button, theme } from 'celestial/comet'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Router } from 'react-router-dom'
import { Application } from './Application'
import { Provider } from 'react-redux'
import { initStore } from './Store'
import { JssProvider } from 'react-jss'
import { create } from 'jss'
import { jssPreset } from '@material-ui/core/styles'
import { I18NService } from '../services/i18n/I18NService'
import { I18nextProvider } from 'react-i18next'
import Tests from '../components/tests'
import { RouterService } from '../services/router/RouterService'
import { AuthorizationService } from '../services/auth/AuthorizationService'
import { LocalStoragePersistanceService, PersistanceService } from '../services/persist/LocalStorage'
import { Gateway, createGateway } from '../services/gateway';

const jss = create(jssPreset())
// Create services
const persistanceService: PersistanceService = new LocalStoragePersistanceService()
const i18nService: I18NService = new I18NService()
const routerService: RouterService = new RouterService()
const authorizationService: AuthorizationService = new AuthorizationService(persistanceService)

const gateway: Gateway = createGateway(authorizationService)
const store = initStore(gateway, authorizationService)

// subscribe
i18nService.load()
i18nService.subscribe(store)
routerService.subscribe(store)
authorizationService.subscribe(store)

ReactDOM.render(
  <JssProvider jss={jss}>
    <MuiThemeProvider theme={theme}>
      <I18nextProvider i18n={i18nService.instance}>
        <Provider store={store}>
          <Router history={routerService.getHistory()}>
            <React.Fragment>
              <Navigation />
              <Tests />
              <Button color="primary">Button</Button>
              <Application />
            </React.Fragment>
          </Router>
        </Provider>
      </I18nextProvider>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('main-container')
)
