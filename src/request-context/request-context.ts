import { IncomingMessage, ServerResponse } from 'http';
const { als } = require('asynchronous-local-storage');

export default class RequestContext {
  private constructor(
    private readonly request: IncomingMessage,
    private readonly response: ServerResponse) {}

  public static runWithRequestContext(request: IncomingMessage, response: ServerResponse, callable: () => void): any {
    return als.runWith(() => {
      als.set(RequestContext.name, new RequestContext(request, response));
      callable();
    });
  }

  public static current(): RequestContext {
    return als.get(RequestContext.name);
  }

  public getRequest(): IncomingMessage {
    return this.request;
  }

  public getResponse(): ServerResponse {
    return this.response;
  }

  public getAttribute(attributeName: string): any {
    return als.get(attributeName);
  }

  public setAttribute(attributeName: string, attributeValue: any): void {
    als.set(attributeName, attributeValue);
  }
}
