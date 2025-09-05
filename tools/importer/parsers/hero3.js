/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content wrapper
  const rewardContent = element.querySelector('.reward-content');
  if (!rewardContent) return;

  // Get left and right content
  const left = rewardContent.querySelector('.reward-left');
  const right = rewardContent.querySelector('.reward-right');

  // Compose the content cell for row 3: heading, subheading, paragraphs, CTA
  const contentCell = document.createElement('div');
  if (left) {
    // Append all children of left (headings, paragraphs, etc.)
    Array.from(left.children).forEach((child) => {
      // Only append non-empty elements
      if (child.textContent && child.textContent.trim().length > 0) {
        contentCell.appendChild(child);
      }
    });
  }
  if (right) {
    // Append the CTA button (if present)
    Array.from(right.children).forEach((child) => {
      contentCell.appendChild(child);
    });
  }

  // Table rows
  const headerRow = ['Hero (hero3)'];
  // No background image in this block, so row 2 is empty
  const bgRow = [''];
  const contentRow = [contentCell];

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
