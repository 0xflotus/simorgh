/**
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import runUserTests from './user';
import {
  runFooterTests,
  runHeaderTests,
  runCommonSeoTests,
  runCommonA11yTests,
} from '../../common';

describe('Given I am on the Korean live radio amp page', () => {});

describe('Given I am on the Korean live radio canonical page', () => {});

describe('Given I am on the Korean live radio page amp/canonical', () => {
  describe('When I am using the website', () => {
    runUserTests({
      headlineText: 'BBC 코리아 라디오',
      summaryText: '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
    });

    runHeaderTests({
      skipToContentText: '내용으로 건너뛰기',
    });

    runFooterTests({
      copyrightText:
        '© 2020 BBC. BBC는 외부 인터넷 사이트 및 콘텐츠에 대한 책임을 지지않습니다. 외부 콘텐츠 링크에 대한 본사 정책 보기.',
      brandingLink: '/korean',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'BBC 코리아 라디오 - BBC News 코리아',
      canonicalUrl: 'http://localhost:7080/korean/bbc_korean_radio/liveradio',
      language: 'ko',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: '내용으로 건너뛰기',
      headlineText: 'BBC 코리아 라디오',
    });
  });
});
