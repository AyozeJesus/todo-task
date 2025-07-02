import { describe, it, expect } from 'vitest';
import { validateTaskText } from './validators';

describe('validateTaskText', () => {
  it('returns empty array for valid text', () => {
    expect(validateTaskText('Hacer sentadillas', [])).toEqual([]);
  });

  it('detects empty string', () => {
    expect(validateTaskText('', [])).toContain('empty');
  });

  it('detects max length', () => {
    const longText = 'x'.repeat(25);
    expect(validateTaskText(longText, [])).toContain('maxLength');
  });

  it('detects duplicate', () => {
    const existing = [{ id: 1, text: 'plancha', completed: false }];
    expect(validateTaskText('Plancha', existing)).toContain('duplicate');
  });

  it('returns multiple errors when appropriate', () => {
    const errors = validateTaskText('', [
      { id: 1, text: '', completed: false },
    ]);
    expect(errors).toContain('empty');
  });

  it('returns multiple errors for text with multiple issues', () => {
    const longText = 'x'.repeat(25);
    const existing = [{ id: 1, text: longText, completed: false }];
    const errors = validateTaskText(longText, existing);
    expect(errors).toContain('maxLength');
    expect(errors).toContain('duplicate');
    expect(errors).toHaveLength(2);
  });

  it('handles trimming whitespace correctly', () => {
    const textWithSpaces = '  valid task  ';
    const errors = validateTaskText(textWithSpaces, []);
    expect(errors).toEqual([]);
  });
});
