import { IncomingMessage, ServerResponse } from 'http';
import * as cls from 'cls-hooked';

export default class RequestContext {
  private static CLS_NAMESPACE = 'app-request-context';

  private constructor(
    private readonly request: IncomingMessage,
    private readonly response: ServerResponse) {}

  public static runWithRequestContext(request: IncomingMessage, response: ServerResponse, callable: () => void): any {
    return this.clsNamespace().runAndReturn(() => {
      this.clsNamespace().set(RequestContext.name, new RequestContext(request, response));
      return callable();
    });
  }

  public static current(): RequestContext {
    const clsNamespace = this.clsNamespace();
    return (clsNamespace && clsNamespace.active) ? clsNamespace.get(RequestContext.name) : null;
  }

  public getRequest(): IncomingMessage {
    return this.request;
  }

  public getResponse(): ServerResponse {
    return this.response;
  }

  public getAttribute(attributeName: string): any {
    return RequestContext.clsNamespace().get(attributeName);
  }

  public setAttribute(attributeName: string, attributeValue: any): void {
    RequestContext.clsNamespace().set(attributeName, attributeValue);
  }

  private static clsNamespace(): any {
    return cls.getNamespace(RequestContext.CLS_NAMESPACE) || cls.createNamespace(RequestContext.CLS_NAMESPACE);
  }
}
