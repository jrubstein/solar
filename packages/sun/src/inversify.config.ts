import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './inversify.types'
import { Application } from './application/Application'
import { applicationConfiguration } from './application/Configuration'
import { AuthenticationResources } from './components/authentication/AuthenticationResources'
import { I18NResources } from './components/i18n/I18NResources'
import { LoggerFactory } from './Utils/LoggerFactory'

const container: Container = new Container()
container.bind(TYPES.Application).to(Application)
container.bind(TYPES.ApplicationConfiguration).toConstantValue(applicationConfiguration)
container.bind(TYPES.LoggerFactory).to(LoggerFactory)

/** RESOURCES */
container.bind(TYPES.PublicResources).to(AuthenticationResources)
container.bind(TYPES.PublicResources).to(I18NResources)
export { container }