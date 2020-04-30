import loggerMock from '#testHelpers/loggerMock';
import { MEDIA_PLAYER_RESPONSE } from '#lib/logger.const';
import logEmbedSourceStatus from '.';

const fetchResponse = { status: 200 };
const url = '/embed/source';
const assetType = 'cps';

describe('logEmbedSourceStatus', () => {
  beforeEach(() => {
    fetch.mockImplementation(() => fetchResponse);
  });

  const testLogging = async (status, logFn) => {
    fetchResponse.status = status;
    await logEmbedSourceStatus({ url, assetType });
    expect(logFn).toHaveBeenLastCalledWith(MEDIA_PLAYER_RESPONSE, {
      url,
      status,
      assetType,
    });
  };

  it('should log info level on 200', async () => {
    await testLogging(200, loggerMock.info);
  });

  it('should log warn level when not 2xx', async () => {
    await testLogging(100, loggerMock.warn);
    await testLogging(199, loggerMock.warn);
    await testLogging(300, loggerMock.warn);
    await testLogging(400, loggerMock.warn);
    await testLogging(404, loggerMock.warn);
    await testLogging(499, loggerMock.warn);
    await testLogging(500, loggerMock.warn);
  });
});
