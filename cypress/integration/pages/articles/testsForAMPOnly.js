import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import appToggles from '../../../support/helpers/useAppToggles';
import { getBlockData, getVideoEmbedUrl } from './helpers';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = () => {};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    if (appToggles.chartbeatAnalytics.enabled) {
      describe('Chartbeat', () => {
        if (envConfig.chartbeatEnabled) {
          it('should have chartbeat config UID', () => {
            cy.hasAmpChartbeatConfigUid();
          });
        }
      });
    }
    // `appToggles` tells us whether a feature is toggled on or off in the current environment.
    if (appToggles.mediaPlayer.enabled) {
      describe('Media Player: AMP', () => {
        it('should render an iframe with a valid URL', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const media = getBlockData('video', body);

            if (media && media.type === 'video') {
              const { lang } = appConfig[service][variant];
              const embedUrl = `${getVideoEmbedUrl(body, lang)}/amp`;
              cy.get(`amp-iframe[src="${embedUrl}"]`).should('be.visible');
              cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
            }
          });
        });
      });
    }
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = () => {};
