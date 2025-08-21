/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card columns
  const columns = element.querySelectorAll('.column-container__body > .column-container__column');
  const rows = [['Cards (cards68)']];

  columns.forEach((col) => {
    const teaser = col.querySelector('.teaser');
    if (!teaser) return;

    // Image: Find the first <img> in the .cmp-teaser__image
    let imgCell;
    const teaserImage = teaser.querySelector('.cmp-teaser__image');
    if (teaserImage) {
      const img = teaserImage.querySelector('img');
      if (img) {
        imgCell = img;
      } else {
        imgCell = teaserImage;
      }
    } else {
      imgCell = document.createTextNode('');
    }

    // Text: Find the visible title (h4 or h3>div>h4 or h3>div>text, as in markup)
    let textCell;
    const teaserContent = teaser.querySelector('.cmp-teaser__content');
    if (teaserContent) {
      // Prefer h4, then h3, then any text content
      let title = teaserContent.querySelector('h4') || teaserContent.querySelector('h3');
      if (!title && teaserContent.querySelector('div')) {
        // in some markups h3>div>h4
        const div = teaserContent.querySelector('div');
        title = div.querySelector('h4') || div.querySelector('h3') || div;
      }
      if (title) {
        textCell = title;
      } else {
        textCell = teaserContent;
      }
    } else {
      // fallback: whole teaser
      textCell = teaser;
    }

    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
