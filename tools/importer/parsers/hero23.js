/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find direct child by class
  function findChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList.contains(className));
  }

  // Find the main block (teaser)
  let teaser = element;
  if (!teaser.classList.contains('teaser')) {
    // Defensive: find the .teaser block inside
    teaser = element.querySelector('.teaser');
    if (!teaser) return;
  }

  // Get background image (if any)
  let backgroundCell = '';
  const backgroundDiv = findChildByClass(teaser, 'background');
  if (backgroundDiv) {
    // Look for a picture or img inside background
    const picture = backgroundDiv.querySelector('picture');
    if (picture) {
      backgroundCell = picture;
    } else {
      // No image, leave cell empty
      backgroundCell = '';
    }
  }

  // Get foreground text content
  let contentCell = '';
  const foregroundDiv = findChildByClass(teaser, 'foreground');
  if (foregroundDiv) {
    const textDiv = findChildByClass(foregroundDiv, 'text');
    if (textDiv) {
      // We'll collect eyebrow, title, description, cta if present
      const parts = [];
      const eyebrow = findChildByClass(textDiv, 'eyebrow');
      if (eyebrow && eyebrow.textContent.trim()) parts.push(eyebrow);
      const titleDiv = findChildByClass(textDiv, 'title');
      if (titleDiv && titleDiv.textContent.trim()) parts.push(titleDiv);
      const longDesc = findChildByClass(textDiv, 'long-description');
      if (longDesc && longDesc.textContent.trim()) parts.push(longDesc);
      const ctaDiv = findChildByClass(textDiv, 'cta');
      if (ctaDiv && ctaDiv.childElementCount > 0) parts.push(ctaDiv);
      contentCell = parts.length > 1 ? parts : (parts[0] || '');
    }
  }

  // Compose table rows
  const headerRow = ['Hero (hero23)'];
  const rows = [headerRow, [backgroundCell], [contentCell]];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
