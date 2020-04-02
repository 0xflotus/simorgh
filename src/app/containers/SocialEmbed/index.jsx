import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '@bbc/psammead-social-embed';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '#hooks/useToggle';
import socialEmbedBlockPropTypes from '#models/propTypes/socialEmbed';
import createTranslations from './translations';

const MAX_WIDTH = '31.25rem';

const htmlUnescape = (htmlString) =>
  htmlString
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&#0?39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');

const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: ${MAX_WIDTH};
`;

const SocialEmbedContainer = ({ blocks }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);
  const { enabled } = useToggle('socialEmbed');

  if (!blocks || !enabled) return null;

  const { type: provider, model } = blocks[0];
  const { id, href } = model;

  const oEmbedHtmlEscaped = path(['embed', 'oembed'], model);
  const oEmbed = oEmbedHtmlEscaped && {
    ...(oEmbedHtmlEscaped && { html: htmlUnescape(oEmbedHtmlEscaped.html) }),
  };

  const {
    fallback: fallbackTranslations,
    skipLink: skipLinkTranslations,
    caption: captionTranslations,
  } = createTranslations(translations);

  const fallback = {
    ...fallbackTranslations,
    linkHref: href,
  };

  const skipLink = {
    ...skipLinkTranslations,
    endTextId: 'skip-%provider%-content',
  };

  const caption = provider === 'youtube' ? captionTranslations : null;

  return (
    <GridItemConstrainedMedium>
      <Wrapper provider={provider}>
        {isAmp ? (
          <AmpSocialEmbed
            provider={provider}
            service={service}
            id={id}
            fallback={fallback}
            skipLink={skipLink}
            caption={caption}
          />
        ) : (
          <CanonicalSocialEmbed
            provider={provider}
            service={service}
            oEmbed={oEmbed}
            fallback={fallback}
            skipLink={skipLink}
            caption={caption}
          />
        )}
      </Wrapper>
    </GridItemConstrainedMedium>
  );
};

SocialEmbedContainer.propTypes = socialEmbedBlockPropTypes;

export default SocialEmbedContainer;
