/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '#hooks/useToggle';

/* The Include html which we are getting would be encoded
   so that html characters are escaped when serializing the page data.
   This function ensures that it gets decoded back to an html string.
 */
const decodeHTML = (str) => {
  const replacedParts = {
    '&quot;': '"',
    '&#39;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
  };
  const replacementsRegex = new RegExp(
    Object.keys(replacedParts).join('|'),
    'gi',
  );
  return str.replace(replacementsRegex, (match) => replacedParts[match]);
};

const IncludeContainer = ({ html, type, href }) => {
  const { enabled } = useToggle('include');
  // const [data, setData] = useState('');
  const [includeHtml, setIncludeHtml] = useState('');
  const [scriptTags, setScriptsTags] = useState([]);

  const supportedTypes = {
    idt2: 'idt2',
    vj: 'vj',
  };

  const createAppendScriptTag = (code, src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      if (src) {
        script.src = src;
      } else if (code) {
        script.appendChild(document.createTextNode(code));
      }
      // eslint-disable-next-line func-names
      script.onload = function () {
        resolve();
      };
      // eslint-disable-next-line func-names
      script.onerror = function () {
        reject();
      };
      document.body.append(script);
    });
  };

  useEffect(() => {
    const fetchInclude = async () => {
      const response = await fetch(href);
      const htmlString = await response.text();
      setIncludeHtml(htmlString);
    };
    fetchInclude();
  }, [href]);

  useEffect(() => {
    const scriptTagRegExp = new RegExp(/<script\b[^>]*>([\s\S]*?)<\/script>/gm);
    const scriptTagMatches = includeHtml.matchAll(scriptTagRegExp);

    setScriptsTags(Array.from(scriptTagMatches));
    setIncludeHtml(includeHtml.replace(scriptTagRegExp, ''));
  }, [includeHtml]);

  // Keep the DOM up to date with our script tags.
  useEffect(() => {
    async function placeScriptsOneAfterTheOther() {
      // eslint-disable-next-line no-restricted-syntax
      for (const scriptTag of scriptTags) {
        const [textContent, contents] = scriptTag;
        const srcRegex = new RegExp(/src="(.*?)"/gm);
        // console.log(Array.from(textContent.matchAll(srcRegex)));
        const [srcContent] = Array.from(textContent.matchAll(srcRegex));
        if (srcContent) {
          const [src] = srcContent.slice(-1);

          // eslint-disable-next-line no-await-in-loop
          await createAppendScriptTag('', src);
        } else {
          // eslint-disable-next-line no-await-in-loop
          await createAppendScriptTag(contents);
        }
      }
    }
    placeScriptsOneAfterTheOther();
  }, [scriptTags]);

  const shouldNotRenderInclude = !enabled || !html || !supportedTypes[type];

  if (shouldNotRenderInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: decodeHTML(includeHtml) }}
      />
    </GridItemConstrainedMedium>
  );
};

IncludeContainer.propTypes = {
  href: string,
  html: string,
  type: string.isRequired,
};

IncludeContainer.defaultProps = {
  href: null,
  html: null,
};

export default IncludeContainer;
