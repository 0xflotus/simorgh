/**
 * @pathname /bengali/multimedia/2016/08/160803_tc2_testmap1
 */

it('I can see a page title - AMP', () => {
  const pageTitle = amp.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"ভারতীয় ছবির অবাধ মুক্তিতে বাংলাদেশি চলচ্চিত্রকর্মীদের বিক্ষোভ - BBC News বাংলা"`,
  );
});

it('I can see a page title - Canonical', () => {
  const pageTitle = canonical.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"ভারতীয় ছবির অবাধ মুক্তিতে বাংলাদেশি চলচ্চিত্রকর্মীদের বিক্ষোভ - BBC News বাংলা"`,
  );
});

it(`I can see the brand logo in the header - AMP`, () => {
  const logo = amp.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, বাংলা"`,
  );
});

it(`I can see the brand logo in the header - Canonical`, () => {
  const logo = canonical.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, বাংলা"`,
  );
});

it('I can see a skip to content link that links to the main content of the page - AMP', () => {
  const skipToContentEl = amp.document.querySelector('[href="#content"]');
  const h1El = amp.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"সরাসরি কনটেন্টে যান"`,
  );
});

it('I can see a headline - AMP', () => {
  const headline = amp.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(
    `"ভারতীয় ছবির অবাধ মুক্তিতে বাংলাদেশি চলচ্চিত্রকর্মীদের বিক্ষোভ"`,
  );
});

it('I can see a skip to content link that links to the main content of the page - Canonical', () => {
  const skipToContentEl = canonical.document.querySelector('[href="#content"]');
  const h1El = canonical.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"সরাসরি কনটেন্টে যান"`,
  );
});

it('I can see a headline - Canonical', () => {
  const headline = canonical.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(
    `"ভারতীয় ছবির অবাধ মুক্তিতে বাংলাদেশি চলচ্চিত্রকর্মীদের বিক্ষোভ"`,
  );
});

it('I can see the footer copyright - AMP', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 বিবিসি। বাইরের কোন সাইটের তথ্যের জন্য বিবিসি দায়বদ্ধ নয়। বাইরের লিংক সম্পর্কে বিবিসির দৃষ্টিভঙ্গি সম্বন্ধে পড়ুন।"`,
  );
});

it('I can see the footer copyright - Canonical', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 বিবিসি। বাইরের কোন সাইটের তথ্যের জন্য বিবিসি দায়বদ্ধ নয়। বাইরের লিংক সম্পর্কে বিবিসির দৃষ্টিভঙ্গি সম্বন্ধে পড়ুন।"`,
  );
});
