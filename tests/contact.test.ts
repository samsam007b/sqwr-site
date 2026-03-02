import { describe, it, expect } from 'vitest';

// ─── Email validation (same regex as route.ts) ────────────────────────────────
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

describe('validateEmail', () => {
  it('accepts a valid email', () => {
    expect(validateEmail('studio@sqwr.be')).toBe(true);
  });

  it('accepts email with subdomain', () => {
    expect(validateEmail('user@mail.example.com')).toBe(true);
  });

  it('rejects email without @', () => {
    expect(validateEmail('noatsign.com')).toBe(false);
  });

  it('rejects email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  it('rejects email with spaces', () => {
    expect(validateEmail('user @sqwr.be')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});

// ─── Input sanitization (no script injection) ─────────────────────────────────
function isSuspiciousInput(value: string): boolean {
  return /<script|javascript:|on\w+\s*=/i.test(value);
}

describe('isSuspiciousInput', () => {
  it('flags script tag injection', () => {
    expect(isSuspiciousInput('<script>alert(1)</script>')).toBe(true);
  });

  it('flags javascript: protocol', () => {
    expect(isSuspiciousInput('javascript:alert(1)')).toBe(true);
  });

  it('flags inline event handlers', () => {
    expect(isSuspiciousInput('<img onload=alert(1)>')).toBe(true);
  });

  it('allows normal name input', () => {
    expect(isSuspiciousInput('Jean-Pierre Dupont')).toBe(false);
  });

  it('allows normal message with angle brackets context', () => {
    expect(isSuspiciousInput('Mon budget est > 5000€')).toBe(false);
  });
});

// ─── Required field validation ────────────────────────────────────────────────
function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
  service: string;
}): { valid: boolean; missing: string[] } {
  const missing = (['name', 'email', 'message', 'service'] as const).filter(
    (k) => !data[k]?.trim(),
  );
  return { valid: missing.length === 0, missing };
}

describe('validateContactForm', () => {
  it('passes with all required fields', () => {
    const result = validateContactForm({
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Bonjour',
      service: 'Site vitrine',
    });
    expect(result.valid).toBe(true);
    expect(result.missing).toHaveLength(0);
  });

  it('fails when name is missing', () => {
    const result = validateContactForm({
      name: '',
      email: 'alice@example.com',
      message: 'Bonjour',
      service: 'Site vitrine',
    });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('name');
  });

  it('fails when service is missing', () => {
    const result = validateContactForm({
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Bonjour',
      service: '',
    });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('service');
  });

  it('fails when multiple fields are missing', () => {
    const result = validateContactForm({ name: '', email: '', message: '', service: '' });
    expect(result.valid).toBe(false);
    expect(result.missing).toHaveLength(4);
  });
});
