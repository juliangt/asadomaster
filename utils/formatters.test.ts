import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatters';

describe('formatters', () => {
    describe('formatCurrency', () => {
        it('should format numbers as ARS currency', () => {
            const result = formatCurrency(1000);
            // Non-breaking space might be used between $ and the number depending on the environment
            // Using regex to be safe
            expect(result).toMatch(/\$?\s?1\.000,00/);
        });
    });
});
