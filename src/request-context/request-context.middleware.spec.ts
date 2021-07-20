import RequestContext from '../request-context/request-context';
import requestContextMiddleware from './request-context.middleware';

describe('RequestContextMiddleware', () => {
  it('should execute call stack within request context', () => {
    requestContextMiddleware(null, null, () => {
      RequestContext.current().setAttribute('foo', 'bar');
      expect(RequestContext.current().getAttribute('foo')).toBe('bar');
    });
  });
});
