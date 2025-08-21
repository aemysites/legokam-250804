/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero18)'];

  // Get the <picture> tag and extract the <img> for the background
  const picture = element.querySelector('picture');
  let imgEl = null;
  if (picture) {
    imgEl = picture.querySelector('img');
  }
  const imageRow = [imgEl ? imgEl : ''];

  // Gather all content below the image: heading, para, CTA
  const contentParts = [];

  // Heading
  const h1 = element.querySelector('h1');
  if (h1) contentParts.push(h1);

  // Paragraph (allow for any <div class="cmp-banner__para"> containing <p>)
  const paraDiv = element.querySelector('.cmp-banner__para');
  if (paraDiv) {
    // To preserve paragraph markup, use childNodes
    Array.from(paraDiv.childNodes).forEach((node) => {
      contentParts.push(node);
    });
  }

  // CTA: find the first <a> inside .cmp-banner__btn-container, wrap in <p>
  const btnContainer = element.querySelector('.cmp-banner__btn-container');
  if (btnContainer) {
    const btnLink = btnContainer.querySelector('a');
    if (btnLink) {
      const ctaP = document.createElement('p');
      ctaP.appendChild(btnLink);
      contentParts.push(ctaP);
    }
  }

  // Remove empty text nodes (avoid blank lines)
  const filteredContentParts = contentParts.filter((node) => {
    if (typeof node === 'string') return node.trim();
    if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim();
    return true;
  });

  const textRow = [filteredContentParts];

  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
