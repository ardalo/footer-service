import { IncomingMessage, ServerResponse } from 'http';
import RequestContext from './request-context';

describe('RequestContext', () => {
  it('should provide access to request and response', () => {
    const request = new IncomingMessage(null);
    const response = new ServerResponse(request);

    RequestContext.runWithRequestContext(request, response, () => {
      expect(RequestContext.current().getRequest()).toBe(request);
      expect(RequestContext.current().getResponse()).toBe(response);
    });
  });

  describe('runWithRequestContext()', () => {
    it('should return result of provided callable', () => {
      expect(RequestContext.runWithRequestContext(null, null, () => { return 'test result'; }))
        .toBe('test result');
    });
  });

  describe('current()', () => {
    it('should return current request context when called within active session', () => {
      RequestContext.runWithRequestContext(null, null, () => {
        expect(RequestContext.current()).not.toBeNull();
      });
    });

    it('should return null when called outside an active session', () => {
      expect(RequestContext.current()).toBeNull();
    });
  });

  describe('getAttribute()', () => {
    it('should return previously set attribute', () => {
      RequestContext.runWithRequestContext(null, null, () => {
        RequestContext.current().setAttribute('foo', 'bar');
        expect(RequestContext.current().getAttribute('foo')).toBe('bar');
      });
    });

    it('should return undefined on non-existing attribute', () => {
      RequestContext.runWithRequestContext(null, null, () => {
        expect(RequestContext.current().getAttribute('foo')).toBeUndefined();
      });
    });
  });
});
