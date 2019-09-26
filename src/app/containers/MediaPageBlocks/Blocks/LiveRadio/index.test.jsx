import React from 'react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { suppressPropWarnings } from '#testHelpers';
import LiveRadio from '.';

describe('MediaPageBlocks LiveRadio', () => {
  shouldMatchSnapshot(
    'should render correctly for canonical',
    <RequestContext.Provider value={{ platform: 'canonical' }}>
      <ServiceContextProvider service="korean">
        <LiveRadio
          uuid="uuid"
          idAttr="idAttr"
          externalId="externalId"
          id="id"
        />
      </ServiceContextProvider>
    </RequestContext.Provider>,
  );

  // TODO: remove the need for this suppressPropWarnings for placeholderSrc on AMP player
  suppressPropWarnings(['placeholderSrc', 'undefined']);

  shouldMatchSnapshot(
    'should render correctly for amp',
    <RequestContext.Provider value={{ platform: 'amp' }}>
      <ServiceContextProvider service="korean">
        <LiveRadio
          uuid="uuid"
          idAttr="idAttr"
          externalId="externalId"
          id="id"
        />
      </ServiceContextProvider>
    </RequestContext.Provider>,
  );

  describe('when platform is unknown', () => {
    suppressPropWarnings(['text', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar' }}>
        <ServiceContextProvider service="korean">
          <LiveRadio
            uuid="uuid"
            idAttr="idAttr"
            externalId="externalId"
            id="id"
          />
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
  });

  describe('when id isnt provided', () => {
    suppressPropWarnings(['id', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar' }}>
        <ServiceContextProvider service="korean">
          <LiveRadio uuid="uuid" idAttr="idAttr" externalId="externalId" />
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
  });

  describe('when externalId isnt provided', () => {
    suppressPropWarnings(['externalId', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar' }}>
        <ServiceContextProvider service="korean">
          <LiveRadio uuid="uuid" idAttr="idAttr" id="id" />
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
  });

  describe('when externalId is bbc_oromo_radio it is overriden to bbc_afaanoromoo_radio', () => {
    shouldMatchSnapshot(
      'should render correctly for canonical',
      <RequestContext.Provider value={{ platform: 'canonical' }}>
        <ServiceContextProvider service="afaanoromoo">
          <LiveRadio
            uuid="uuid"
            idAttr="idAttr"
            externalId="bbc_oromo_radio"
            id="id"
          />
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );

    // TODO: remove the need for this suppressPropWarnings for placeholderSrc on AMP player
    suppressPropWarnings(['placeholderSrc', 'undefined']);

    shouldMatchSnapshot(
      'should render correctly for amp',
      <RequestContext.Provider value={{ platform: 'amp' }}>
        <ServiceContextProvider service="afaanoromoo">
          <LiveRadio
            uuid="uuid"
            idAttr="idAttr"
            externalId="bbc_oromo_radio"
            id="id"
          />
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
  });
});
