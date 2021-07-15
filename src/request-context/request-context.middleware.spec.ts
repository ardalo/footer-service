import RequestContext from '../request-context/request-context';
import RequestContextMiddleware from './request-context.middleware';

describe('RequestContextMiddleware', () => {
  it('should execute call stack within request context', () => {
    new RequestContextMiddleware().use(null, null, () => {
      RequestContext.current().setAttribute('foo', 'bar');
      expect(RequestContext.current().getAttribute('foo')).toBe('bar');
    });
  });
});
