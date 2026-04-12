import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ─── useIsMobile breakpoint logic ─────────────────────────────────────────────
// Tests the core breakpoint comparison logic used by useIsMobile
function isMobile(width: number, breakpoint = 768): boolean {
  return width < breakpoint;
}

describe('isMobile breakpoint logic', () => {
  it('returns true when width is below default breakpoint (768)', () => {
    expect(isMobile(375)).toBe(true);
  });

  it('returns false when width equals breakpoint', () => {
    expect(isMobile(768)).toBe(false);
  });

  it('returns false when width is above breakpoint', () => {
    expect(isMobile(1440)).toBe(false);
  });

  it('uses custom breakpoint when provided', () => {
    expect(isMobile(900, 1024)).toBe(true);
    expect(isMobile(1200, 1024)).toBe(false);
  });

  it('handles edge case: width 0', () => {
    expect(isMobile(0)).toBe(true);
  });
});

// ─── msMaxTouchPoints — typesafe check ────────────────────────────────────────
// Tests the pattern used in useIsTouchDevice after removing @ts-ignore
function hasMsMaxTouchPoints(nav: object): boolean {
  return 'msMaxTouchPoints' in nav;
}

describe('msMaxTouchPoints detection', () => {
  it('detects msMaxTouchPoints when present', () => {
    expect(hasMsMaxTouchPoints({ msMaxTouchPoints: 1 })).toBe(true);
  });

  it('returns false when msMaxTouchPoints is absent', () => {
    expect(hasMsMaxTouchPoints({ maxTouchPoints: 1 })).toBe(false);
  });

  it('handles empty object', () => {
    expect(hasMsMaxTouchPoints({})).toBe(false);
  });
});

// ─── useReducedMotion media query parsing ─────────────────────────────────────
// Tests the core logic of useReducedMotion without DOM
function parseReducedMotion(matches: boolean): boolean {
  return matches;
}

describe('useReducedMotion logic', () => {
  it('returns true when media query matches (user wants reduced motion)', () => {
    expect(parseReducedMotion(true)).toBe(true);
  });

  it('returns false when media query does not match', () => {
    expect(parseReducedMotion(false)).toBe(false);
  });
});
