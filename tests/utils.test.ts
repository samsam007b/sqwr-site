import { describe, it, expect } from 'vitest';
import {
  projects,
  getProjectById,
  getProjectsByCategory,
  getFeaturedProjects,
} from '../app/data/projects';

// ─── hexToRgba (inline — pure function) ───────────────────────────────────────
function hexToRgba(hex: string, alpha: number): string {
  const c = hex.startsWith('#') ? hex.slice(1) : hex;
  const r = parseInt(c.slice(0, 2), 16) || 0;
  const g = parseInt(c.slice(2, 4), 16) || 0;
  const b = parseInt(c.slice(4, 6), 16) || 0;
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── hexToRgba ─────────────────────────────────────────────────────────────────
describe('hexToRgba', () => {
  it('converts a 6-digit hex with # prefix', () => {
    expect(hexToRgba('#ff0000', 1)).toBe('rgba(255,0,0,1)');
  });

  it('converts a 6-digit hex without # prefix', () => {
    expect(hexToRgba('00ff00', 0.5)).toBe('rgba(0,255,0,0.5)');
  });

  it('handles lowercase hex', () => {
    expect(hexToRgba('#1b3a4b', 1)).toBe('rgba(27,58,75,1)');
  });

  it('handles invalid hex gracefully (defaults to 0)', () => {
    expect(hexToRgba('#gggggg', 1)).toBe('rgba(0,0,0,1)');
  });

  it('handles alpha 0', () => {
    expect(hexToRgba('#ffffff', 0)).toBe('rgba(255,255,255,0)');
  });
});

// ─── getProjectById ────────────────────────────────────────────────────────────
describe('getProjectById', () => {
  it('returns the correct project', () => {
    const project = getProjectById('nanou');
    expect(project).toBeDefined();
    expect(project?.id).toBe('nanou');
    expect(project?.client).toBe('Nanou Mendels');
  });

  it('returns undefined for unknown id', () => {
    expect(getProjectById('unknown-xyz')).toBeUndefined();
  });

  it('returns izzico project', () => {
    const project = getProjectById('izzico');
    expect(project?.category).toBe('branding');
    expect(project?.color).toBe('#9c5698');
  });
});

// ─── getProjectsByCategory ─────────────────────────────────────────────────────
describe('getProjectsByCategory', () => {
  it("returns all projects when category is 'all'", () => {
    const result = getProjectsByCategory('all');
    expect(result.length).toBe(projects.length);
  });

  it("returns only 'web' projects", () => {
    const result = getProjectsByCategory('web');
    expect(result.length).toBeGreaterThan(0);
    result.forEach(p => expect(p.category).toBe('web'));
  });

  it("returns only 'branding' projects", () => {
    const result = getProjectsByCategory('branding');
    expect(result.length).toBeGreaterThan(0);
    result.forEach(p => expect(p.category).toBe('branding'));
  });

  it('returns empty array for unknown category', () => {
    expect(getProjectsByCategory('unknown')).toHaveLength(0);
  });
});

// ─── getFeaturedProjects ───────────────────────────────────────────────────────
describe('getFeaturedProjects', () => {
  it('returns only featured projects', () => {
    const result = getFeaturedProjects();
    expect(result.length).toBeGreaterThan(0);
    result.forEach(p => expect(p.featured).toBe(true));
  });

  it('does not include non-featured projects', () => {
    const nonFeatured = projects.filter(p => !p.featured);
    const featured = getFeaturedProjects();
    nonFeatured.forEach(p => {
      expect(featured.find(f => f.id === p.id)).toBeUndefined();
    });
  });
});

// ─── Project data integrity ────────────────────────────────────────────────────
describe('Project data integrity', () => {
  it('every project has a unique id', () => {
    const ids = projects.map(p => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('every project has a valid color hex', () => {
    const hexRegex = /^#[0-9a-fA-F]{6}$/;
    projects.forEach(p => {
      expect(p.color).toMatch(hexRegex);
    });
  });

  it('every project has a non-empty title and category', () => {
    projects.forEach(p => {
      expect(p.title.length).toBeGreaterThan(0);
      expect(['branding', 'web', 'print', 'social']).toContain(p.category);
    });
  });
});
