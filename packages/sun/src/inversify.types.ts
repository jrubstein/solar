export type Type = { [key: string]: symbol }

const core: Type = {
  Application: Symbol('Application'),
  ApplicationConfiguration: Symbol('ApplicationConfiguration'),
  PublicResources: Symbol('PublicResources'),
  ProtectedResources: Symbol('ProtectedResources'),
  LoggerFactory: Symbol('LoggerFactory'),
}

export const TYPES: Type = {
  ...core,
}
