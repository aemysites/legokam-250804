/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get teaser block
  function findTeaserBlock(el) {
    // Try common teaser selectors
    return el.querySelector('.cmp-teaser') || el.querySelector('.teaser');
  }

  // Helper to extract the hero image
  function getHeroImage(teaser) {
    if (!teaser) return null;
    // Find <img> inside cmp-image
    const img = teaser.querySelector('.cmp-image img');
    return img || null;
  }

  // Helper to extract hero main content (title, CTA)
  function getHeroContent(teaser) {
    if (!teaser) return '';
    const content = teaser.querySelector('.cmp-teaser__content');
    if (!content) return '';
    const result = [];
    // Title block
    const titleBlock = content.querySelector('.cmp-teaser__title');
    if (titleBlock) {
      // Many times the actual text is in a <div> within the h3
      const innerTitle = titleBlock.querySelector('div');
      if (innerTitle) {
        // Use a Heading element (use h1 as in the example)
        const heading = document.createElement('h1');
        heading.textContent = innerTitle.textContent;
        result.push(heading);
      } else {
        // Fallback: use whatever is inside titleBlock
        const heading = document.createElement('h1');
        heading.textContent = titleBlock.textContent;
        result.push(heading);
      }
    }
    // Action/CTA
    const cta = content.querySelector('.cmp-teaser__action-link');
    if (cta) {
      result.push(cta);
    }
    return result.length === 0 ? '' : result;
  }

  // Compose table rows
  const headerRow = ['Hero (hero24)'];
  const teaser = findTeaserBlock(element);
  if (!teaser) return;
  const heroImage = getHeroImage(teaser);
  const heroContent = getHeroContent(teaser);

  // Compose cells: 3 rows, 1 column each
  const cells = [
    headerRow,
    [heroImage ? heroImage : ''],
    [heroContent ? heroContent : '']
  ];
  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
