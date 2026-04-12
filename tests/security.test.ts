import { describe, it, expect } from 'vitest';

// ─── HTML Sanitization ────────────────────────────────────────────────────────
// Mirrors the sanitizeHtml function in app/api/contact/route.ts
function sanitizeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

describe('sanitizeHtml', () => {
  it('escapes < and > brackets', () => {
    expect(sanitizeHtml('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes ampersand', () => {
    expect(sanitizeHtml('AT&T')).toBe('AT&amp;T');
  });

  it('escapes double quotes', () => {
    expect(sanitizeHtml('"hello"')).toBe('&quot;hello&quot;');
  });

  it('escapes single quotes', () => {
    expect(sanitizeHtml("it's")).toBe("it&#x27;s");
  });

  it('leaves normal text untouched', () => {
    expect(sanitizeHtml('Bonjour SQWR Studio')).toBe('Bonjour SQWR Studio');
  });

  it('sanitizes a full XSS payload', () => {
    const payload = '<img src=x onerror="alert(1)">';
    const result = sanitizeHtml(payload);
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).not.toContain('"');
  });

  it('handles empty string', () => {
    expect(sanitizeHtml('')).toBe('');
  });
});

// ─── isSuspiciousInput ────────────────────────────────────────────────────────
// Mirrors the isSuspiciousInput function in app/api/contact/route.ts
function isSuspiciousInput(value: string): boolean {
  return /<script|javascript:|on\w+\s*=/i.test(value);
}

describe('isSuspiciousInput — production parity', () => {
  it('blocks <script> tags (lowercase)', () => {
    expect(isSuspiciousInput('<script>alert(1)</script>')).toBe(true);
  });

  it('blocks <SCRIPT> tags (uppercase)', () => {
    expect(isSuspiciousInput('<SCRIPT>alert(1)</SCRIPT>')).toBe(true);
  });

  it('blocks javascript: protocol', () => {
    expect(isSuspiciousInput('javascript:void(0)')).toBe(true);
  });

  it('blocks onerror event handler', () => {
    expect(isSuspiciousInput('onerror = alert(1)')).toBe(true);
  });

  it('blocks onclick handler', () => {
    expect(isSuspiciousInput('onclick=alert(1)')).toBe(true);
  });

  it('allows message with > or < used normally', () => {
    expect(isSuspiciousInput('Budget > 5000€ et < 10000€')).toBe(false);
  });

  it('allows normal company name', () => {
    expect(isSuspiciousInput('AT&T Corporation')).toBe(false);
  });

  it('allows special chars in real names', () => {
    expect(isSuspiciousInput("Jean-Marie O'Brien")).toBe(false);
  });
});

// ─── Rate limit key extraction ────────────────────────────────────────────────
function extractIp(header: string | null): string {
  return header?.split(',')[0].trim() ?? 'unknown';
}

describe('extractIp', () => {
  it('extracts first IP from x-forwarded-for with multiple IPs', () => {
    expect(extractIp('1.2.3.4, 5.6.7.8, 9.10.11.12')).toBe('1.2.3.4');
  });

  it('handles single IP', () => {
    expect(extractIp('192.168.1.1')).toBe('192.168.1.1');
  });

  it('returns unknown when header is null', () => {
    expect(extractIp(null)).toBe('unknown');
  });

  it('trims whitespace around IP', () => {
    expect(extractIp('  10.0.0.1  ')).toBe('10.0.0.1');
  });
});
