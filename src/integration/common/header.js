export default () => {
  describe('Header', () => {
    it('I can see the branding', () => {
      const logo = document.querySelector('header svg');

      expect(logo).toBeInTheDocument();
      expect(logo.parentNode.textContent).toBeTruthy();
      expect(logo.parentNode.textContent).toMatchSnapshot();
    });

    it('I can see the navigation', () => {
      const navigationItemEls = document.querySelector(
        'header nav ul > li > a',
      );
      expect(navigationItemEls).toBeInTheDocument();
    });

    const navigationLinks = document.querySelectorAll('header nav ul > li > a');
    navigationLinks.forEach(navigationLink => {
      describe('I can see a navigation link', () => {
        beforeEach(() => {
          expect(navigationLink).toBeInTheDocument();
        });
        it('with title', () => {
          expect(navigationLink.textContent).toBeTruthy();
          expect(navigationLink.textContent).toMatchSnapshot();
        });
        it('with url', () => {
          expect(navigationLink.getAttribute('href')).toMatchSnapshot();
        });
      });
    });

    it('I can see a skip to content link', () => {
      const skipToContentEl = document.querySelector(
        'header [href="#content"]',
      );

      expect(skipToContentEl).toBeInTheDocument();
    });
  });
};
