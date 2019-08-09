import React from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from 'styled-components';
import Amp from './Amp';
import Canonical from './Canonical';
import Metadata from './Metadata';
import embedUrl from './helpers/embedUrl';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import useToggle from '../Toggle/useToggle';
import { RequestContext } from '../../contexts/RequestContext';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';

const StyledContainer = styled.div`
  padding-top: ${({ orientation }) =>
    orientation === 'Portrait' ? '177.78%' : '56.25%'};
  position: relative;
  overflow: hidden;
`;

const MediaPlayerContainer = ({ blocks }) => {
  const { env, id, platform } = React.useContext(RequestContext);
  const { enabled } = useToggle('mediaPlayer');
  const isAmp = platform === 'amp';

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const imageUrl = pathOr(
    null,
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    aresMediaBlock,
  );
  const versionId = pathOr(
    null,
    ['model', 'blocks', 0, 'model', 'versions', 0, 'versionId'],
    aresMediaBlock,
  );

  const placeholderImage = src => {
    const parts = src.split('/');
    const [domain, media, imgService, width, ...extraParts] = parts;
    const definedWidth = width.replace('$width', '512');
    const protocol = 'https://';
    const domainWithProtocol = `${protocol}${domain}`;

    const newUrl = [
      domainWithProtocol,
      media,
      imgService,
      definedWidth,
      ...extraParts,
    ];

    return newUrl.join('/');
  };

  if (!versionId) {
    return null; // this should be the holding image with an error overlay
  }

  const embedSource = embedUrl(env, id, versionId, isAmp);
  const placeholderSrc = placeholderImage(imageUrl);
  const Player = isAmp ? Amp : Canonical;

  return (
    <GridItemConstrainedMedium>
      <Metadata aresMediaBlock={aresMediaBlock} />
      <StyledContainer>
        <Player placeholderSrc={placeholderSrc} embedSrc={embedSource} />
      </StyledContainer>
    </GridItemConstrainedMedium>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = emptyBlockArrayDefaultProps;

export default MediaPlayerContainer;
