import React, { useContext } from 'react';
import { compile } from 'path-to-regexp';
import { useRouteMatch } from 'react-router-dom';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { UserContext } from '#contexts/UserContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../../Toggle/useToggle';

export const getVariantHref = ({ path, params, variant }) =>
  compile(path)(
    {
      ...params,
      variant: `/${variant}`,
      amp: undefined, // we don't want to link to AMP pages directly
    },
    {
      encode: value => value,
    },
  );

const ScriptLinkContainer = () => {
  const { setPreferredVariantCookie } = useContext(UserContext);
  const { service, script, scriptLink } = useContext(ServiceContext);
  const { enabled: scriptLinkEnabled } = useToggle('scriptLink');
  const { enabled: variantCookieEnabled } = useToggle('variantCookie');

  const { text, offscreenText, variant } = scriptLink;
  const { path, params } = useRouteMatch();

  if (!scriptLinkEnabled) {
    return null;
  }

  return (
    <ScriptLink
      script={script}
      service={service}
      href={getVariantHref({
        path,
        params,
        service,
        variant,
      })}
      variant={variant}
      onClick={() => {
        return (
          variantCookieEnabled && setPreferredVariantCookie(service, variant)
        );
      }}
    >
      <span aria-hidden="true">{text}</span>
      <VisuallyHiddenText>{` ${offscreenText}`}</VisuallyHiddenText>
    </ScriptLink>
  );
};

export default ScriptLinkContainer;
