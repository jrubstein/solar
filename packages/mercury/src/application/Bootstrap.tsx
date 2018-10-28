import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom'
import { Navigation, Button, theme } from '@celestial/comet'
import {
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom'
import { Application } from './Application'
import { Provider } from 'react-redux'
import { store } from './Store'
import {JssProvider} from 'react-jss'
import { create } from 'jss';
import { jssPreset } from '@material-ui/core/styles'
import { I18NService } from '../components/i18n/I18NService'
import { I18nextProvider } from 'react-i18next'



const jss = create(jssPreset())
const i18nService: I18NService = new I18NService()
i18nService.load()
i18nService.subscribe(store)

ReactDOM.render(
    <JssProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
            <I18nextProvider i18n={ i18nService.instance }>
                <Provider store={store}>
                    <BrowserRouter>
                        <React.Fragment>
                            <Navigation />
                            <Button color="primary">Button</Button>
                            <Application />
                        </React.Fragment>
                    </BrowserRouter>
                </Provider>
            </I18nextProvider>
        </MuiThemeProvider>
    </JssProvider>,
    document.getElementById('main-container')
)


