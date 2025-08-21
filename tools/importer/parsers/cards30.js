/* global WebImporter */
export default function parse(element, { document }) {
  // Validate that the structure matches expectation
  // Defensive: only look for card items under .benefit-card
  const benefitCard = element.querySelector('.benefit-card');
  if (!benefitCard) {
    // Fallback: try to find card items anywhere in element
    const cardItems = Array.from(element.querySelectorAll('.benefit-card-item'));
    if (cardItems.length === 0) return;
    const headerRow = ['Cards (cards30)'];
    const rows = cardItems.map((card) => {
      const icon = card.querySelector('.benefit-card-item-icon');
      const textContainer = card.querySelector('.benefit-card-item-text');
      let contentParts = [];
      if (textContainer) {
        const headline = textContainer.querySelector('.wow-headline');
        if (headline) contentParts.push(headline);
        const desc = textContainer.querySelector('.benefit-card-item-desc');
        if (desc) contentParts.push(desc);
      }
      return [icon, contentParts];
    });
    const cells = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }
  // Normal path: process items inside the main benefit card
  const cardItems = Array.from(benefitCard.querySelectorAll('.benefit-card-item'));
  if (cardItems.length === 0) return;
  const headerRow = ['Cards (cards30)'];
  const rows = cardItems.map((card) => {
    const icon = card.querySelector('.benefit-card-item-icon');
    const textContainer = card.querySelector('.benefit-card-item-text');
    let contentParts = [];
    if (textContainer) {
      const headline = textContainer.querySelector('.wow-headline');
      if (headline) contentParts.push(headline);
      const desc = textContainer.querySelector('.benefit-card-item-desc');
      if (desc) contentParts.push(desc);
    }
    return [icon, contentParts];
  });
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
