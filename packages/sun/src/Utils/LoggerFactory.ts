import winston, {format, Logger} from 'winston'
import { TYPES } from '../inversify.types'
import { ApplicationConfigurationType } from '../application/Configuration'
import { injectable, inject } from 'inversify'

@injectable()
export class LoggerFactory {
    constructor(
        @inject(TYPES.ApplicationConfiguration) private configuration: ApplicationConfigurationType
    ) {}

    public create(name: string): Logger {
        return winston.createLogger(this.getConfiguration(name))
    }

    private getConfiguration(name: string) {
        const { combine, timestamp, label, printf } = format

        const fromatLogLine = printf(info => {
        return `${info.timestamp} [ ${info.label} ] ${info.level.toUpperCase()}: ${info.message}`
        });

        return {
            level: this.configuration.LOG_LEVEL,
            transports: [new winston.transports.Console()],
            format: combine(
                label({ label: name }),
                timestamp(),
                fromatLogLine
            ),
        }
    }
}