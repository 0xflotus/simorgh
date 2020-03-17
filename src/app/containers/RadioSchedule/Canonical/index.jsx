import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import styled from 'styled-components';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';
import RadioSchedule from '@bbc/psammead-radio-schedule';
import SectionLabel from '@bbc/psammead-section-label';
import { Link } from '@bbc/psammead-story-promo';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import { ServiceContext } from '#contexts/ServiceContext';
import processRadioSchedule from '../utilities/processRadioSchedule';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const RadioScheduleSection = styled.section.attrs(() => ({
  role: 'region',
  'aria-labelledby': 'Radio-Schedule',
}))`
  background-color: ${C_LUNAR};
  padding: 0 ${GEL_MARGIN_BELOW_400PX};

  /* To remove GEL Margins */
  margin: 0 -${GEL_MARGIN_BELOW_400PX};
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_ABOVE_400PX};
    margin: 0 -${GEL_MARGIN_ABOVE_400PX}; /* To remove GEL Margins */
  }
`;

const MarginWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 0;
  margin-top: 0;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
    padding-bottom: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
    margin-bottom: ${GEL_SPACING_TRPL};
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const RadioScheduleSectionLabel = styled(SectionLabel)`
  margin-left: auto;
  margin-right: auto;
  padding-top: 0;
  width: 100%; /* Needed for IE11 */
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding-top: ${GEL_SPACING};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
    padding-top: ${GEL_SPACING_QUAD};
  }
`;

const RadioFrequencyLink = styled(Link)`
  font-size: 14px;
  line-height: 18px;
`;

const CanonicalRadioSchedule = ({ endpoint }) => {
  const [schedule, setRadioSchedule] = useState();
  const { service, script, dir, timezone, locale, radioSchedule } = useContext(
    ServiceContext,
  );
  const header = pathOr(null, ['header'], radioSchedule);
  const frequenciesPageUrl = pathOr(
    null,
    ['frequenciesPageUrl'],
    radioSchedule,
  );
  const frequenciesPageLabel = pathOr(
    null,
    ['frequenciesPageLabel'],
    radioSchedule,
  );

  useEffect(() => {
    const handleResponse = async response => {
      const radioScheduleData = await response.json();

      const schedules = processRadioSchedule(radioScheduleData, service);
      setRadioSchedule(schedules);
    };

    const fetchRadioScheduleData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));

    fetchRadioScheduleData(endpoint);
  }, [endpoint, service, script, timezone, locale]);

  if (!schedule) {
    return null;
  }

  return (
    <RadioScheduleSection>
      <RadioScheduleSectionLabel
        script={script}
        labelId="Radio-Schedule"
        service={service}
        dir={dir}
        bar={false}
        backgroundColor={C_LUNAR}
      >
        {header}
      </RadioScheduleSectionLabel>
      <MarginWrapper>
        <RadioSchedule
          schedules={schedule}
          locale={locale}
          timezone={timezone}
          script={script}
          service={service}
          dir={dir}
        />
        {frequenciesPageUrl && (
          <RadioFrequencyLink href={frequenciesPageUrl}>
            {frequenciesPageLabel}
          </RadioFrequencyLink>
        )}
      </MarginWrapper>
    </RadioScheduleSection>
  );
};

CanonicalRadioSchedule.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalRadioSchedule;
