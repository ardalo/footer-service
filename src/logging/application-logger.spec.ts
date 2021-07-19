import * as stream from 'stream';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import ApplicationLogger from './application-logger';

describe('ApplicationLogger', () => {
  const logStream = new stream.Writable();
  let logCapture: string;

  beforeAll(async () => {
    logStream._write = (chunk, encoding, next) => {
      logCapture += chunk.toString();
      next();
    };
  });

  beforeEach(() => {
    logCapture = '';
  });

  it.each([
    ['ERROR', (logger) => logger.error('msg'), /{"timestamp":\d{13},"type":"application","level":"ERROR","message":"msg"}/],
    ['ERROR', (logger) => logger.warn('msg'), /^$/],
    ['ERROR', (logger) => logger.log('msg'), /^$/],
    ['ERROR', (logger) => logger.debug('msg'), /^$/],

    ['WARN', (logger) => logger.error('msg'), /{"timestamp":\d{13},"type":"application","level":"ERROR","message":"msg"}/],
    ['WARN', (logger) => logger.warn('msg'), /{"timestamp":\d{13},"type":"application","level":"WARN","message":"msg"}/],
    ['WARN', (logger) => logger.log('msg'), /^$/],
    ['WARN', (logger) => logger.debug('msg'), /^$/],

    ['INFO', (logger) => logger.error('msg'), /{"timestamp":\d{13},"type":"application","level":"ERROR","message":"msg"}/],
    ['INFO', (logger) => logger.warn('msg'), /{"timestamp":\d{13},"type":"application","level":"WARN","message":"msg"}/],
    ['INFO', (logger) => logger.log('msg'), /{"timestamp":\d{13},"type":"application","level":"INFO","message":"msg"}/],
    ['INFO', (logger) => logger.debug('msg'), /^$/],

    ['DEBUG', (logger) => logger.error('msg'), /{"timestamp":\d{13},"type":"application","level":"ERROR","message":"msg"}/],
    ['DEBUG', (logger) => logger.warn('msg'), /{"timestamp":\d{13},"type":"application","level":"WARN","message":"msg"}/],
    ['DEBUG', (logger) => logger.log('msg'), /{"timestamp":\d{13},"type":"application","level":"INFO","message":"msg"}/],
    ['DEBUG', (logger) => logger.debug('msg'), /{"timestamp":\d{13},"type":"application","level":"DEBUG","message":"msg"}/],

    ['OFF', (logger) => logger.error('msg'), /^$/],
    ['OFF', (logger) => logger.warn('msg'), /^$/],
    ['OFF', (logger) => logger.log('msg'), /^$/],
    ['OFF', (logger) => logger.debug('msg'), /^$/]
  ])('should only write log entry if log level is appropriate', (logLevel, writeLog, expectedLogEntryRegexp) => {
    const logger = new ApplicationLogger(new ConfigService({
      'LOGGER_LEVEL': logLevel
    }));
    logger.setLogStream(logStream);
    writeLog(logger);

    expect(logCapture)
      .toMatch(expectedLogEntryRegexp);
  });

  it('should throw Error on setLogLevels()', () => {
    const logger = new ApplicationLogger(new ConfigService());
    expect(() => logger.setLogLevels(['error'])).toThrowError('Not implemented');
  });

  it('should throw Error on verbose()', () => {
    const logger = new ApplicationLogger(new ConfigService());
    expect(() => logger.verbose('test message')).toThrowError('Not implemented');
  });

  it('should add context to log entries if available', () => {
    const logger = new ApplicationLogger(new ConfigService());
    logger.setLogStream(logStream);
    Logger.overrideLogger(logger);
    new Logger('Test Context').log('test message');

    expect(logCapture)
      .toMatch(/{"timestamp":\d{13},"type":"application","level":"INFO","message":"test message","context":"Test Context"}/);
  });

  it('should omit context in log entries if not available', () => {
    const logger = new ApplicationLogger(new ConfigService());
    logger.setLogStream(logStream);
    Logger.overrideLogger(logger);
    new Logger().log('test message');

    expect(logCapture)
      .toMatch(/{"timestamp":\d{13},"type":"application","level":"INFO","message":"test message"}/);
  });
});
