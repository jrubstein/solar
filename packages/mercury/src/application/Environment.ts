export enum EnvironmentVariable {
  API_LAYER_URL = 'apiUrl',
  PORT = 'port',
}

type EnvironmentVariableType = { [key in EnvironmentVariable]: string | undefined }

export class Environment {
  private vairables: EnvironmentVariableType

  public load(): void {
    this.vairables = document.getElementsByTagName('body')[0].dataset as EnvironmentVariableType
  }

  public get(key: EnvironmentVariable): string | undefined {
    return this.vairables[key]
  }
}
