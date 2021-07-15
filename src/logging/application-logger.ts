import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import RequestContext from '../request-context/request-context';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class ApplicationLogger implements LoggerService {
  private readonly LINE_BREAK = '\n';
  private readonly logLevel: string;
  private readonly errorEnabled: boolean;
  private readonly warnEnabled: boolean;
  private readonly infoEnabled: boolean;
  private readonly debugEnabled: boolean;
  private logStream: NodeJS.WritableStream = process.stdout;

  constructor(configService: ConfigService) {
    this.logLevel = configService.get<string>('LOGGER_LEVEL')?.toUpperCase() || 'INFO'
    this.debugEnabled = this.logLevel === 'DEBUG'
    this.infoEnabled = this.debugEnabled || this.logLevel === 'INFO'
    this.warnEnabled = this.infoEnabled || this.logLevel === 'WARN'
    this.errorEnabled = this.warnEnabled || this.logLevel === 'ERROR'
  }

  setLogStream(logStream: NodeJS.WritableStream): void {
    this.logStream = logStream;
  }

  error(message: any, ...optionalParams: any[]): any {
    if (this.errorEnabled) {
      this.writeLogEntry('ERROR', message)
    }
  }

  warn(message: any, ...optionalParams: any[]): any {
    if (this.warnEnabled) {
      this.writeLogEntry('WARN', message)
    }
  }

  log(message: any, ...optionalParams: any[]): any {
    if (this.infoEnabled) {
      this.writeLogEntry('INFO', message)
    }
  }

  debug(message: any, ...optionalParams: any[]): any {
    if (this.debugEnabled) {
      this.writeLogEntry('DEBUG', message)
    }
  }

  setLogLevels(levels: LogLevel[]): any {
    throw Error('Not implemented');
  }

  verbose(message: any, ...optionalParams: any[]): any {
    throw Error('Not implemented');
  }

  private writeLogEntry(level: string, message: string): void {
    this.logStream.write(JSON.stringify({
      'timestamp': Date.now(),
      'type': 'application',
      'level': level,
      'message': message,
      'requestId': RequestContext.current()?.getRequest()?.id
    }) + this.LINE_BREAK);
  }
}
