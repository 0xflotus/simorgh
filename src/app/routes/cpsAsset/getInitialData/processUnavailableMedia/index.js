import pathOr from 'ramda/src/pathOr';
import assocPath from 'ramda/src/assocPath';

const UNAVAILABLE_MEDIA_TEXT = 'unavailableMedia';
const unavailableMediaBlock = {
  type: UNAVAILABLE_MEDIA_TEXT,
  model: {},
  id: UNAVAILABLE_MEDIA_TEXT,
};

const addUnavailableMediaBlock = pageData => {
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const filteredBlocks = blocks.filter(block => block.type !== 'external_vpid');
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
    return addUnavailableMediaBlock(pageData);
  }
  return pageData;
};

export default transformer;
