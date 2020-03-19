import pathOr from 'ramda/src/pathOr';
import assocPath from 'ramda/src/assocPath';
import nodeLogger from '#lib/logger.node';
import { NO_MEDIA_BLOCK } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const UNAVAILABLE_MEDIA_TEXT = 'unavailableMedia';
const REVOKED_MEDIA = 'external_vpid';
export const unavailableMediaBlock = {
  type: UNAVAILABLE_MEDIA_TEXT,
  model: {},
  id: UNAVAILABLE_MEDIA_TEXT,
};

export const addUnavailableMediaBlock = pageData => {
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const filteredBlocks = blocks.filter(block => block.type !== REVOKED_MEDIA);
  return assocPath(
    ['content', 'model', 'blocks'],
    [unavailableMediaBlock, ...filteredBlocks],
    pageData,
  );
};

const transformer = pageData => {
  const blockTypes = pathOr([], ['metadata', 'blockTypes'], pageData);
  const mediaTypes = blockTypes.filter(blockType =>
    ['media', 'legacyMedia', 'version'].includes(blockType),
  );
  const showPlaceholder = mediaTypes.length === 0;
  if (showPlaceholder) {
    if (!blockTypes.includes(REVOKED_MEDIA)) {
      logger.warn(
        JSON.stringify(
          {
            event: NO_MEDIA_BLOCK,
            message: 'No media detected in response',
          },
          null,
          2,
        ),
      );
    }
    return addUnavailableMediaBlock(pageData);
  }
  return pageData;
};

export default transformer;
