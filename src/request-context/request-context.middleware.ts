import { Injectable, NestMiddleware } from '@nestjs/common';
import RequestContext from './request-context';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export default class RequestContextMiddleware implements NestMiddleware<FastifyRequest, FastifyReply> {
  use(req: FastifyRequest, res: FastifyReply, next: () => void): any {
    RequestContext.runWithRequestContext(req, res, () => next());
  }
}
