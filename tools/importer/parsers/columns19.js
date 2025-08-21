/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cmp-banner inside the provided block
  const banner = element.querySelector('.cmp-banner');
  if (!banner) return;

  const container = banner.querySelector('.cmp-banner__container');
  if (!container) return;

  const contentDiv = container.querySelector('.cmp-banner__content');
  const picture = container.querySelector('picture.cmp-banner__image');

  // Left column: heading and optional subcontent (para)
  // The heading is always inside .cmp-banner__heading (h1)
  let heading = contentDiv && contentDiv.querySelector('.cmp-banner__heading');
  // There may be a .cmp-banner__para with extra content (could be empty)
  let para = contentDiv && contentDiv.querySelector('.cmp-banner__para');

  // Create a wrapper div for the left column content
  const leftCol = document.createElement('div');
  if (heading) {
    leftCol.appendChild(heading);
  }
  // Only add para if it has real content
  if (para && para.textContent.trim() !== '' && para.innerHTML.trim() !== '') {
    // If para contains only one child and it is a block element, append that child only
    if (para.children.length === 1 && ['H2','P','DIV'].includes(para.children[0].tagName)) {
      leftCol.appendChild(para.children[0]);
    } else {
      leftCol.appendChild(para);
    }
  }

  // Right column: the image (from the <img> inside <picture>)
  let img = null;
  if (picture) {
    img = picture.querySelector('img');
  }

  // The columns block table: header, then one row with two columns
  const cells = [
    ['Columns (columns19)'],
    [leftCol, img]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
