export type ApplicationConfigurationType = {
  PORT: number
  API_LAYER_URL: string
}

export const ApplicationConfiguration: ApplicationConfigurationType = {
  PORT: Number(process.env.PORT || 3001),
  API_LAYER_URL: process.env.API_LAYER_URL || 'http://localhost:3000',
}
