import { formatCurrency } from "../utils/Utils";

describe('formatCurrency', () => {
    it('should format currency correctly', () => {
        expect(formatCurrency(100)).toBe('$100.00');
        expect(formatCurrency(1000)).toBe('$1,000.00');
        expect(formatCurrency(1000000)).toBe('$1,000,000.00');
        expect(formatCurrency(100000000)).toBe('$100,000,000.00');
        expect(formatCurrency(1.5)).toBe('$1.50');
        expect(formatCurrency(999.99)).toBe('$999.99');
        expect(formatCurrency(0.01)).toBe('$0.01');
        expect(formatCurrency(0.1)).toBe('$0.10');
    });
});
