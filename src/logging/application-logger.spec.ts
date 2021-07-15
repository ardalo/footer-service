import { ConfigService } from '@nestjs/config';
import ApplicationLogger from './application-logger';
import * as stream from 'stream';

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
    ['ERROR', (logger) => logger.error('.'), /{"timestamp":\d{13},"type":"application","level":"ERROR","message":"."}/],
    ['ERROR', (logger) => logger.warn('.'), /^$/],
    ['ERROR', (logger) => logger.log('.'), /^$/],
    ['ERROR', (logger) => logger.debug('.'), /^$/],

    ['WARN', (logger) => logger.error('.'), /{"timestamp":\d{13},"type":"application","level":"ERROR","message":"."}/],
    ['WARN', (logger) => logger.warn('.'), /{"timestamp":\d{13},"type":"application","level":"WARN","message":"."}/],
    ['WARN', (logger) => logger.log('.'), /^$/],
    ['WARN', (logger) => logger.debug('.'), /^$/],

    ['INFO', (logger) => logger.error('.'), /{"timestamp":\d{13},"type":"application","level":"ERROR","message":"."}/],
    ['INFO', (logger) => logger.warn('.'), /{"timestamp":\d{13},"type":"application","level":"WARN","message":"."}/],
    ['INFO', (logger) => logger.log('.'), /{"timestamp":\d{13},"type":"application","level":"INFO","message":"."}/],
    ['INFO', (logger) => logger.debug('.'), /^$/],

    ['DEBUG', (logger) => logger.error('.'), /{"timestamp":\d{13},"type":"application","level":"ERROR","message":"."}/],
    ['DEBUG', (logger) => logger.warn('.'), /{"timestamp":\d{13},"type":"application","level":"WARN","message":"."}/],
    ['DEBUG', (logger) => logger.log('.'), /{"timestamp":\d{13},"type":"application","level":"INFO","message":"."}/],
    ['DEBUG', (logger) => logger.debug('.'), /{"timestamp":\d{13},"type":"application","level":"DEBUG","message":"."}/],

    ['OFF', (logger) => logger.error('.'), /^$/],
    ['OFF', (logger) => logger.warn('.'), /^$/],
    ['OFF', (logger) => logger.log('.'), /^$/],
    ['OFF', (logger) => logger.debug('.'), /^$/]
  ])('should only write log entry if log level is appropriate', (logLevel, writeLog, expectedLogEntryRegexp) => {
    const logger = new ApplicationLogger(new ConfigService({
      'LOGGER_LEVEL': logLevel
    }));
    logger.setLogStream(logStream)
    writeLog(logger);

    expect(logCapture)
      .toMatch(expectedLogEntryRegexp);
  });

  it('should throw Error on setLogLevels()', () => {
    const logger = new ApplicationLogger(new ConfigService());
    expect(() => logger.setLogLevels(['error'])).toThrowError('Not implemented')
  });

  it('should throw Error on verbose()', () => {
    const logger = new ApplicationLogger(new ConfigService());
    expect(() => logger.verbose('test message')).toThrowError('Not implemented')
  });

  //TODO: test context, stacktrace and requestId
});
