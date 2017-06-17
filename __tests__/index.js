const { getStyleSheet, getStyle } = require('../index');
const { StyleSheet } = require('aphrodite/no-important');

const styleSheetA = StyleSheet.create({
  container: {
    color: 'blue',
    background: 'yellow'
  },
  h1: {
    fontSize: '20pt'
  }
});

const styleSheetB = StyleSheet.create({
  container: {
    color: 'yellow'
  }
});

const styleSheetC = StyleSheet.create({
  logo: {
    background: 'yellow'
  }
});

const invalidStyleSheet = {
  h1: {
    color: 'pink'
  }
};

describe('getStyleSheet', () => {
  test('get valid stylesheet for container after merging styleSheetA and styleSheetB', () => {
    const stylesheet = getStyleSheet('container', styleSheetA, styleSheetB);
    expect(stylesheet).toHaveProperty('container');
    expect(stylesheet).not.toHaveProperty('h1');
    expect(stylesheet.container).toHaveProperty('_name');
    expect(stylesheet.container).toHaveProperty('_definition');
    expect(stylesheet.container._definition).toMatchObject({
      color: 'yellow',
      background: 'yellow'
    });
  });

  test('get valid stylesheet for h1 after merging styleSheetA and styleSheetB', () => {
    const stylesheet = getStyleSheet('h1', styleSheetA, styleSheetB);
    expect(stylesheet).not.toHaveProperty('container');
    expect(stylesheet).toHaveProperty('h1');
    expect(stylesheet.h1).toHaveProperty('_name');
    expect(stylesheet.h1).toHaveProperty('_definition');
    expect(stylesheet.h1._definition).toMatchObject({
      fontSize: '20pt'
    });
  });

  test('get valid stylesheet for h1 after merging styleSheetB and styleSheetC', () => {
    const stylesheet = getStyleSheet('h1', styleSheetB, styleSheetC);
    expect(stylesheet).toHaveProperty('h1');
    expect(stylesheet).not.toHaveProperty('container');
    expect(stylesheet.h1).toHaveProperty('_name');
    expect(stylesheet.h1).toHaveProperty('_definition');
    expect(stylesheet.h1._definition).toMatchObject({});
  });

  test('get valid stylesheet for h1 after merging invalidStyleSheet and invalidStyleSheet', () => {
    const stylesheet = getStyleSheet(
      'h1',
      invalidStyleSheet,
      invalidStyleSheet
    );
    expect(stylesheet).toHaveProperty('h1');
    expect(stylesheet).not.toHaveProperty('container');
    expect(stylesheet.h1).toHaveProperty('_name');
    expect(stylesheet.h1).toHaveProperty('_definition');
    expect(stylesheet.h1._definition).toMatchObject({});
  });

  test('get valid stylesheet for h1 after merging styleSheetA and invalidStyleSheet', () => {
    const stylesheet = getStyleSheet('h1', styleSheetA, invalidStyleSheet);
    expect(stylesheet).toHaveProperty('h1');
    expect(stylesheet).not.toHaveProperty('container');
    expect(stylesheet.h1).toHaveProperty('_name');
    expect(stylesheet.h1).toHaveProperty('_definition');
    expect(stylesheet.h1._definition).toMatchObject({
      fontSize: '20pt'
    });
  });

  test('get valid stylesheet for h1 after merging invalidStyleSheet and styleSheetA', () => {
    const stylesheet = getStyleSheet('h1', invalidStyleSheet, styleSheetA);
    expect(stylesheet).toHaveProperty('h1');
    expect(stylesheet).not.toHaveProperty('container');
    expect(stylesheet.h1).toHaveProperty('_name');
    expect(stylesheet.h1).toHaveProperty('_definition');
    expect(stylesheet.h1._definition).toMatchObject({
      fontSize: '20pt'
    });
  });

  test('get valid stylesheet for h1 after merging styleSheetA and {}', () => {
    const stylesheet = getStyleSheet('h1', styleSheetA, {});
    expect(stylesheet).toHaveProperty('h1');
    expect(stylesheet).not.toHaveProperty('container');
    expect(stylesheet).not.toHaveProperty('logo');
    expect(stylesheet.h1).toHaveProperty('_name');
    expect(stylesheet.h1).toHaveProperty('_definition');
    expect(stylesheet.h1._definition).toMatchObject({
      fontSize: '20pt'
    });
  });

  test('get valid stylesheet for h1 after merging {} and {}', () => {
    const stylesheet = getStyleSheet('h1', {}, {});
    expect(stylesheet).toHaveProperty('h1');
    expect(stylesheet.h1).toHaveProperty('_name');
    expect(stylesheet.h1).toHaveProperty('_definition');
    expect(stylesheet.h1._definition).toMatchObject({});
  });

  test('get valid stylesheet for h1 after merging undefined and undefined', () => {
    const stylesheet = getStyleSheet('h1', undefined, undefined);
    expect(stylesheet).toHaveProperty('h1');
    expect(stylesheet.h1).toHaveProperty('_name');
    expect(stylesheet.h1).toHaveProperty('_definition');
    expect(stylesheet.h1._definition).toMatchObject({});
  });

  test('get unique name after merging styleSheetA and styleSheetB', () => {
    const stylesheet = getStyleSheet('container', styleSheetA, styleSheetB);
    expect(stylesheet).toHaveProperty('container');
    expect(stylesheet.container).toHaveProperty('_name');
    expect(stylesheet.container._name).not.toBe(styleSheetA.container._name);
    expect(stylesheet.container._name).not.toBe(styleSheetB.container._name);
  });
});

describe('getStyle', () => {
  test('get valid style after merging container styles of styleSheetA and styleSheetB', () => {
    const style = getStyle('container', styleSheetA, styleSheetB);
    expect(style).toHaveProperty('_name');
    expect(style).toHaveProperty('_definition');
    expect(style._definition).toMatchObject({
      color: 'yellow',
      background: 'yellow'
    });
  });

  test('get valid style after merging h1 styles of styleSheetA and styleSheetB', () => {
    const style = getStyle('h1', styleSheetA, styleSheetB);
    expect(style).toHaveProperty('_name');
    expect(style).toHaveProperty('_definition');
    expect(style._definition).toMatchObject({
      fontSize: '20pt'
    });
  });

  test('get valid style after merging h1 styles of styleSheetB and styleSheetC', () => {
    const style = getStyle('h1', styleSheetB, styleSheetC);
    expect(style).toHaveProperty('_name');
    expect(style).toHaveProperty('_definition');
    expect(style._definition).toMatchObject({});
  });

  test('get valid style after merging h1 styles of styleSheetA and {}', () => {
    const style = getStyle('h1', styleSheetA, {});
    expect(style).toHaveProperty('_name');
    expect(style).toHaveProperty('_definition');
    expect(style._definition).toMatchObject({
      fontSize: '20pt'
    });
  });

  test('get valid style after merging h1 styles of {} and {}', () => {
    const style = getStyle('h1', {}, {});
    expect(style).toHaveProperty('_name');
    expect(style).toHaveProperty('_definition');
    expect(style._definition).toMatchObject({});
  });

  test('get valid style after merging h1 styles of undefined and undefined', () => {
    const style = getStyle('h1', undefined, undefined);
    expect(style).toHaveProperty('_name');
    expect(style).toHaveProperty('_definition');
    expect(style._definition).toMatchObject({});
  });

  test('get unique name after merging styleSheetA and styleSheetB', () => {
    const style = getStyle('container', styleSheetA, styleSheetB);
    expect(style).toHaveProperty('_name');
    expect(style._name).not.toBe(styleSheetA.container._name);
    expect(style._name).not.toBe(styleSheetB.container._name);
  });
});
