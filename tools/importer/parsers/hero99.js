/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches exactly as in the example
  const headerRow = ['Hero (hero99)'];

  // --- Background Image (optional) ---
  // Find the <picture> element for the background image
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    // Try to get the most suitable desktop source, fallback to img
    const desktopSource = picture.querySelector('source[media*="1680"]') || picture.querySelector('source[media*="1024"]');
    let imgSrc = '';
    let imgAlt = '';
    if (desktopSource && desktopSource.getAttribute('srcset')) {
      imgSrc = desktopSource.getAttribute('srcset');
      // Try to get alt from <img> as fallback
      const imgTag = picture.querySelector('img');
      if (imgTag) {
        imgAlt = imgTag.getAttribute('alt') || '';
      }
    } else {
      const imgTag = picture.querySelector('img');
      if (imgTag && imgTag.getAttribute('src')) {
        imgSrc = imgTag.getAttribute('src');
        imgAlt = imgTag.getAttribute('alt') || '';
      }
    }
    if (imgSrc) {
      imageEl = document.createElement('img');
      imageEl.src = imgSrc;
      imageEl.alt = imgAlt;
    }
  }

  // --- Content: Heading, Paragraph, CTA buttons ---
  // Reference existing elements for each part if possible
  const content = element.querySelector('.cmp-banner__content');
  const contentParts = [];
  if (content) {
    // Heading (if present)
    const heading = content.querySelector('h1');
    if (heading) contentParts.push(heading);
    // Subheading/Paragraph (if present)
    const para = content.querySelector('.cmp-banner__para');
    if (para) contentParts.push(para);
    // Call-to-action buttons (optional)
    const btnContainer = content.querySelector('.cmp-banner__btn-container');
    if (btnContainer) {
      // Gather all <a> inside button container (reference, do not clone)
      const links = Array.from(btnContainer.querySelectorAll('a'));
      if (links.length > 0) {
        // Place all CTAs in a div to keep layout (reference, not clone)
        const btnDiv = document.createElement('div');
        links.forEach(a => btnDiv.appendChild(a));
        contentParts.push(btnDiv);
      }
    }
  }

  // Compose rows: image, then content
  const imageRow = [imageEl ? imageEl : ''];
  // If there's no content, cell must be an empty string
  const contentRow = [contentParts.length ? contentParts : ''];

  // Compose table structure
  const cells = [headerRow, imageRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
