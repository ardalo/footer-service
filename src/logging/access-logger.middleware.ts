import { Injectable, NestMiddleware } from '@nestjs/common';
import RequestContext from '../request-context/request-context';
import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export default class AccessLoggerMiddleware implements NestMiddleware<IncomingMessage, ServerResponse> {
  private readonly LINE_BREAK = '\n';
  private logStream: NodeJS.WritableStream = process.stdout;

  setLogStream(logStream: NodeJS.WritableStream): void {
    this.logStream = logStream;
  }

  use(req: IncomingMessage, res: ServerResponse, next: () => void): any {
    res.on('finish', () => {
      this.logStream.write(JSON.stringify({
        'timestamp': Date.now(),
        'type': 'access',
        'req': {
          'id': RequestContext.current()?.getRequest().id,
          'method': req.method,
          'url': req.url,
          'remoteAddress': req.socket?.remoteAddress
        },
        'res': {
          'status': res.statusCode
        }
      }) + this.LINE_BREAK);
    });
    next();
  }
}
