import { setPagination } from '../src/setPagination';
import { setCurrentPage } from '../src/setCurrentPage';
import { setNumberPages } from '../src/setNumberPages';

describe('setPagination', () => {
    it('Should return correct pagination object', () => {
        const pagination = setPagination({
            total: 100,
            skip: 10,
            max: 20,
            setCurrentPageFn: setCurrentPage,
            setNumberPagesfn: setNumberPages,
        });

        expect(pagination).toEqual({
            total: 100,
            numberItems: 20,
            numberPages: 4,
            currentPage: 1,
        });
    });

    it('Should handle non-integer values', () => {
        const pagination = setPagination({
            total: '100',
            skip: '10',
            max: '20',
            setCurrentPageFn: setCurrentPage,
            setNumberPagesfn: setNumberPages,
        });

        expect(pagination).toEqual({
            total: 100,
            numberItems: 20,
            numberPages: 1,
            currentPage: 1,
        });
    });

    it('Should handle default values', () => {
        const pagination = setPagination({});

        expect(pagination).toEqual({
            total: 1,
            numberItems: 1,
            numberPages: 1,
            currentPage: 1,
        });
    });
});