import RequestContext from './request-context';
import { FastifyReply, FastifyRequest } from 'fastify';

export default function requestContextMiddleware(req: FastifyRequest, res: FastifyReply, next: () => void): any {
  RequestContext.runWithRequestContext(req, res, () => next());
}
