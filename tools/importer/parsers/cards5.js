/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card columns
  const columns = Array.from(element.querySelectorAll('.column-container__column'));
  const rows = [];
  // Table header, matches example exactly
  rows.push(['Cards (cards5)']);

  columns.forEach((col) => {
    // Find the teaser (the card root)
    const teaser = col.querySelector('.teaser, .cmp-teaser');
    if (!teaser) return;

    // --- IMAGE (first cell) ---
    // Find the image inside the card
    let imgEl = teaser.querySelector('.cmp-teaser__image img');
    if (!imgEl) {
      imgEl = teaser.querySelector('img');
    }
    // If no image, put empty string
    const imageCell = imgEl || '';

    // --- TEXTUAL CONTENT (second cell) ---
    const contentFrag = document.createDocumentFragment();
    const content = teaser.querySelector('.cmp-teaser__content');
    if (content) {
      // Title (should be rendered strong/bold at start, not heading here)
      const titleEl = content.querySelector('.cmp-teaser__title');
      if (titleEl) {
        // The actual title text is in a <div> or directly inside
        let titleText = '';
        if (titleEl.querySelector('div')) {
          titleText = titleEl.querySelector('div').textContent.trim();
        } else {
          titleText = titleEl.textContent.trim();
        }
        if (titleText) {
          const strong = document.createElement('strong');
          strong.textContent = titleText;
          contentFrag.appendChild(strong);
          contentFrag.appendChild(document.createElement('br'));
        }
      }
      // Description (may be in <div.cmp-teaser__description>)
      const descEl = content.querySelector('.cmp-teaser__description');
      if (descEl) {
        // Copy all children (e.g. <p>)
        Array.from(descEl.childNodes).forEach(n => {
          contentFrag.appendChild(n.cloneNode(true));
        });
      }
      // CTA (call-to-action) link
      const ctaEl = content.querySelector('.cmp-teaser__action-link');
      if (ctaEl) {
        contentFrag.appendChild(document.createElement('br'));
        contentFrag.appendChild(ctaEl);
      }
    }
    rows.push([imageCell, contentFrag]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
