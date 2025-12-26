import {formatDate} from "../utils/Utils";

describe('formatDate', () => {
    it('should format date correctly', () => {
        expect(formatDate('2025-12-21T09:15:00Z')).toBe('16:12 12/21/2025');
    });
});
