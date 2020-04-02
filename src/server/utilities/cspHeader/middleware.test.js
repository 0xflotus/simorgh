import injectCspHeader from './middleware';

const next = jest.fn();

const testMiddleware = ({ origin, path, cspString }) => {
  const req = {
    url: origin + path,
    headers: {
      'user-agent': 'local-agent',
      'bbc-origin': origin,
    },
  };

  const headers = {};

  const res = {
    setHeader: (key, value) => {
      headers[key] = value;
    },
  };

  injectCspHeader(req, res, next);

  expect(next).toHaveBeenCalled();

  expect(headers['Content-Security-Policy']).toEqual(cspString);
};

describe('CSP Header Middleware', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to inject the csp header for live in the uk on canonical', () => {
    testMiddleware({
      origin: 'https://www.bbc.co.uk',
      path: '/igbo',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://via.placeholder.com data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://adservice.google.com https://securepubads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://a1.api.bbc.co.uk/hit.xiti https://toggles.api.bbci.co.uk 'self' https://cookie-oven.api.bbc.co.uk; frame-src 'self' https://polling.bbc.co.uk https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src 'self'; child-src 'self'",
    });
  });

  it('should be able to inject the csp header for live in the uk on amp', () => {
    testMiddleware({
      origin: 'https://www.bbc.co.uk',
      path: '/igbo.amp',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://via.placeholder.com data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://adservice.google.com https://securepubads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://a1.api.bbc.co.uk/hit.xiti https://toggles.api.bbci.co.uk https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src 'self' https://polling.bbc.co.uk https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com; worker-src blob:; child-src blob:",
    });
  });

  it('should be able to inject the csp header for live outside the uk on canonical', () => {
    testMiddleware({
      origin: 'https://www.bbc.com',
      path: '/igbo',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://via.placeholder.com data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://adservice.google.com https://securepubads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://a1.api.bbc.co.uk/hit.xiti https://toggles.api.bbci.co.uk 'self' https://cookie-oven.api.bbc.com; frame-src 'self' https://polling.bbc.co.uk https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src 'self'; child-src 'self'",
    });
  });

  it('should be able to inject the csp header for live outside the uk on amp', () => {
    testMiddleware({
      origin: 'https://www.bbc.com',
      path: '/igbo.amp',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://via.placeholder.com data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://adservice.google.com https://securepubads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://a1.api.bbc.co.uk/hit.xiti https://toggles.api.bbci.co.uk https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src 'self' https://polling.bbc.co.uk https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com; worker-src blob:; child-src blob:",
    });
  });

  it('should be able to inject the csp header for test in the uk on canonical', () => {
    testMiddleware({
      origin: 'https://www.test.bbc.co.uk',
      path: '/igbo',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://via.placeholder.com https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net http://b.files.bbci.co.uk http://ping.chartbeat.net data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline' https://news.test.files.bbci.co.uk http://*.chartbeat.com http://localhost:1124; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://adservice.google.com https://securepubads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://logws1363.ati-host.net https://toggles.test.api.bbci.co.uk 'self' https://cookie-oven.api.bbc.co.uk https://cookie-oven.test.api.bbc.co.uk; frame-src 'self' https://polling.bbc.co.uk https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com https://polling.test.bbc.co.uk; worker-src 'self'; child-src 'self'",
    });
  });

  it('should be able to inject the csp header for test in the uk on amp', () => {
    testMiddleware({
      origin: 'https://www.test.bbc.co.uk',
      path: '/igbo.amp',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://via.placeholder.com https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net http://b.files.bbci.co.uk http://ping.chartbeat.net data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://adservice.google.com https://securepubads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://logws1363.ati-host.net https://toggles.test.api.bbci.co.uk https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src 'self' https://polling.bbc.co.uk https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://polling.test.bbc.co.uk; worker-src blob:; child-src blob:",
    });
  });

  it('should be able to inject the csp header for test outside the uk on canonical', () => {
    testMiddleware({
      origin: 'https://www.test.bbc.com',
      path: '/igbo',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://via.placeholder.com https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net http://b.files.bbci.co.uk http://ping.chartbeat.net data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline' https://news.test.files.bbci.co.uk http://*.chartbeat.com http://localhost:1124; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://adservice.google.com https://securepubads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://logws1363.ati-host.net https://toggles.test.api.bbci.co.uk 'self' https://cookie-oven.api.bbc.com https://cookie-oven.test.api.bbc.com; frame-src 'self' https://polling.bbc.co.uk https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com https://polling.test.bbc.co.uk; worker-src 'self'; child-src 'self'",
    });
  });

  it('should be able to inject the csp header for test outside the uk on amp', () => {
    testMiddleware({
      origin: 'https://www.test.bbc.com',
      path: '/igbo.amp',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://via.placeholder.com https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net http://b.files.bbci.co.uk http://ping.chartbeat.net data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://adservice.google.com https://securepubads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://logws1363.ati-host.net https://toggles.test.api.bbci.co.uk https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src 'self' https://polling.bbc.co.uk https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com https://polling.test.bbc.co.uk; worker-src blob:; child-src blob:",
    });
  });
});
