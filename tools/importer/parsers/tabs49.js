/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per instructions
  const headerRow = ['Tabs'];

  // Get all tab labels from the nav (use only direct button text, no hardcoding)
  const nav = element.querySelector('nav');
  let labelButtons = [];
  if (nav) {
    labelButtons = Array.from(nav.querySelectorAll('button[role="tab"]'));
  }
  // Defensive: fallback in case buttons are missing
  const tabLabels = labelButtons.map(btn => btn.textContent.trim());

  // Get all tab panels
  const panels = Array.from(element.querySelectorAll('div[role="tabpanel"][class*="tab__content"]'));

  // Build rows: each row is [Tab Label, Tab Content]
  const rows = panels.map(panel => {
    // Get the label for this panel via aria-labelledby
    let label = '';
    const labelledby = panel.getAttribute('aria-labelledby');
    if (labelledby) {
      const btn = labelButtons.find(b => b.id === labelledby);
      label = btn ? btn.textContent.trim() : '';
    } else {
      // Fallback: Use panel's data-cmp-data-layer dc:title
      try {
        const dataLayer = JSON.parse(panel.getAttribute('data-cmp-data-layer').replace(/&quot;/g, '"'));
        const keys = Object.keys(dataLayer);
        if (keys.length) {
          label = dataLayer[keys[0]]['dc:title'] || '';
        }
      } catch(e) {
        label = '';
      }
    }

    // Tab content: find the deepest content block inside the panel
    // Usually structure: .container > .cmp-container > ...
    // We want to grab all meaningful content within .cmp-container
    let contentContainer = panel.querySelector('.cmp-container');
    let tabContent;
    if (contentContainer) {
      // Only keep elements with actual visible content
      const contentChildren = Array.from(contentContainer.children).filter(el => el.childNodes.length > 0 && (el.textContent.trim() || el.querySelector('a, img, ul, ol, p')));
      if (contentChildren.length === 1) {
        tabContent = contentChildren[0];
      } else if (contentChildren.length > 1) {
        // Combine all children in a fragment
        const wrapper = document.createElement('div');
        contentChildren.forEach(child => wrapper.appendChild(child));
        tabContent = wrapper;
      } else {
        // Fallback: use contentContainer itself
        tabContent = contentContainer;
      }
    } else {
      // Fallback: use panel itself
      tabContent = panel;
    }

    return [label, tabContent];
  });

  // Defensive: If for some reason no labels found, include empty string
  const tableCells = [headerRow, ...rows];

  // Create the block table using the provided helper
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the original element with the new block
  element.replaceWith(block);
}
