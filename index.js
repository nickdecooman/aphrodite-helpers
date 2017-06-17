const { StyleSheet } = require('aphrodite/no-important');

/* eslint no-underscore-dangle: 0 */

function isValidStyleSheet(styleSheet, key) {
  return !(
    styleSheet === null ||
    styleSheet === undefined ||
    styleSheet[key] === null ||
    styleSheet[key] === undefined
  );
}

function isValidStyle(style) {
  return !(
    style === null ||
    style === undefined ||
    style._definition === null ||
    style._definition === undefined
  );
}

function mergeStyles(styleA, styleB) {
  if (!isValidStyle(styleA) && !isValidStyle(styleB)) {
    return {};
  }
  if (!isValidStyle(styleA)) {
    return styleB._definition;
  }
  if (!isValidStyle(styleB)) {
    return styleA._definition;
  }
  return Object.assign({}, styleA._definition, styleB._definition);
}

function createStyleSheetWithKey(key, definitions) {
  const result = {};
  result[key] = definitions;
  return StyleSheet.create(result);
}

function createStyle(key, definitions) {
  const styleSheet = createStyleSheetWithKey(key, definitions);
  return styleSheet[key];
}

function getStyleSheet(key, styleSheetA, styleSheetB) {
  if (
    isValidStyleSheet(styleSheetA, key) &&
    isValidStyleSheet(styleSheetB, key)
  ) {
    const mergedStyle = mergeStyles(styleSheetA[key], styleSheetB[key]);
    return createStyleSheetWithKey(key, mergedStyle);
  } else if (isValidStyleSheet(styleSheetA, key)) {
    const result = {};
    result[key] = styleSheetA[key];
    return result;
  }
  return createStyleSheetWithKey(key, {});
}

function getStyle(key, styleSheetA, styleSheetB) {
  if (
    isValidStyleSheet(styleSheetA, key) &&
    isValidStyleSheet(styleSheetB, key)
  ) {
    const mergedStyle = mergeStyles(styleSheetA[key], styleSheetB[key]);
    return createStyle(key, mergedStyle);
  } else if (isValidStyleSheet(styleSheetA, key)) {
    return styleSheetA[key];
  }
  return createStyle(key, {});
}

module.exports = {
  getStyleSheet,
  getStyle
};
