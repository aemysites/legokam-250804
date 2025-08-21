/* global WebImporter */
export default function parse(element, { document }) {
  // Table header - must exactly match the example
  const headerRow = ['Cards (cards38)'];

  // Find the card content block
  const styledContainer = element.querySelector('.styled-container');
  if (!styledContainer) return;
  const cmpContainer = styledContainer.querySelector('.cmp-container');
  if (!cmpContainer) return;
  const textBlock = cmpContainer.querySelector('.cmp-text');
  if (!textBlock) return;

  // Find the two main columns: icon and text
  const immediateChildren = Array.from(textBlock.children).filter(n => n.nodeType === 1);

  // Defensive: if the source does not have exactly two children, fallback to the whole block
  let iconElem = '';
  let textElem = '';

  if (immediateChildren.length >= 2) {
    // Use references to the DOM elements directly
    iconElem = immediateChildren[0];
    // For textElem, aggregate all children except the icon in one container
    const textContainer = document.createElement('div');
    for (let i = 1; i < immediateChildren.length; i++) {
      textContainer.appendChild(immediateChildren[i]);
    }
    // Remove any screen-reader-only accessibility text (not visually relevant)
    textContainer.querySelectorAll('.cmp-link__screen-reader-only').forEach(s => s.remove());
    textElem = textContainer;
  } else {
    // Fallback: if only one child or structure is unexpected, use all content
    textBlock.querySelectorAll('.cmp-link__screen-reader-only').forEach(s => s.remove());
    textElem = textBlock;
  }

  // Compose the table
  const cells = [
    headerRow,
    [iconElem, textElem]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
