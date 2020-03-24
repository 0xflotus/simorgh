import pipe from 'ramda/src/pipe';

const { canonical } = global;

// replace things in the HTML that change every render such as random IDs and timeOnServer
const replaceTimeOnServer = html =>
  html.replace(/"timeOnServer":\d+/gm, '"timeOnServer": "mock-time"');

const replaceIds = html => html.replace(/"id":".+?"/gm, '"id":"mock-id"');

const replaceUUIDs = html =>
  html.replace(/"uuid":".+?"/gm, '"uuid":"mock-uuid"');

const replaceDataStyledAttributes = html =>
  html.replace(/data-styled=".+?"/gm, 'data-styled=""');

const replaceStaticScriptSrc = html =>
  html.replace(/static\/js\/main-.+?.js/gm, replacement => {
    return `${replacement.split('.')[0]}.js`;
  });

const getFixedHtml = pipe(
  replaceTimeOnServer,
  replaceIds,
  replaceUUIDs,
  replaceDataStyledAttributes,
  replaceStaticScriptSrc,
);

export default () => {
  [canonical].forEach(page => {
    describe(`For the ${page.platform} platform`, () => {
      it('I can see the server-rendered HTML', () => {
        const html = page.document.querySelector('html').outerHTML;
        const fixedHtml = getFixedHtml(html);

        expect(fixedHtml).toMatchSnapshot();
      });
    });
  });
};
