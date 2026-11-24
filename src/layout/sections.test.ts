import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BREAKPOINT_SPECS,
  NAV_ITEMS,
  getBreakpointColumnsForWidth,
  getContainerMaxWidthClass,
  getSectionById,
} from './sections';

test('getSectionById returns matching nav item or falls back to overview', () => {
  const grid = getSectionById('grid');
  assert.equal(grid.id, 'grid');
  assert.equal(grid.label, 'Grid System');

  const fallback = getSectionById('unknown-section');
  assert.equal(fallback.id, 'overview');
  assert.equal(NAV_ITEMS.length, 4);
});

test('getContainerMaxWidthClass maps presets to Tailwind max-w classes', () => {
  assert.equal(getContainerMaxWidthClass('compact'), 'max-w-4xl');
  assert.equal(getContainerMaxWidthClass('standard'), 'max-w-6xl');
  assert.equal(getContainerMaxWidthClass('wide'), 'max-w-7xl');
});

test('getBreakpointColumnsForWidth matches responsive grid breakpoints', () => {
  assert.equal(getBreakpointColumnsForWidth(390), 1);
  assert.equal(getBreakpointColumnsForWidth(767), 1);
  assert.equal(getBreakpointColumnsForWidth(768), 2);
  assert.equal(getBreakpointColumnsForWidth(1024), 3);
  assert.equal(getBreakpointColumnsForWidth(1440), 3);
  assert.equal(BREAKPOINT_SPECS.length, 5);
});
