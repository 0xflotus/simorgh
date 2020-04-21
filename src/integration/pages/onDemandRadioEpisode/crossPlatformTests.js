import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runMediaPlayerEmbedTests();

  it('I can see the brand title', () => {
    const brandTitleEl = document.querySelector('h1[id="content"]');

    expect(brandTitleEl).toBeInTheDocument();
    expect(brandTitleEl.textContent).toBeTruthy();
    expect(brandTitleEl.textContent).toMatchSnapshot();
  });

  it('I can see the episode title', () => {
    const episodeTitleEl = document.querySelectorAll('main p')[0];

    expect(episodeTitleEl).toBeInTheDocument();
    expect(episodeTitleEl.textContent).toBeTruthy();
    expect(episodeTitleEl.textContent).toMatchSnapshot();
  });

  it('I can see the episode summary', () => {
    const episodeSummaryEl = document.querySelectorAll('main p')[1];

    expect(episodeSummaryEl).toBeInTheDocument();
    expect(episodeSummaryEl.textContent).toBeTruthy();
    expect(episodeSummaryEl.textContent).toMatchSnapshot();
  });
};
