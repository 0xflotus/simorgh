import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';
import radioSchedulesShape from './radioSchedulesShape';

import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';

const RadioScheduleContainer = ({
  radioScheduleEndpointOverride,
  initialData,
}) => {
  const { enabled } = useToggle('radioSchedule');
  const { isAmp, env } = useContext(RequestContext);
  const { service, radioSchedule } = useContext(ServiceContext);
  const location = useLocation();
  const hasRadioSchedule = pathOr(null, ['hasRadioSchedule'], radioSchedule);
  const radioScheduleEnabled = !isAmp && enabled && hasRadioSchedule;

  if (!radioScheduleEnabled) {
    return null;
  }

  const endpoint =
    radioScheduleEndpointOverride ||
    getRadioScheduleEndpoint({
      baseUrl: process.env.SIMORGH_BASE_URL,
      service,
      env,
      queryString: location.search,
    });

  return <Canonical endpoint={endpoint} initialData={initialData} />;
};

RadioScheduleContainer.propTypes = {
  radioScheduleEndpointOverride: string,
  initialData: radioSchedulesShape,
};

RadioScheduleContainer.defaultProps = {
  radioScheduleEndpointOverride: null,
  initialData: null,
};

export default RadioScheduleContainer;
