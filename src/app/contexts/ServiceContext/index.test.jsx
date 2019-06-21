import React, { useContext } from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';
import services from '../../lib/config/services/async';
import * as createLoadableContext from '../utils/createLoadableContext';

// Unmock createLoadableContext which is mocked globally in jest-setup.js
jest.unmock('../utils/createLoadableContext');
jest.mock('../utils/createLoadableContext', () => jest.fn());

describe('ServiceContextProvider', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  it('should create loadable contexts on import', () => {
    expect(createLoadableContext).not.toHaveBeenCalled();

    require('./index'); // eslint-disable-line global-require

    expect(createLoadableContext).toHaveBeenCalledTimes(
      Object.keys(services).length,
    );
  });

  describe('lalal', () => {
    beforeEach(() => {
      jest.unmock('../utils/createLoadableContext');
    });

    Object.keys(services).forEach(service =>
      it(`should have a brand name for ${service}`, async () => {
        // eslint-disable-next-line global-require
        const { ServiceContext, ServiceContextProvider } = require('./index');

        const Component = () => {
          const { brandName } = useContext(ServiceContext);

          return <span>{brandName}</span>;
        };

        const { container } = render(
          <ServiceContextProvider service={service}>
            <Component />
          </ServiceContextProvider>,
        );

        await waitForElement(() => container.querySelector('span'));

        expect(container.innerHTML).toMatchSnapshot();
      }),
    );
  });
});
