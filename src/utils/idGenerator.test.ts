import { describe, it, expect } from 'vitest';
import { generateUniqueId } from './idGenerator';

describe('idGenerator', () => {
  describe('generateUniqueId', () => {
    it('should generate a unique numeric ID', () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();

      expect(typeof id1).toBe('number');
      expect(typeof id2).toBe('number');
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with reasonable length', () => {
      const id = generateUniqueId();
      const idString = id.toString();

      // Should be a timestamp-based ID, so reasonably long
      expect(idString.length).toBeGreaterThan(10);
    });

    it('should generate multiple unique IDs in sequence', async () => {
      const ids: number[] = [];

      // Generate IDs with small delays to ensure uniqueness
      for (let i = 0; i < 10; i++) {
        ids.push(generateUniqueId());
        // Small delay to ensure different timestamps
        await new Promise(resolve => setTimeout(resolve, 1));
      }

      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
