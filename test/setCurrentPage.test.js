import { setCurrentPage } from '../src/setCurrentPage';

describe('setCurrentPage', () => {
    it('Should return 1 when max is 0', () => {
        const result = setCurrentPage({ max: 0, skip: 0 });
        expect(result).toBe(1);
    });

    it('should return 1 when skip is 0', () => {
        const result = setCurrentPage({ max: 10, skip: 0 });
        expect(result).toBe(1);
    });

    it('Should return correct page number when skip is not 0', () => {
        const result = setCurrentPage({ max: 10, skip: 20 });
        expect(result).toBe(2);
    });

    it('Should return 1 when skip is less than max', () => {
        const result = setCurrentPage({ max: 10, skip: 5 });
        expect(result).toBe(1);
    });

    it('Should handle non-integer results', () => {
        const result = setCurrentPage({ max: 7, skip: 20 });
        expect(result).toBe(3);
    });
});