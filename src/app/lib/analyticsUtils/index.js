import Cookie from 'js-cookie';
import pathOr from 'ramda/src/pathOr';
import onClient from '../utilities/onClient';

export const getDestination = statsDestination => {
  const destinationIDs = {
    PS_NEWS: 598285,
    PS_NEWS_LANGUAGES: 598291,
    PS_NEWS_TEST: 598286,
    PS_NEWS_LANGUAGES_TEST: 598292,
    GNL_NEWS: 598287,
    GNL_NEWS_LANGUAGES: 598289,
    GNL_NEWS_TEST: 598288,
    GNL_NEWS_LANGUAGES_TEST: 598290,
    WS_NEWS_LANGUAGES: 598342,
    WS_NEWS_LANGUAGES_TEST: 598343,
  };
  return destinationIDs[statsDestination] || destinationIDs.PS_NEWS;
};

export const getAppType = platform =>
  platform === 'amp' ? 'amp' : 'responsive';

export const isLocServeCookieSet = platform => {
  if (platform === 'amp') {
    return false;
  }

  if (onClient()) {
    return !!Cookie.get('loc_serve');
  }

  return null;
};

export const getProducer = service => {
  const producers = {
    afaanoromoo: '2',
    afrique: '3',
    amharic: '4',
    arabic: '5',
    azeri: '6',
    bengali: '31',
    burmese: '35',
    cymrufyw: '100',
    gahuza: '40',
    gujarati: '50',
    hausa: '51',
    hindi: '52',
    igbo: '53',
    indonesia: '54',
    japanese: '56',
    korean: '57',
    kyrgyz: '58',
    marathi: '59',
    mundo: '62',
    naidheachdan: '79',
    nepali: '63',
    news: '64',
    pashto: '68',
    persian: '69',
    pidgin: '70',
    portuguese: '33',
    punjabi: '73',
    russian: '75',
    serbian: '81',
    sinhala: '82',
    somali: '83',
    sport: '85',
    swahili: '86',
    tamil: '87',
    telugu: '89',
    thai: '90',
    tigrinya: '91',
    turkce: '92',
    ukchina: '93',
    ukrainian: '94',
    urdu: '95',
    uzbek: '96',
    vietnamese: '97',
    yoruba: '107',
    zhongwen: '38',
  };

  return producers[service] || 0;
};

export const getScreenInfo = platform => {
  if (platform === 'amp') {
    return `\${screenWidth}x\${screenHeight}x\${screenColorDepth}`;
  }

  if (onClient()) {
    const { width, height, colorDepth, pixelDepth } = window.screen;
    const orderArray = [
      width || 0,
      height || 0,
      colorDepth || 0,
      pixelDepth || 0,
    ];

    return orderArray.join('x');
  }

  return null;
};

export const getBrowserViewPort = platform => {
  if (platform === 'amp') {
    return `\${availableScreenWidth}x\${availableScreenHeight}`;
  }

  if (onClient()) {
    const { innerWidth, innerHeight } = window;

    return [innerWidth || 0, innerHeight || 0].join('x');
  }

  return null;
};

export const getCurrentTime = platform => {
  if (platform === 'amp') {
    return `\${timestamp}`;
  }

  if (onClient()) {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    return [hours, mins, secs].join('x');
  }

  return null;
};

export const getDeviceLanguage = platform => {
  if (platform === 'amp') {
    // Using browserlanguage since AMP doesn't have access to device language
    return `\${browserLanguage}`;
  }

  if (onClient() && navigator.language) {
    return navigator.language;
  }

  return null;
};

export const getHref = platform => {
  if (platform === 'amp') {
    return `\${sourceUrl}`;
  }

  if (onClient() && window.location.href) {
    const { href } = window.location;
    return href.replace('#', '%23');
  }

  return null;
};

export const getReferrer = (platform, origin, previousPath) => {
  if (platform === 'amp') {
    return `\${documentReferrer}`;
  }

  if (onClient() && (document.referrer || previousPath)) {
    return previousPath ? `${origin}${previousPath}` : document.referrer;
  }

  return null;
};

export const sanitise = initialString =>
  initialString ? initialString.trim().replace(/\s/g, '+') : null;

const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const getISODate = unixTimestamp => {
  const date = new Date(unixTimestamp);
  return date.toISOString();
};

export const getPublishedDatetime = (attribute, data) => {
  const publishedDatetime = pathOr(null, ['metadata', attribute], data);

  return publishedDatetime && isValidDateTime(publishedDatetime)
    ? getISODate(publishedDatetime)
    : null;
};
