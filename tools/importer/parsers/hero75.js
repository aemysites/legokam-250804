/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example
  const headerRow = ['Hero (hero75)'];

  // 2. Extract the teaser block (contains all core content)
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) return;

  // 3. Extract image for row 2 (background image)
  let imageEl = null;
  const teaserImgWrap = teaser.querySelector('.cmp-teaser__image');
  if (teaserImgWrap) {
    imageEl = teaserImgWrap.querySelector('img');
  }

  // 4. Extract heading/title for row 3
  let titleEl = null;
  const teaserTitle = teaser.querySelector('.cmp-teaser__title');
  if (teaserTitle) {
    // Sometimes a div inside heading, sometimes plain heading
    // Prefer the heading level present, otherwise wrap div in <h2>
    let innerTitle = teaserTitle.querySelector('div, h1, h2, h3, h4, h5, h6');
    if (innerTitle) {
      if (/^h[1-6]$/i.test(innerTitle.tagName)) {
        titleEl = innerTitle;
      } else {
        // It's a div - wrap in h2 for semantic heading
        const h2 = document.createElement('h2');
        h2.innerHTML = innerTitle.innerHTML;
        titleEl = h2;
      }
    } else {
      // No inner heading/div, so reference the teaserTitle itself
      titleEl = teaserTitle;
    }
  }

  // 5. Extract call-to-action link for row 3
  const teaserAction = teaser.querySelector('.cmp-teaser__action-link');

  // 6. Compose content for final row
  const contentCell = [];
  if (titleEl) contentCell.push(titleEl);
  if (teaserAction) {
    // Add spacing for visual separation only if both are present
    if (titleEl) {
      contentCell.push(document.createElement('br'));
      contentCell.push(document.createElement('br'));
    }
    contentCell.push(teaserAction);
  }

  // 7. Build table: 1 column, 3 rows (header, image, content)
  const rows = [];
  rows.push(headerRow);                                   // row 1: header
  rows.push([imageEl ? imageEl : '']);                   // row 2: image or blank
  rows.push([contentCell.length > 0 ? contentCell : '']);// row 3: content or blank

  // 8. Replace element with block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
