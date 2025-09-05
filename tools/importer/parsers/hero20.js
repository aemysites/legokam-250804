/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the .teaser block (the main hero block)
  const teaser = element.querySelector('.teaser');
  if (!teaser) return;

  // Find background image (if any)
  // In this HTML, background is a div with class 'background', but no image. If there is a background image, it would be a style or child img.
  let backgroundCell = '';
  const backgroundDiv = teaser.querySelector('.background');
  // Check for <img> inside background
  if (backgroundDiv) {
    const bgImg = backgroundDiv.querySelector('img');
    if (bgImg) {
      backgroundCell = bgImg;
    } else {
      // Check for background-image style
      const bgStyle = backgroundDiv.style && backgroundDiv.style.backgroundImage;
      if (bgStyle && bgStyle.includes('url(')) {
        // Extract URL
        const urlMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          const img = document.createElement('img');
          img.src = urlMatch[1];
          backgroundCell = img;
        }
      }
    }
  }

  // If no background image, leave cell empty

  // Foreground content: headline, eyebrow, cta, etc.
  const foreground = teaser.querySelector('.foreground');
  let contentCell = '';
  if (foreground) {
    // We'll collect all relevant children from .text
    const text = foreground.querySelector('.text');
    if (text) {
      // We'll gather eyebrow, title, description, cta
      const contentParts = [];
      // Eyebrow
      const eyebrow = text.querySelector('.eyebrow');
      if (eyebrow) contentParts.push(eyebrow);
      // Title
      const title = text.querySelector('.title');
      if (title) contentParts.push(title);
      // Long description (if any)
      const desc = text.querySelector('.long-description');
      if (desc && desc.textContent.trim()) contentParts.push(desc);
      // CTA (if any)
      const cta = text.querySelector('.cta');
      if (cta && cta.textContent.trim()) contentParts.push(cta);
      // If we have any content, use it
      if (contentParts.length > 0) {
        contentCell = contentParts;
      }
    }
  }

  // Compose table rows
  const headerRow = ['Hero (hero20)'];
  const backgroundRow = [backgroundCell];
  const contentRow = [contentCell];

  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
