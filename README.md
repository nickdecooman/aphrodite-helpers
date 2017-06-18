# aphrodite-helpers

[![npm version](https://badge.fury.io/js/aphrodite-helpers.svg)](https://badge.fury.io/js/aphrodite-helpers)
[![Build Status](https://travis-ci.org/nickdecooman/aphrodite-helpers.svg?branch=master)](https://travis-ci.org/nickdecooman/aphrodite-helpers)
[![Coverage Status](https://coveralls.io/repos/github/nickdecooman/aphrodite-helpers/badge.svg?branch=master)](https://coveralls.io/github/nickdecooman/aphrodite-helpers?branch=master)

Minimal set of helper methods for [Aphrodite](https://github.com/Khan/aphrodite) to improve reusability of React components with Aphrodite-based styling.

## Install

NPM:
```
npm install aphrodite-helpers
```

Yarn:
```
yarn add aphrodite-helpers
```

## Methods

Two helper methods are provided:

- `getStyleSheet(key, styleSheetA, styleSheetB)`

Given a certain key (string) and one or two stylesheet objects, `getStyleSheet` returns a new StyleSheet object with a single property `key` and its value being the result from merging `styleSheetA[key]` and `styleSheetB[key]`. This object is typically passed as prop to a child component.

**Example**

```
const styleSheetA = StyleSheet.create({ title: { color: blue }, ... }):
const styleSheetB = StyleSheet.create({ title: { paddingTop: '20px' }, ... }):
const titleStyleSheet = getStyleSheet('title', styleSheetA, styleSheetB);
// => evaluates to StyleSheet.create({ title: { color: blue, paddingTop: '20px' } });
```

- `getStyle(key, styleSheetA, styleSheetB)`

Given a certain key (string) and one or two stylesheet objects, `getStyle` returns a new Style object resulting from merging `styleSheetA[key]` and `styleSheetB[key]`. This object is typically passed as argument to Aphrodite's `css` function.

**Example**

```
const styleSheetA = StyleSheet.create({ title: { color: blue }, ... }):
const styleSheetB = StyleSheet.create({ title: { paddingTop: '20px' }, ... }):
const titleStyle = getStyle('title', styleSheetA, styleSheetB);
...
<h1 className={css(titleStyle)}>Hello</h1>
...
```

## Example

**Title.js**
```
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { getStyle } from 'aphrodite-helpers';

const styles = StyleSheet.create({
  title: {
    fontSize: '20pt'
  }
});

const Title = ({ title, styleSheet }) => {
  const mergedStyles = getStyle('title', styles, styleSheet);
  return (<h1 className={css(mergedStyles)}>{title}</h1>);
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  styleSheet: PropTypes.shape({
    title: PropTypes.obj
  })
}

export default Title;
```

**Header.js**
```
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { getStyleSheet, getStyle } from 'aphrodite-helpers';
import Title from './Title';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black'
  }
  title: {
    color: 'white'
  }
});

const Header = ({ styleSheet }) => {
  const titleStyleSheet = getStyleSheet('title', styles, styleSheet);
  const headerStyle = getStyle('header', styles, styleSheet);
  return (<div className={css(headerStyle)}>
      <Title title="Hello World" stylesheet={titleStyleSheet} />
    </div>);
};

Header.propTypes = {
  styleSheet: PropTypes.shape({
    header: PropTypes.obj
    title: PropTypes.obj
  })
}

export default Header;
```

In the above example, `titleStyleSheet` will evaluate to a new Stylesheet with key `title` and definitions: `{ fontSize: 20pt, color: 'white' }`.



