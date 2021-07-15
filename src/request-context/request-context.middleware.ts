import { IncomingMessage, ServerResponse } from 'http';
import { Injectable, NestMiddleware } from '@nestjs/common';
import RequestContext from './request-context';

@Injectable()
export default class RequestContextMiddleware implements NestMiddleware<IncomingMessage, ServerResponse> {
  use(req: IncomingMessage, res: ServerResponse, next: () => void): any {
    RequestContext.runWithRequestContext(req, res, () => next());
  }
}
