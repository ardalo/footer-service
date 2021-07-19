import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RequestContext from '../request-context/request-context';

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
    this.logLevel = configService.get<string>('LOGGER_LEVEL')?.toUpperCase() || 'INFO';
    this.debugEnabled = this.logLevel === 'DEBUG';
    this.infoEnabled = this.debugEnabled || this.logLevel === 'INFO';
    this.warnEnabled = this.infoEnabled || this.logLevel === 'WARN';
    this.errorEnabled = this.warnEnabled || this.logLevel === 'ERROR';
  }

  setLogStream(logStream: NodeJS.WritableStream): void {
    this.logStream = logStream;
  }

  error(message: any, ...optionalParams: any[]): any {
    if (this.errorEnabled) {
      const context = this.getContext(optionalParams);
      this.writeLogEntry('ERROR', message, context);
    }
  }

  warn(message: any, ...optionalParams: any[]): any {
    if (this.warnEnabled) {
      const context = this.getContext(optionalParams);
      this.writeLogEntry('WARN', message, context);
    }
  }

  log(message: any, ...optionalParams: any[]): any {
    if (this.infoEnabled) {
      const context = this.getContext(optionalParams);
      this.writeLogEntry('INFO', message, context);
    }
  }

  debug(message: any, ...optionalParams: any[]): any {
    if (this.debugEnabled) {
      const context = this.getContext(optionalParams);
      this.writeLogEntry('DEBUG', message, context);
    }
  }

  setLogLevels(levels: LogLevel[]): any {
    throw Error('Not implemented');
  }

  verbose(message: any, ...optionalParams: any[]): any {
    throw Error('Not implemented');
  }

  private writeLogEntry(level: string, message: string, context?: string): void {
    this.logStream.write(JSON.stringify({
      'timestamp': Date.now(),
      'type': 'application',
      'level': level,
      'message': message,
      'requestId': RequestContext.current()?.getRequest()?.id,
      'context': context || undefined
    }) + this.LINE_BREAK);
  }

  private getContext(args: any[]): string {
    if (args && args.length) {
      const lastElement = args[args.length - 1];
      const isContext = typeof lastElement === 'string';
      return isContext ? lastElement : undefined;
    }

    return undefined;
  }
}
