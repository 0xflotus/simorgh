import React, { useContext } from 'react';
import { arrayOf, shape, node } from 'prop-types';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';

import topStories from '#pages/StoryPage/topStories.json';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import StoryPromo from '../StoryPromo';
import CpsAsset from '../CpsAsset';

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-bottom: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
`;

const TopStories = ({ content }) => {
  const { dir } = useContext(ServiceContext);

  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': 'top-stories-heading',
  };

  const TopStoriesWrapper = ({ children }) => (
    <Wrapper {...a11yAttributes}>{children}</Wrapper>
  );
  TopStoriesWrapper.propTypes = {
    children: node.isRequired,
  };

  if (!content || !content.length) return null;

  const singleTransform = (promo) => (
    <StoryPromo item={promo} dir={dir} displayImage={false} />
  );

  const listTransform = (items) => (
    <StoryPromoUl>
      {items.map((item) => (
        <StoryPromoLi key={item.id || item.uri}>
          {singleTransform(item)}
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );

  return (
    <CpsAsset
      title="Top Stories"
      a11yAttributes={a11yAttributes}
      content={content}
      enableGridWrapper={false}
      singleTransform={singleTransform}
      listTransform={listTransform}
    />
  );
};

TopStories.propTypes = {
  content: arrayOf(shape(storyItem)),
};

TopStories.defaultProps = {
  content: topStories, // TODO: rm this https://github.com/bbc/simorgh/issues/5765
};

export default TopStories;
