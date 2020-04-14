import pipe from 'ramda/src/pipe';
import pathOr from 'ramda/src/pathOr';
import fetchPageData from '../../utils/fetchPageData';
import filterUnknownContentTypes from './filterUnknownContentTypes';
import filterEmptyGroupItems from './filterEmptyGroupItems';
import squashTopStories from './squashTopStories';
import addIdsToItems from './addIdsToItems';
import filterGroupsWithoutStraplines from './filterGroupsWithoutStraplines';
import withRadioSchedule from '../../utils/withRadioSchedule';
import getConfig from '#lib/config/services/getConfig';

const transformJson = pipe(
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  squashTopStories,
  filterGroupsWithoutStraplines,
);

export default async ({ path, service, variant }) => {
  const config = await getConfig(service, variant);

  const hasRadioSchedule = pathOr(
    false,
    ['radioSchedule', 'hasRadioSchedule'],
    config,
  );

  const radioScheduleOnFrontPage = pathOr(
    false,
    ['radioSchedule', 'onFrontPage'],
    config,
  );

  const pageHasRadioSchedule = hasRadioSchedule && radioScheduleOnFrontPage;

  // const { json, ...rest } = await fetchPageData(path);
  const { json, ...rest } = pageHasRadioSchedule
    ? await withRadioSchedule(fetchPageData(path), service, path)
    : await fetchPageData(path);

  return {
    ...rest,
    ...(json && {
      pageData: transformJson(json),
    }),
  };
};
