export type ApplicationConfigurationType = {
  PORT: number
  JWT_SECRET: string
  LOG_LEVEL: string
}

export const applicationConfiguration: ApplicationConfigurationType = {
  PORT: Number(process.env.PORT || 3000),
  JWT_SECRET: process.env.PORT || 'secret',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
}
