import als from 'asynchronous-local-storage';
import { FastifyReply, FastifyRequest } from 'fastify';

export default class RequestContext {
  private constructor(
    private readonly request: FastifyRequest,
    private readonly response: FastifyReply) {}

  public static runWithRequestContext(request: FastifyRequest, response: FastifyReply, callable: () => void): any {
    return als.runWith(() => {
      als.set(RequestContext.name, new RequestContext(request, response));
      callable();
    });
  }

  public static current(): RequestContext {
    return als.get(RequestContext.name);
  }

  public getRequest(): FastifyRequest {
    return this.request;
  }

  public getResponse(): FastifyReply {
    return this.response;
  }

  public getAttribute(attributeName: string): any {
    return als.get(attributeName);
  }

  public setAttribute(attributeName: string, attributeValue: any): void {
    als.set(attributeName, attributeValue);
  }
}
