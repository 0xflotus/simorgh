/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const allServices = require('../cypress/support/config/settings');
const simorghLaunchDates = require('./simorghLaunchDates');

const getUrl = (pageType, env) => {
  let url;

  if (
    pageType &&
    pageType.environments &&
    pageType.environments[env] &&
    pageType.environments[env].paths
  ) {
    url = pageType.environments[env].paths;
  }

  return url;
};

const generateLinks = (service, env, domain) => {
  const output = [];

  const {
    frontPage,
    liveRadio,
    articles,
    mediaAssetPage,
    photoGalleryPage,
    storyPage,
    mostReadPage,
  } = allServices()[service].pageTypes;

  const frontPageURL = getUrl(frontPage, env);
  if (frontPageURL) {
    frontPageURL
      .map(url => `${domain}${url}`)
      .forEach(url => {
        console.log('frontPage', env, url);
        output.push(`${url}`);
      });
  }

  const articleURL = getUrl(articles, env);
  if (articleURL) {
    articleURL
      .map(url => `${domain}${url}`)
      .forEach(url => {
        console.log("articles", env, url);
        output.push(`${url}`);
      });
  }

  const liveRadioURL = getUrl(liveRadio, env);
  if (liveRadioURL) {
    liveRadioURL
      .map(url => `${domain}${url}`)
      .forEach(url => {
        // console.log(liveradio, env, url);
        output.push(`${url}`);
      });
  }

  const mapURL = getUrl(mediaAssetPage, env);
  if (mapURL) {
    mapURL
      .map(url => `${domain}${url}`)
      .forEach(url => {
        console.log("mediaAssetPage", env, url);
        output.push(`${url}`);
      });
  }

  const pglURL = getUrl(photoGalleryPage, env);
  if (pglURL) {
    pglURL
      .map(url => `${domain}${url}`)
      .forEach(url => {
        console.log('photoGalleryPage', env, url);
        output.push(`${url}`);
      });
  }

  const styURL = getUrl(storyPage, env);
  if (styURL) {
    styURL
      .map(url => `${domain}${url}`)
      .forEach(url => {
        console.log('storyPage', domain, url);
        output.push(`${url}`);
      });
  }

  const mostReadURL = getUrl(mostReadPage, env);
  if (mostReadURL) {
    mostReadURL
      .map(url => `${domain}${url}`)
      .forEach(url => {
        console.log('mostReadPage', env, url);
        output.push(`${url}`);
      });
  }

  return output.join('<br/>');
};

const generateLaunchDates = service => {
  const output = [];
  const serviceLaunch = simorghLaunchDates[service];

  if (serviceLaunch.frontPage && serviceLaunch.frontPage !== '') {
    output.push(`__Home__: ${serviceLaunch.frontPage}`);
  }

  if (serviceLaunch.articles && serviceLaunch.articles !== '') {
    output.push(`__Articles__: ${serviceLaunch.articles}`);
  }

  if (serviceLaunch.liveRadio && serviceLaunch.liveRadio !== '') {
    output.push(`__Live Radio__: ${serviceLaunch.liveRadio}`);
  }

  if (serviceLaunch.mediaAssetPage && serviceLaunch.mediaAssetPage !== '') {
    output.push(`__MAP__: ${serviceLaunch.mediaAssetPage}`);
  }

  if (serviceLaunch.photoGalleryPage && serviceLaunch.photoGalleryPage !== '') {
    output.push(`__PGL__: ${serviceLaunch.photoGalleryPage}`);
  }

  if (serviceLaunch.storyPage && serviceLaunch.storyPage !== '') {
    output.push(`__STY__: ${serviceLaunch.storyPage}`);
  }

  if (serviceLaunch.mostReadPage && serviceLaunch.mostReadPage !== '') {
    output.push(`__Most Read__: ${serviceLaunch.mostReadPage}`);
  }

  return output.join('<br/>');
};

const scriptDir = path.resolve(__dirname);
const SimorghPages = `${scriptDir}/../docs/Simorgh-Release-Info.md`;
const stream = fs.createWriteStream(SimorghPages);

stream.once('open', () => {
  stream.write(
    '<!--Please update the service launch date in scripts/simorghLaunchDates.js\n' +
      'This table can then be generated using the following command: `node scripts/simorghPages.js`\n' +
      'Remember to commit and push the changes to both simorghLaunchDates.js and Simorgh-Release-Info.md -->\n',
  );

  stream.write(
    '| Service | Local | Test | Stage | Live | Launch Dates |\n' +
      '|---------|-------|------|-------|------|--------------|\n',
  );

  const services = allServices('');

  Object.keys(services).forEach(service => {
    console.log(`Generating information for ${service}`);
    const items = [
      service,
      generateLinks(service, 'local', 'http://localhost:7080'),
      generateLinks(service, 'test', 'https://www.test.bbc.com'),
      generateLinks(service, 'test', 'https://www.stage.bbc.com'),
      generateLinks(service, 'live', 'https://www.bbc.com'),
      generateLaunchDates(service),
    ];

    stream.write(`| ${items.join(' | ')} |\n`);
  });
  console.log(`Completed writing file ${SimorghPages}`);
});
