import { Injectable, NestMiddleware } from '@nestjs/common';
import RequestContext from '../request-context/request-context';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export default class AccessLoggerMiddleware implements NestMiddleware<FastifyRequest, FastifyReply> {
  private readonly LINE_BREAK = '\n';
  private logStream: NodeJS.WritableStream = process.stdout;

  setLogStream(logStream: NodeJS.WritableStream): void {
    this.logStream = logStream;
  }

  use(req: FastifyRequest, res: FastifyReply, next: () => void): any {
    // @ts-ignore
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
          'status': res.statusCode,
          'contentLength': Number(res.getHeader('content-length'))
        }
      }) + this.LINE_BREAK);
    });
    next();
  }
}
