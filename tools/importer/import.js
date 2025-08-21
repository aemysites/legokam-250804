/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns2Parser from './parsers/columns2.js';
import cards5Parser from './parsers/cards5.js';
import columns4Parser from './parsers/columns4.js';
import accordion9Parser from './parsers/accordion9.js';
import columns7Parser from './parsers/columns7.js';
import cardsNoImages14Parser from './parsers/cardsNoImages14.js';
import columns10Parser from './parsers/columns10.js';
import columns11Parser from './parsers/columns11.js';
import cards12Parser from './parsers/cards12.js';
import accordion16Parser from './parsers/accordion16.js';
import hero18Parser from './parsers/hero18.js';
import columns17Parser from './parsers/columns17.js';
import cards15Parser from './parsers/cards15.js';
import columns3Parser from './parsers/columns3.js';
import columns20Parser from './parsers/columns20.js';
import accordion21Parser from './parsers/accordion21.js';
import columns19Parser from './parsers/columns19.js';
import accordion25Parser from './parsers/accordion25.js';
import columns26Parser from './parsers/columns26.js';
import columns23Parser from './parsers/columns23.js';
import hero24Parser from './parsers/hero24.js';
import columns6Parser from './parsers/columns6.js';
import columns28Parser from './parsers/columns28.js';
import cards30Parser from './parsers/cards30.js';
import columns8Parser from './parsers/columns8.js';
import columns13Parser from './parsers/columns13.js';
import accordion31Parser from './parsers/accordion31.js';
import cards32Parser from './parsers/cards32.js';
import columns34Parser from './parsers/columns34.js';
import columns33Parser from './parsers/columns33.js';
import table40Parser from './parsers/table40.js';
import columns27Parser from './parsers/columns27.js';
import cards43Parser from './parsers/cards43.js';
import cardsNoImages45Parser from './parsers/cardsNoImages45.js';
import columns46Parser from './parsers/columns46.js';
import columns29Parser from './parsers/columns29.js';
import tabs49Parser from './parsers/tabs49.js';
import tableStriped48Parser from './parsers/tableStriped48.js';
import hero51Parser from './parsers/hero51.js';
import cards38Parser from './parsers/cards38.js';
import columns52Parser from './parsers/columns52.js';
import accordion53Parser from './parsers/accordion53.js';
import columns22Parser from './parsers/columns22.js';
import columns1Parser from './parsers/columns1.js';
import columns55Parser from './parsers/columns55.js';
import columns58Parser from './parsers/columns58.js';
import cards50Parser from './parsers/cards50.js';
import cards57Parser from './parsers/cards57.js';
import cards59Parser from './parsers/cards59.js';
import columns61Parser from './parsers/columns61.js';
import columns62Parser from './parsers/columns62.js';
import columns63Parser from './parsers/columns63.js';
import accordion64Parser from './parsers/accordion64.js';
import columns65Parser from './parsers/columns65.js';
import cards37Parser from './parsers/cards37.js';
import cardsNoImages67Parser from './parsers/cardsNoImages67.js';
import columns56Parser from './parsers/columns56.js';
import columns69Parser from './parsers/columns69.js';
import hero70Parser from './parsers/hero70.js';
import columns71Parser from './parsers/columns71.js';
import cards68Parser from './parsers/cards68.js';
import columns72Parser from './parsers/columns72.js';
import columns60Parser from './parsers/columns60.js';
import columns66Parser from './parsers/columns66.js';
import hero74Parser from './parsers/hero74.js';
import hero75Parser from './parsers/hero75.js';
import hero77Parser from './parsers/hero77.js';
import cards79Parser from './parsers/cards79.js';
import columns76Parser from './parsers/columns76.js';
import columns80Parser from './parsers/columns80.js';
import columns82Parser from './parsers/columns82.js';
import cards41Parser from './parsers/cards41.js';
import cards83Parser from './parsers/cards83.js';
import columns85Parser from './parsers/columns85.js';
import columns42Parser from './parsers/columns42.js';
import accordion88Parser from './parsers/accordion88.js';
import columns54Parser from './parsers/columns54.js';
import cards87Parser from './parsers/cards87.js';
import cardsNoImages92Parser from './parsers/cardsNoImages92.js';
import columns39Parser from './parsers/columns39.js';
import columns91Parser from './parsers/columns91.js';
import columns95Parser from './parsers/columns95.js';
import cardsNoImages86Parser from './parsers/cardsNoImages86.js';
import hero94Parser from './parsers/hero94.js';
import columns90Parser from './parsers/columns90.js';
import columns93Parser from './parsers/columns93.js';
import cards98Parser from './parsers/cards98.js';
import columns96Parser from './parsers/columns96.js';
import hero99Parser from './parsers/hero99.js';
import columns84Parser from './parsers/columns84.js';
import columns89Parser from './parsers/columns89.js';
import columns78Parser from './parsers/columns78.js';
import columns97Parser from './parsers/columns97.js';
import columns73Parser from './parsers/columns73.js';
import accordion81Parser from './parsers/accordion81.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns2: columns2Parser,
  cards5: cards5Parser,
  columns4: columns4Parser,
  accordion9: accordion9Parser,
  columns7: columns7Parser,
  cardsNoImages14: cardsNoImages14Parser,
  columns10: columns10Parser,
  columns11: columns11Parser,
  cards12: cards12Parser,
  accordion16: accordion16Parser,
  hero18: hero18Parser,
  columns17: columns17Parser,
  cards15: cards15Parser,
  columns3: columns3Parser,
  columns20: columns20Parser,
  accordion21: accordion21Parser,
  columns19: columns19Parser,
  accordion25: accordion25Parser,
  columns26: columns26Parser,
  columns23: columns23Parser,
  hero24: hero24Parser,
  columns6: columns6Parser,
  columns28: columns28Parser,
  cards30: cards30Parser,
  columns8: columns8Parser,
  columns13: columns13Parser,
  accordion31: accordion31Parser,
  cards32: cards32Parser,
  columns34: columns34Parser,
  columns33: columns33Parser,
  table40: table40Parser,
  columns27: columns27Parser,
  cards43: cards43Parser,
  cardsNoImages45: cardsNoImages45Parser,
  columns46: columns46Parser,
  columns29: columns29Parser,
  tabs49: tabs49Parser,
  tableStriped48: tableStriped48Parser,
  hero51: hero51Parser,
  cards38: cards38Parser,
  columns52: columns52Parser,
  accordion53: accordion53Parser,
  columns22: columns22Parser,
  columns1: columns1Parser,
  columns55: columns55Parser,
  columns58: columns58Parser,
  cards50: cards50Parser,
  cards57: cards57Parser,
  cards59: cards59Parser,
  columns61: columns61Parser,
  columns62: columns62Parser,
  columns63: columns63Parser,
  accordion64: accordion64Parser,
  columns65: columns65Parser,
  cards37: cards37Parser,
  cardsNoImages67: cardsNoImages67Parser,
  columns56: columns56Parser,
  columns69: columns69Parser,
  hero70: hero70Parser,
  columns71: columns71Parser,
  cards68: cards68Parser,
  columns72: columns72Parser,
  columns60: columns60Parser,
  columns66: columns66Parser,
  hero74: hero74Parser,
  hero75: hero75Parser,
  hero77: hero77Parser,
  cards79: cards79Parser,
  columns76: columns76Parser,
  columns80: columns80Parser,
  columns82: columns82Parser,
  cards41: cards41Parser,
  cards83: cards83Parser,
  columns85: columns85Parser,
  columns42: columns42Parser,
  accordion88: accordion88Parser,
  columns54: columns54Parser,
  cards87: cards87Parser,
  cardsNoImages92: cardsNoImages92Parser,
  columns39: columns39Parser,
  columns91: columns91Parser,
  columns95: columns95Parser,
  cardsNoImages86: cardsNoImages86Parser,
  hero94: hero94Parser,
  columns90: columns90Parser,
  columns93: columns93Parser,
  cards98: cards98Parser,
  columns96: columns96Parser,
  hero99: hero99Parser,
  columns84: columns84Parser,
  columns89: columns89Parser,
  columns78: columns78Parser,
  columns97: columns97Parser,
  columns73: columns73Parser,
  accordion81: accordion81Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
