import { setNumberPages } from '../src/setNumberPages';

describe('setNumberPages', () => {
    it('Should return 1 when total is less than or equal to max', () => {
        expect(setNumberPages({ total: 1, max: 10 })).toBe(1);
        expect(setNumberPages({ total: 10, max: 10 })).toBe(1);
    });

    it('Should return 1 when total is equal to max', () => {
        expect(setNumberPages({ total: 10, max: 10 })).toBe(1);
    });

    it('Should return correct number of pages when total is greater than max', () => {
        expect(setNumberPages({ total: 20, max: 10 })).toBe(1);
        expect(setNumberPages({ total: 30, max: 10 })).toBe(2);
    });

    it('Should handle cases where total and max are not integers', () => {
        expect(setNumberPages({ total: 20.5, max: 10 })).toBe(2);
        expect(setNumberPages({ total: 30.5, max: 10 })).toBe(3);
    });

    it('Should return 1 when total and max are not provided', () => {
        expect(setNumberPages({})).toBe(1);
    });
});